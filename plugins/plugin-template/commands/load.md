---
description: Load a template to switch plugin enabled/disabled states
disable-model-invocation: true
argument-hint: [name]
---

# Load Plugin Template

## Run Script

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/load.mjs $ARGUMENTS
```

## Handle Results

The script output is JSON. Handle based on the `status` field:

- **`"list"`**: Display the `templates` array as a table (name, description, pluginCount, created_at), and ask the user which template to load. Once selected, re-run:
  ```bash
  node ${CLAUDE_PLUGIN_ROOT}/scripts/load.mjs <selected_name>
  ```

- **`"applied"`**: Application complete. Summarize the `changes` object:
  - `enabled`: Newly enabled plugins
  - `disabled`: Disabled plugins
  - `unchanged`: Unchanged plugins

  At the end, inform that **Claude Code must be restarted for changes to take effect**.

- **`"not_found"`**: Inform the user the template was not found, and suggest checking the list with `/plugin-template:load`.

- **`"no_templates"`**: Inform the user there are no saved templates, and suggest `/plugin-template:save`.

- **`"missing_deps"`**: Inform about missing dependencies:
  - If `missingMarketplaces` exists, provide each item's `addCommand`
  - If `missingPlugins` exists, provide each item's `installCommand`
  - Suggest running `/plugin-template:load <name>` again after installation

- **Script error (exit code 1 or execution failure)**: Read `${CLAUDE_PLUGIN_ROOT}/docs/load-error-guide.md` and follow the manual procedure.
