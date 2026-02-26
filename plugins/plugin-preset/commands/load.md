---
description: Load a preset to switch plugin enabled/disabled states
disable-model-invocation: true
argument-hint: [name]
model: Haiku
---

# Load Plugin Preset

## Run Script

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/load.mjs $ARGUMENTS
```

## Handle Results

The script output is JSON. Handle based on the `status` field:

- **`"list"`**: Display the `presets` array as a table (name, description, pluginCount, created_at), and ask the user which preset to load. Once selected, re-run:
  ```bash
  node ${CLAUDE_PLUGIN_ROOT}/scripts/load.mjs <selected_name>
  ```

- **`"applied"`**: Application complete. Summarize the `changes` object:
  - `enabled`: Newly enabled plugins
  - `disabled`: Disabled plugins
  - `unchanged`: Unchanged plugins

  At the end, inform that **Claude Code must be restarted for changes to take effect**.

- **`"not_found"`**: Inform the user the preset was not found, and suggest checking the list with `/plugin-preset:load`.

- **`"no_presets"`**: Inform the user there are no saved presets, and suggest `/plugin-preset:save`.

- **`"missing_deps"`**: Inform about missing dependencies:
  - If `missingMarketplaces` exists, provide each item's `addCommand`
  - If `missingPlugins` exists, provide each item's `installCommand`
  - Suggest running `/plugin-preset:load <name>` again after installation

- **Script error (exit code 1 or execution failure)**: Read `${CLAUDE_PLUGIN_ROOT}/docs/load-error-guide.md` and follow the manual procedure.
