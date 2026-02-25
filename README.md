# heesu-claude-marketplace

A personal Claude Code marketplace. Provides custom agents, skills, and preset management tools as plugins.

## Add Marketplace

```bash
/plugin marketplace add https://github.com/topjung3/heesu-claude-marketplace.git
```

## Plugin List

| Plugin | Description | External Dependencies |
|--------|-------------|-----------------------|
| `plugin-preset` | Save/load plugin presets. Quickly switch plugin sets per project | None |

## Installation

### Register Marketplace

```bash
/plugin install plugin-preset@heesu-claude-marketplace
```

## Development

```bash
claude --plugin-dir ./plugins/plugin-preset
```

## Details

### plugin-preset

The `plugin-preset` plugin allows you to save and switch between plugin combinations for each project type.

### Save Current Plugin Configuration as a Preset

```bash
/plugin-preset:save go-backend Go backend development environment
```

### Load a Saved Preset

```bash
# View preset list
/plugin-preset:list

# Load a specific preset
/plugin-preset:load go-backend
```
