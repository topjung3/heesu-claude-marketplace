# Load Error Recovery Guide

If the script execution fails, perform the following procedure manually.

## Display List (when no arguments provided)

List the `*.json` files in the `~/.claude/templates/` directory.

Show each template's `name`, `description`, and `enabledPlugins` count as a table, and ask the user which template to load.

If there are no templates, suggest `/plugin-template:save` and abort.

## Execute Load (when arguments provided)

### Step 1: Read Template

Read `~/.claude/templates/<name>.json`. If the file does not exist, inform the user and abort.

### Step 2: Check Marketplaces

Read `~/.claude/plugins/known_marketplaces.json` and check if there are marketplaces in the template's `knownMarketplaces` that are not registered in the current system.

If there are missing marketplaces:
- Provide `/plugin marketplace add <url>` commands with each marketplace's source URL
- Suggest running `/plugin-template:load <name>` again after adding marketplaces, then abort

### Step 3: Check Plugin Installation

Read `~/.claude/plugins/installed_plugins.json` and check if there are plugins in the template's `enabledPlugins` that are not installed.

If there are missing plugins:
- Provide `/plugin install <plugin>@<marketplace>` commands for each plugin
- Suggest running `/plugin-template:load <name>` again after installation, then abort

### Step 4: Update settings.json

Read `~/.claude/settings.json`.

Update the `enabledPlugins` object as follows:
1. Plugins in the template's `enabledPlugins`: set to `true`
2. Plugins currently `true` in `enabledPlugins` but not in the template: set to `false`
3. Plugins already `false`: leave as-is

**Warning**: Never modify any settings other than `enabledPlugins` (hooks, permissions, etc.).

### Step 5: Report Results

Summarize the enabled/disabled/unchanged plugin lists.

Inform that **Claude Code must be restarted for changes to take effect**.
