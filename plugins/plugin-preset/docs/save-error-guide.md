# Save Error Recovery Guide

If the script execution fails, perform the following procedure manually.

## Step 1: Read Currently Active Plugins

Read `~/.claude/settings.json` and extract only plugins with a value of `true` from the `enabledPlugins` object.

If `enabledPlugins` does not exist or there are no active plugins, inform the user and abort.

## Step 2: Collect Marketplace Information

Read `~/.claude/plugins/known_marketplaces.json`.

Match marketplace source information for each active plugin's marketplace name (the part after @). Exclude the `installLocation` field and include only the `source` field.

## Step 3: Directory and Duplicate Check

If the `~/.claude/templates/` directory does not exist, create it with Bash:
```
mkdir -p ~/.claude/templates
```

If `~/.claude/templates/<name>.json` already exists, ask the user whether to overwrite. If declined, abort.

## Step 4: Save Template File

Save a JSON file in the following format to `~/.claude/templates/<name>.json`:

```json
{
  "name": "<template name>",
  "description": "<description or empty string>",
  "created_at": "<current ISO 8601 timestamp>",
  "enabledPlugins": {
    "<plugin@marketplace>": true
  },
  "knownMarketplaces": {
    "<marketplace-name>": {
      "source": { "source": "git", "url": "..." }
    }
  }
}
```

## Step 5: Report Results

Inform the user of the saved template's name, included plugin list, and save path.
