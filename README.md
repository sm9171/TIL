# Today I Learned

http://sm9171.github.io/TIL/


@sm9171 이 오늘 새로 배운 것을 다음의 규칙으로 commit 합니다. [thoughtbot til 참고](https://github.com/thoughtbot/til)

## 로컬에서 띄우기
```bash
$ yarn
$ yarn dev
```

### 빌드 및 배포

Opt1. GitHub Actions로 자동화
[main.yaml](https://github.com/milooy/TIL/blob/master/.github/workflows/main.yml) 참고

Opt2. 직접 배포
```bash
$ yarn build
$ yarn deploy