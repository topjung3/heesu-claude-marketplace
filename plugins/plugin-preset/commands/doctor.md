---
description: Diagnose presets and remove unloadable plugins
model: Sonnet
---

# Plugin Preset Doctor

Diagnose saved presets and remove plugins that can no longer be loaded.

## Step 1: Read Environment

Read the following files (if they don't exist, treat as empty `{}`):

- `~/.claude/plugins/known_marketplaces.json` — registered marketplaces (has `installLocation` per marketplace)
- `~/.claude/plugins/installed_plugins.json` — installed plugins (check `.plugins` key)

For each marketplace in `known_marketplaces.json`, read its actual plugin catalog:
- `<installLocation>/.claude-plugin/marketplace.json` — the `.plugins` array lists plugins currently available in that marketplace

## Step 2: Read Presets

If `$ARGUMENTS` is provided, read only `~/.claude/presets/$ARGUMENTS.json`.
Otherwise, read all `*.json` files from `~/.claude/presets/`.

If the directory doesn't exist or is empty, inform the user there are no saved presets and suggest `/plugin-preset:save`.

## Step 3: Diagnose

For each preset file, check every plugin key (format: `<plugin-name>@<marketplace-name>`) in `enabledPlugins`:

1. **Marketplace registered**: If the marketplace name is not in `known_marketplaces.json`, mark as `marketplace_missing`.
2. **Plugin installed**: If the plugin key is not in `installed_plugins.json`'s `.plugins` object, mark as `not_installed`.
3. **Plugin exists in marketplace**: Read the marketplace's `marketplace.json` (from Step 1) and check if the plugin name exists in the `.plugins[].name` array. If not, mark as `removed_from_marketplace` — this means the plugin was deleted from the marketplace and can no longer be updated or loaded.

Also flag any preset file that fails to parse as corrupted.

## Step 4: Report

If no issues found, inform the user all presets are healthy.

If issues found, display a summary table for each affected preset:
- Preset name
- Each problematic plugin and its issues (`marketplace_missing`, `not_installed`, `removed_from_marketplace`)
- Corrupted files if any

## Step 5: Ask and Fix

Ask the user whether to remove the problematic plugins from the presets.

If approved:
1. For each affected preset, delete the problematic plugin keys from `enabledPlugins`
2. Clean up `knownMarketplaces` entries that are no longer referenced by any remaining plugin
3. Save the updated preset file
4. Report what was removed and how many plugins remain in each preset
