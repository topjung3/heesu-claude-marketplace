---
name: load
description: 템플릿을 불러와 플러그인 활성/비활성 상태를 전환. /plugin-template:load [이름]
disable-model-invocation: true
---

# 플러그인 템플릿 로드

## 스크립트 실행

```bash
node ${CLAUDE_PLUGIN_ROOT}/skills/load/scripts/load.mjs $ARGUMENTS
```

## 결과 처리

스크립트 출력은 JSON입니다. `status` 필드에 따라 처리:

- **`"list"`**: `templates` 배열을 테이블로 표시하고 (name, description, pluginCount, created_at), 사용자에게 어떤 템플릿을 로드할지 물어보세요. 선택받으면 재실행:
  ```bash
  node ${CLAUDE_PLUGIN_ROOT}/skills/load/scripts/load.mjs <선택된_이름>
  ```

- **`"applied"`**: 적용 완료. `changes` 객체를 요약하세요:
  - `enabled`: 새로 활성화된 플러그인
  - `disabled`: 비활성화된 플러그인
  - `unchanged`: 변경 없는 플러그인

  마지막에 **Claude Code를 재시작해야 변경사항이 적용됩니다**라고 안내하세요.

- **`"not_found"`**: 템플릿을 찾을 수 없다고 알리고, `/plugin-template:load`로 목록을 확인하도록 안내하세요.

- **`"no_templates"`**: 저장된 템플릿이 없다고 알리고, `/plugin-template:save`를 안내하세요.

- **`"missing_deps"`**: 누락된 의존성을 알리세요:
  - `missingMarketplaces`가 있으면 각 항목의 `addCommand`를 안내
  - `missingPlugins`가 있으면 각 항목의 `installCommand`를 안내
  - 설치 후 다시 `/plugin-template:load <이름>`을 실행하도록 안내

- **스크립트 에러 (exit code 1 또는 실행 실패)**: [error-guide.md](error-guide.md)를 읽고 수동 절차를 따르세요.
