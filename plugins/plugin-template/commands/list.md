---
description: Show saved plugin template list
disable-model-invocation: true
---

# Plugin Template List

## Run Script

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/load.mjs
```

## Handle Results

The script output is JSON. Handle based on the `status` field:

- **`"list"`**: Display the `templates` array as a table (name, description, pluginCount, created_at).
- **`"no_templates"`**: Inform the user there are no saved templates, and suggest `/plugin-template:save`.
- **Script error**: Directly read `*.json` files from the `~/.claude/templates/` directory and display the list.
