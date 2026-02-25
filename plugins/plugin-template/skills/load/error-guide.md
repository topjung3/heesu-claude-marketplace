# Load 에러 복구 가이드

스크립트 실행이 실패한 경우 아래 절차를 수동으로 수행하세요.

## 목록 표시 (인자가 없는 경우)

`~/.claude/templates/` 디렉토리의 `*.json` 파일들을 나열하세요.

각 템플릿의 `name`, `description`, `enabledPlugins` 수를 테이블로 보여주고, 사용자에게 어떤 템플릿을 로드할지 물어보세요.

템플릿이 없으면 `/plugin-template:save`를 안내하고 중단하세요.

## 로드 실행 (인자가 있는 경우)

### 1단계: 템플릿 읽기

`~/.claude/templates/<이름>.json` 파일을 읽으세요. 파일이 없으면 사용자에게 알리고 중단하세요.

### 2단계: 마켓플레이스 확인

`~/.claude/plugins/known_marketplaces.json`을 읽고, 템플릿의 `knownMarketplaces`에 있지만 현재 시스템에 등록되지 않은 마켓플레이스가 있는지 확인하세요.

누락된 마켓플레이스가 있으면:
- 각 마켓플레이스의 source URL과 함께 `/plugin marketplace add <url>` 명령을 안내하세요
- 마켓플레이스 추가 후 다시 `/plugin-template:load <이름>`을 실행하도록 안내하고 중단하세요

### 3단계: 플러그인 설치 확인

`~/.claude/plugins/installed_plugins.json`을 읽고, 템플릿의 `enabledPlugins`에 있지만 설치되지 않은 플러그인이 있는지 확인하세요.

누락된 플러그인이 있으면:
- 각 플러그인에 대해 `/plugin install <plugin>@<marketplace>` 명령을 안내하세요
- 설치 후 다시 `/plugin-template:load <이름>`을 실행하도록 안내하고 중단하세요

### 4단계: settings.json 업데이트

`~/.claude/settings.json`을 읽으세요.

`enabledPlugins` 객체를 다음과 같이 업데이트하세요:
1. 템플릿의 `enabledPlugins`에 있는 플러그인: `true`로 설정
2. 현재 `enabledPlugins`에서 `true`이지만 템플릿에 없는 플러그인: `false`로 설정
3. 이미 `false`인 플러그인은 그대로 유지

**주의**: `enabledPlugins` 외의 다른 설정(hooks, permissions 등)은 절대 변경하지 마세요.

### 5단계: 결과 보고

활성화/비활성화/변경없음 플러그인 목록을 요약하세요.

**Claude Code를 재시작해야 변경사항이 적용됩니다**라고 안내하세요.
