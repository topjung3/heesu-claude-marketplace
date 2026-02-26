# Load Error Recovery Guide

If the script execution fails, perform the following procedure manually.

## Display List (when no arguments provided)

List the `*.json` files in the `~/.claude/presets/` directory.

Show each preset's `name`, `description`, and `enabledPlugins` count as a table, and ask the user which preset to load.

If there are no presets, suggest `/plugin-preset:save` and abort.

## Execute Load (when arguments provided)

### Step 1: Read Preset

Read `~/.claude/presets/<name>.json`. If the file does not exist, inform the user and abort.

### Step 2: Check Marketplaces

Read `~/.claude/plugins/known_marketplaces.json` and check if there are marketplaces in the preset's `knownMarketplaces` that are not registered in the current system.

If there are missing marketplaces:
- Provide `/plugin marketplace add <url>` commands with each marketplace's source URL
- Suggest running `/plugin-preset:load <name>` again after adding marketplaces, then abort

### Step 3: Check Plugin Installation

Read `~/.claude/plugins/installed_plugins.json` and check if there are plugins in the preset's `enabledPlugins` that are not installed.

If there are missing plugins:
- Provide `/plugin install <plugin>@<marketplace>` commands for each plugin
- Suggest running `/plugin-preset:load <name>` again after installation, then abort

### Step 4: Update settings.json

Read `~/.claude/settings.json`.

Update the `enabledPlugins` object as follows:
1. Plugins in the preset's `enabledPlugins`: set to `true`
2. Plugins currently `true` in `enabledPlugins` but not in the preset: set to `false`
3. Plugins already `false`: leave as-is

**Warning**: Never modify any settings other than `enabledPlugins` (hooks, permissions, etc.).

### Step 5: Report Results

Summarize the enabled/disabled/unchanged plugin lists.

Inform that **Claude Code must be restarted for changes to take effect**.
