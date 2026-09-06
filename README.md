# MI ART COMPANY · 미아트컴퍼니

공연·창작, 전통춤 계승, 커뮤니티아트와 예술교육을 소개하는 홈페이지입니다.

## 주요 화면

- HOME / ABOUT / 김유미 PROFILE
- PERFORMANCE / HERITAGE / STORY DANCE
- 프로젝트 아카이브, 소식, 문의, 관리자 화면

## 개발 환경

Node.js 24 이상과 pnpm을 사용합니다.

```sh
pnpm install
pnpm dev
```

미리보기 주소는 실행 후 터미널에 표시됩니다. 로컬 서버가 종료되면 접속할 수 없습니다.
Windows 개발 환경에서는 `preview/local-bindings.ts`의 SQLite 어댑터를 사용합니다.
로컬 데이터는 `.wrangler/` 아래에 저장되며 Git에 포함되지 않습니다.

## 빌드와 데이터베이스

```sh
pnpm build
pnpm db:generate
```

운영 환경은 Cloudflare Workers와 D1을 사용합니다. `.openai/hosting.json`에는 Sites 연결 정보가 있습니다.
GitHub에 코드를 올리는 것만으로 홈페이지가 배포되지는 않습니다.

## 관리자 설정

운영 환경의 `ADMIN_EMAIL`에 관리자 GitHub 계정이 아닌, ChatGPT 로그인 이메일을 설정해야 합니다.
관리자 이메일이 설정되지 않으면 관리자 기능은 접근을 거부합니다.
문의는 데이터베이스에 저장되며 이메일 자동 발송 기능은 포함하지 않습니다.
실제 연락처와 SNS 주소는 관리자 화면에서 입력합니다.

## 이미지

메인 화면 이미지는 `public/img/teacher-main.jpg`입니다.
`img/`는 작업용 원본 폴더로 Git에서 제외합니다.
사진과 콘텐츠의 사용 권한은 해당 권리자에게 있습니다.

## 현재 상태

로컬 미리보기용 구현입니다. 운영 배포 및 관리자 이메일 연결은 별도로 완료해야 합니다.
실제 공연 이력과 소식은 관리자 화면에서 등록할 수 있습니다.
