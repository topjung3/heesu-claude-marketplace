---
description: Save currently active plugins as a template
disable-model-invocation: true
argument-hint: <name> [description]
---

# Save Plugin Template

## Check Arguments

If `$ARGUMENTS` is empty, ask the user for a template name.

## Run Script

```bash
node ${CLAUDE_PLUGIN_ROOT}/scripts/save.mjs $ARGUMENTS
```

## Handle Results

The script output is JSON. Handle based on the `status` field:

- **`"saved"`**: Save complete. Report the key list from `template.enabledPlugins` and the `path` to the user.
- **`"exists"`**: A template with the same name already exists. Show the `existing` info and ask whether to overwrite. If approved, re-run with the `--force` flag:
  ```bash
  node ${CLAUDE_PLUGIN_ROOT}/scripts/save.mjs $ARGUMENTS --force
  ```
- **`"no_plugins"`**: Inform the user there are no active plugins.
- **Script error (exit code 1 or execution failure)**: Read `${CLAUDE_PLUGIN_ROOT}/docs/save-error-guide.md` and follow the manual procedure.
