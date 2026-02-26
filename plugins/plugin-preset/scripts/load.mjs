#!/usr/bin/env node

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const HOME = homedir();
const SETTINGS_PATH = join(HOME, ".claude", "settings.json");
const MARKETPLACES_PATH = join(HOME, ".claude", "plugins", "known_marketplaces.json");
const INSTALLED_PATH = join(HOME, ".claude", "plugins", "installed_plugins.json");
const PRESETS_DIR = join(HOME, ".claude", "presets");

function output(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

async function readJSON(path) {
  return JSON.parse(await readFile(path, "utf-8"));
}

async function listPresets() {
  let files;
  try {
    files = await readdir(PRESETS_DIR);
  } catch {
    output({ status: "no_presets", message: "프리셋 디렉토리가 없습니다." });
    return;
  }

  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  if (jsonFiles.length === 0) {
    output({
      status: "no_presets",
      message: "저장된 프리셋이 없습니다. /plugin-preset:save 로 먼저 저장하세요.",
    });
    return;
  }

  const presets = [];
  for (const file of jsonFiles.sort()) {
    try {
      const preset = await readJSON(join(PRESETS_DIR, file));
      presets.push({
        name: preset.name,
        description: preset.description || "",
        pluginCount: Object.keys(preset.enabledPlugins || {}).length,
        created_at: preset.created_at,
      });
    } catch {
      // skip malformed files
    }
  }

  output({ status: "list", presets });
}

async function loadPreset(name) {
  // 1. Read preset
  const presetPath = join(PRESETS_DIR, `${name}.json`);
  let preset;
  try {
    preset = await readJSON(presetPath);
  } catch {
    output({
      status: "not_found",
      message: `프리셋 "${name}"을 찾을 수 없습니다. 경로: ${presetPath}`,
    });
    return;
  }

  const presetPlugins = preset.enabledPlugins || {};
  const presetMarkets = preset.knownMarketplaces || {};

  // 2. Check missing marketplaces
  let currentMarkets = {};
  try {
    currentMarkets = await readJSON(MARKETPLACES_PATH);
  } catch {
    // no known marketplaces
  }

  const missingMarketplaces = [];
  for (const [marketName, marketInfo] of Object.entries(presetMarkets)) {
    if (!currentMarkets[marketName]) {
      const url =
        marketInfo.source?.url ||
        (marketInfo.source?.repo
          ? `https://github.com/${marketInfo.source.repo}`
          : marketName);
      missingMarketplaces.push({
        name: marketName,
        url,
        addCommand: `/plugin marketplace add ${url}`,
      });
    }
  }

  // 3. Check missing plugins
  let installedPlugins = { plugins: {} };
  try {
    installedPlugins = await readJSON(INSTALLED_PATH);
  } catch {
    // no installed plugins
  }

  const missingPlugins = [];
  for (const pluginKey of Object.keys(presetPlugins)) {
    if (!installedPlugins.plugins?.[pluginKey]) {
      missingPlugins.push({
        name: pluginKey,
        installCommand: `/plugin install ${pluginKey.replace("@", " @").replace(" @", "@")}`,
      });
    }
  }

  // 4. If missing deps, report without applying
  if (missingMarketplaces.length > 0 || missingPlugins.length > 0) {
    output({
      status: "missing_deps",
      message: "누락된 마켓플레이스 또는 플러그인이 있습니다. 아래 명령을 실행한 후 다시 시도하세요.",
      missingMarketplaces,
      missingPlugins,
    });
    return;
  }

  // 5. Apply: update settings.json
  let settings;
  try {
    settings = await readJSON(SETTINGS_PATH);
  } catch {
    settings = {};
  }

  const currentEnabled = settings.enabledPlugins || {};
  const changes = { enabled: [], disabled: [], unchanged: [] };

  const newEnabled = { ...currentEnabled };

  // Enable preset plugins
  for (const pluginKey of Object.keys(presetPlugins)) {
    if (currentEnabled[pluginKey] === true) {
      changes.unchanged.push(pluginKey);
    } else {
      changes.enabled.push(pluginKey);
    }
    newEnabled[pluginKey] = true;
  }

  // Disable plugins not in preset
  for (const [pluginKey, val] of Object.entries(currentEnabled)) {
    if (val === true && !presetPlugins[pluginKey]) {
      changes.disabled.push(pluginKey);
      newEnabled[pluginKey] = false;
    }
  }

  settings.enabledPlugins = newEnabled;
  await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + "\n");

  output({
    status: "applied",
    message: `프리셋 "${name}" 적용 완료.`,
    changes,
  });
}

async function main() {
  const name = process.argv[2];

  if (!name) {
    await listPresets();
  } else {
    await loadPreset(name);
  }
}

main().catch((err) => {
  output({ status: "error", message: err.message });
  process.exit(1);
});
