#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MARKETPLACE_PATH = join(ROOT, ".claude-plugin", "marketplace.json");
const PLUGINS_DIR = join(ROOT, "plugins");

async function main() {
  const marketplace = JSON.parse(await readFile(MARKETPLACE_PATH, "utf-8"));

  const entries = await readdir(PLUGINS_DIR, { withFileTypes: true });
  const pluginDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const plugins = [];
  for (const dir of pluginDirs.sort()) {
    const pluginJsonPath = join(PLUGINS_DIR, dir, ".claude-plugin", "plugin.json");
    try {
      const plugin = JSON.parse(await readFile(pluginJsonPath, "utf-8"));
      plugins.push({
        name: plugin.name,
        source: `./plugins/${dir}`,
        description: plugin.description,
        ...(plugin.version && { version: plugin.version }),
      });
    } catch {
      console.warn(`skip: plugins/${dir} (.claude-plugin/plugin.json not found)`);
    }
  }

  marketplace.plugins = plugins;
  await writeFile(MARKETPLACE_PATH, JSON.stringify(marketplace, null, 2) + "\n");

  console.log(`updated marketplace.json with ${plugins.length} plugin(s):`);
  plugins.forEach((p) => console.log(`  - ${p.name}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
