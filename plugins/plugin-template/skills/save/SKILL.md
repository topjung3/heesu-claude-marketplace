---
name: save
description: 현재 활성화된 플러그인들을 템플릿으로 저장. /plugin-template:save <이름> [설명]
disable-model-invocation: true
---

# 플러그인 템플릿 저장

## 인자 확인

`$ARGUMENTS`가 비어있으면 사용자에게 템플릿 이름을 물어보세요.

## 스크립트 실행

```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/save/scripts/save.mjs $ARGUMENTS
```

## 결과 처리

스크립트 출력은 JSON입니다. `status` 필드에 따라 처리:

- **`"saved"`**: 저장 완료. `template.enabledPlugins`의 키 목록과 `path`를 사용자에게 보고하세요.
- **`"exists"`**: 동일 이름 템플릿이 이미 존재합니다. `existing` 정보를 보여주고 덮어쓸지 물어보세요. 승인하면 `--force` 플래그를 추가하여 재실행:
  ```bash
  node ${CLAUDE_PLUGIN_ROOT}/skills/save/scripts/save.mjs $ARGUMENTS --force
  ```
- **`"no_plugins"`**: 활성화된 플러그인이 없다고 사용자에게 알려주세요.
- **스크립트 에러 (exit code 1 또는 실행 실패)**: [error-guide.md](error-guide.md)를 읽고 수동 절차를 따르세요.
