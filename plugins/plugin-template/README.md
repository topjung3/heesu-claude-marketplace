# plugin-template

A tool for saving and loading plugin template configurations. Quickly switch between plugin sets for different project types.

## Marketplace Installation

```bash
/plugin install plugin-template@heesu-claude-marketplace
```

## Usage

### Save a Template

Saves the currently active plugin configuration as a template.

```bash
/plugin-template:save <name> [description]
```

Examples:
```bash
/plugin-template:save go-backend Go backend development environment
/plugin-template:save frontend Frontend development environment
```

### Load a Template

Loads a saved template and switches plugins in bulk.

```bash
# List available templates
/plugin-template:load

# Load a specific template
/plugin-template:load go-backend
```

Behavior on load:
- Plugins included in the template → enabled
- Plugins not in the template → disabled
- Uninstalled plugins → installation command provided
- Unregistered marketplaces → registration command provided


## For Developer

Test it on your local.

```bash
claude --plugin-dir ./plugins/plugin-template
```

### Template Storage Location

`~/.claude/templates/<name>.json`
