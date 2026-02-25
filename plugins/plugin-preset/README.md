# plugin-preset

A tool for saving and loading plugin preset configurations. Quickly switch between plugin sets for different project types.

## Marketplace Installation

```bash
/plugin install plugin-preset@heesu-claude-marketplace
```

## Usage

### Save a Preset

Saves the currently active plugin configuration as a preset.

```bash
/plugin-preset:save <name> [description]
```

Examples:
```bash
/plugin-preset:save go-backend Go backend development environment
/plugin-preset:save frontend Frontend development environment
```

### Load a Preset

Loads a saved preset and switches plugins in bulk.

```bash
# List available presets
/plugin-preset:load

# Load a specific preset
/plugin-preset:load go-backend
```

Behavior on load:
- Plugins included in the preset → enabled
- Plugins not in the preset → disabled
- Uninstalled plugins → installation command provided
- Unregistered marketplaces → registration command provided


## For Developer

Test it on your local.

```bash
claude --plugin-dir ./plugins/plugin-preset
```

### Preset Storage Location

`~/.claude/templates/<name>.json`
