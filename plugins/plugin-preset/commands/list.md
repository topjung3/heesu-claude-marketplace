---
description: Show saved plugin preset list
disable-model-invocation: true
model: Haiku
---

# Plugin Preset List

## Run Script

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/load.mjs
```

## Handle Results

The script output is JSON. Handle based on the `status` field:

- **`"list"`**: Display the `presets` array as a table (name, description, pluginCount, created_at).
- **`"no_presets"`**: Inform the user there are no saved presets, and suggest `/plugin-preset:save`.
- **Script error**: Directly read `*.json` files from the `~/.claude/presets/` directory and display the list.
