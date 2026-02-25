# heesu-claude-marketplace

A personal Claude Code marketplace. Provides custom agents, skills, and template management tools as plugins.

## Add Marketplace

```bash
/plugin marketplace add topjung3/heesu-claude-marketplace
```

## Plugin List

| Plugin | Description | External Dependencies |
|--------|-------------|-----------------------|
| `plugin-template` | Save/load plugin templates. Quickly switch plugin sets per project | None |

## Installation

### Register Marketplace

```bash
/plugin marketplace add https://github.com/topjung3/heesu-claude-marketplace.git
/plugin install plugin-template@heesu-claude-marketplace
```

## Development

```bash
claude --plugin-dir ./plugins/plugin-template
```

## Details

### plugin-template

The `plugin-template` plugin allows you to save and switch between plugin combinations for each project type.

### Save Current Plugin Configuration as a Template

```bash
/plugin-template:save go-backend Go backend development environment
```

### Load a Saved Template

```bash
# View template list
/plugin-template:list

# Load a specific template
/plugin-template:load go-backend
```