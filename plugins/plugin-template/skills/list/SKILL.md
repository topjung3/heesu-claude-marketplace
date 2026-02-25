---
name: list
description: 저장된 플러그인 템플릿 목록을 보여줍니다. 사용법 - /plugin-template:list
disable-model-invocation: true
---

# 플러그인 템플릿 목록

## 스크립트 실행

```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/load/scripts/load.mjs
```

## 결과 처리

스크립트 출력은 JSON입니다. `status` 필드에 따라 처리:

- **`"list"`**: `templates` 배열을 테이블로 표시하세요 (name, description, pluginCount, created_at).
- **`"no_templates"`**: 저장된 템플릿이 없다고 알리고, `/plugin-template:save`를 안내하세요.
- **스크립트 에러**: `~/.claude/templates/` 디렉토리의 `*.json` 파일들을 직접 읽어서 목록을 표시하세요.
