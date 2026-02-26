#!/usr/bin/env node

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";

const HOME = homedir();
const SETTINGS_PATH = join(HOME, ".claude", "settings.json");
const MARKETPLACES_PATH = join(HOME, ".claude", "plugins", "known_marketplaces.json");
const PRESETS_DIR = join(HOME, ".claude", "presets");

function output(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

async function readJSON(path) {
  return JSON.parse(await readFile(path, "utf-8"));
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const filtered = args.filter((a) => a !== "--force");

  const name = filtered[0];
  if (!name) {
    throw new Error("프리셋 이름이 필요합니다.");
  }

  if (!/^[a-zA-Z0-9가-힣_-]+$/.test(name)) {
    throw new Error(
      `잘못된 프리셋 이름: "${name}". 영문, 숫자, 한글, 하이픈, 언더스코어만 허용됩니다.`
    );
  }

  const description = filtered.slice(1).join(" ");

  // 1. Read settings.json → extract enabled plugins
  const settings = await readJSON(SETTINGS_PATH);

  const enabledPlugins = {};
  if (settings.enabledPlugins) {
    for (const [key, val] of Object.entries(settings.enabledPlugins)) {
      if (val === true) enabledPlugins[key] = true;
    }
  }

  if (Object.keys(enabledPlugins).length === 0) {
    output({
      status: "no_plugins",
      message: "현재 활성화된 플러그인이 없습니다.",
    });
    process.exit(0);
  }

  // 2. Read known_marketplaces.json → match marketplace sources
  let knownMarketplaces = {};
  try {
    const allMarketplaces = await readJSON(MARKETPLACES_PATH);
    const neededMarkets = new Set(
      Object.keys(enabledPlugins).map((key) => key.split("@")[1])
    );

    for (const marketName of neededMarkets) {
      if (allMarketplaces[marketName]) {
        knownMarketplaces[marketName] = {
          source: allMarketplaces[marketName].source,
        };
      }
    }
  } catch {
    // known_marketplaces.json이 없어도 계속 진행
  }

  // 3. Ensure presets directory exists
  try {
    await mkdir(PRESETS_DIR, { recursive: true });
  } catch {
    // ignore
  }

  // 4. Check for existing preset
  const presetPath = join(PRESETS_DIR, `${name}.json`);
  if (!force) {
    try {
      await access(presetPath);
      const existing = await readJSON(presetPath);
      output({
        status: "exists",
        path: presetPath,
        existing: {
          name: existing.name,
          description: existing.description,
          pluginCount: Object.keys(existing.enabledPlugins || {}).length,
          created_at: existing.created_at,
        },
      });
      process.exit(0);
    } catch {
      // File doesn't exist, proceed
    }
  }

  // 5. Build and save preset
  const preset = {
    name,
    description,
    created_at: new Date().toISOString(),
    enabledPlugins,
    knownMarketplaces,
  };

  await writeFile(presetPath, JSON.stringify(preset, null, 2) + "\n");

  output({
    status: "saved",
    path: presetPath,
    preset,
  });
}

main().catch((err) => {
  output({ status: "error", message: err.message });
  process.exit(1);
});
