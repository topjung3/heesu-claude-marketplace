# heesu-claude-marketplace

Claude Code 개인 마켓플레이스. 커스텀 에이전트, 스킬, 템플릿 관리 도구를 플러그인으로 제공합니다.

## 마켓플레이스 추가

```bash
/plugin marketplace add topjung3/heesu-claude-marketplace
```

## 플러그인 목록

| 플러그인 | 설명 | 외부 의존성 |
|----------|------|-------------|
| `plugin-template` | 플러그인 템플릿 저장/로드. 프로젝트별 플러그인 세트 빠르게 전환 | 없음 |

## 설치

### 마켓 플레이스 등록

```bash
/plugin marketplace add h
/plugin install plugin-template@heesu-claude-marketplace
```

## 개발

```bash
// TODO: 로컬 디렉토리로 plugin 등록 방법 설명
```

## 상세

### plugin-template

`plugin-template` 플러그인으로 프로젝트 유형별 플러그인 조합을 저장하고 전환할 수 있습니다.

### 현재 플러그인 구성을 템플릿으로 저장

```bash
/plugin-template:save go-backend Go 백엔드 개발 환경
```

### 저장된 템플릿 불러오기

```bash
# 템플릿 목록 보기
/plugin-template:load

# 특정 템플릿 로드
/plugin-template:load go-backend
```

로드 시 템플릿에 포함된 플러그인은 활성화, 나머지는 비활성화됩니다. 미설치 플러그인이나 미등록 마켓플레이스가 있으면 설치 명령을 안내합니다.

템플릿은 `~/.claude/templates/` 에 JSON 파일로 저장됩니다.

## 개발

### marketplace.json 동기화

플러그인을 추가/삭제한 뒤 `marketplace.json`을 자동 업데이트합니다.

```bash
make sync
```
