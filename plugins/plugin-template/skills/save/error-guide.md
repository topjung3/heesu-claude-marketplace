# Save 에러 복구 가이드

스크립트 실행이 실패한 경우 아래 절차를 수동으로 수행하세요.

## 1단계: 현재 활성 플러그인 읽기

`~/.claude/settings.json` 파일을 읽고 `enabledPlugins` 객체에서 값이 `true`인 플러그인만 추출하세요.

`enabledPlugins`가 없거나 활성화된 플러그인이 없으면 사용자에게 알리고 중단하세요.

## 2단계: 마켓플레이스 정보 수집

`~/.claude/plugins/known_marketplaces.json` 파일을 읽으세요.

활성화된 각 플러그인의 마켓플레이스 이름(@ 뒤의 부분)에 해당하는 마켓플레이스 source 정보를 매칭하세요. `installLocation` 필드는 제외하고 `source` 필드만 포함합니다.

## 3단계: 디렉토리 및 중복 확인

`~/.claude/templates/` 디렉토리가 없으면 Bash로 생성하세요:
```
mkdir -p ~/.claude/templates
```

`~/.claude/templates/<이름>.json` 파일이 이미 존재하면 사용자에게 덮어쓸지 물어보세요. 거부하면 중단합니다.

## 4단계: 템플릿 파일 저장

다음 형식의 JSON 파일을 `~/.claude/templates/<이름>.json`에 저장하세요:

```json
{
  "name": "<템플릿 이름>",
  "description": "<설명 또는 빈 문자열>",
  "created_at": "<현재 ISO 8601 타임스탬프>",
  "enabledPlugins": {
    "<plugin@marketplace>": true
  },
  "knownMarketplaces": {
    "<marketplace-name>": {
      "source": { "source": "git", "url": "..." }
    }
  }
}
```

## 5단계: 결과 보고

저장된 템플릿의 이름, 포함된 플러그인 목록, 저장 경로를 사용자에게 알려주세요.
