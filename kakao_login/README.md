참고: https://velog.io/@hadam/integrate-kakao-login-with-firebase-using-react-and-functions-2

## 1.[카카오 개발자 사이트 이동](https://developers.kakao.com)

![스크린샷 2023-12-31 오후 8 30 28](https://github.com/jh0152park/Firebase-Recap/assets/118165975/e060430b-1b24-46bb-bd04-393d3ad78dcd)

## 2. `내 애플리케이션` 추가

![스크린샷 2023-12-31 오후 8 35 45](https://github.com/jh0152park/Firebase-Recap/assets/118165975/d9d767da-5c65-4dcb-bfd2-027f871bd991)

## 3. 앱 키 기억하기

![스크린샷 2023-12-31 오후 8 37 23](https://github.com/jh0152park/Firebase-Recap/assets/118165975/dd1d0e5f-2ff6-4981-9872-ebfecc854b87)

## 4. 플랫폼 설정하기 => Web 플랫폼 등록

![스크린샷 2023-12-31 오후 8 46 54](https://github.com/jh0152park/Firebase-Recap/assets/118165975/0d5956cc-6855-4eef-9200-831756b04d6e)

## 5. 사이트 도메인 등록하기 ex)localhost:3000

## 6. 카카오 로그인이 될 Redirect URI 등록

![스크린샷 2023-12-31 오후 8 52 57](https://github.com/jh0152park/Firebase-Recap/assets/118165975/f487b4c0-642f-4f74-a4e6-427d4f2b95bb)

### 6-1. 상태 활성화 On

![스크린샷 2023-12-31 오후 9 27 57](https://github.com/jh0152park/Firebase-Recap/assets/118165975/3a6e584f-990b-467c-bbd1-05be58412ee3)

### 6-2. Redirect URI 등록

![스크린샷 2023-12-31 오후 10 10 46](https://github.com/jh0152park/Firebase-Recap/assets/118165975/30a76b59-b771-4053-83f2-f09386895e2b)

## 7. 동의항목 => 필요한 데이터 설정 ex)프로필 정보, 이메일, 성별, etc...

![스크린샷 2023-12-31 오후 10 46 16](https://github.com/jh0152park/Firebase-Recap/assets/118165975/e424c749-c333-412e-a5d0-f463566f5357)

## 8. [JavaScript Download](https://developers.kakao.com/docs/latest/ko/javascript/download) 에서 Full SDK 복사 후 `public/index.html`의 head 부분에 복사

## 9. 코드에서 복사해둔 KEY값으로 초기화

```JS
if (!window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
}
```

## 10. Kakao 로그인 실행

```JS
function onLoginWithKakao() {
    const redirectUri = `${window.location.origin}/login/kakao`;
    const scope = [KAKAO_SCOPE_NICKNAME, KAKAO_SCOPE_PROFILE_IMAGE].join(
        ","
    );

    window.Kakao.Auth.authorize({
        redirectUri,
        scope,
    });
}
```

## 11. 로그인이 정상적으로 이루어졌다면, 미리 정의해둔 Redirect URL로 이동하게되고 Token이 함께 넘어옴

![스크린샷 2023-12-31 오후 11 24 18](https://github.com/jh0152park/Firebase-Recap/assets/118165975/30018093-d372-42ca-bba1-749bbda1a16f)

## 12. `URLSearchParams`를 이용해 code(token)값을 갖고오고, 만약 없다면 로그인을 다시하도록 구성

```JS
const navigate = useNavigate();
const searchParams = new URLSearchParams(window.location.search);
const code = searchParams.get("code");

console.log(code);
if (!code) {
    navigate("/login");
}
```

## 13. firebase function을 사용하기 위해 `npm install firebase-tools` 명령어로 설치 진행

### 13-1. 터미널에 `firebase login` 입력 후 로그인 (로그인이 되어 있다면, Already logged in as `my account`가 출력)

### 13-2. 터미널에 `firebase init functions` 입력

### 13-3. `Use an existing project` 선택 후 현재 firebase에서 사용중인 프로젝트 선택

### 13-4. 언어는 타입스크립트 선택

### 13-5. 이후 모두 엔터

### 13-6. 이제 `functions/src/index.ts`에 코드 작성이 가능

## 14. [HTTP 요청 함수 작성](https://firebase.google.com/docs/functions/http-events?hl=ko&gen=2nd)

### 필요한 API들

#### - 클라이언트로 부터 인가 코드를 전달 받는 함수

#### - 인가 코드로 토큰 발급을 요청할 함수

#### - 카카오 유저 정보를 갖고오는 함수

#### - Firebase auth user 생성하는 함수

#### - 생성된 user id를 이용해 custom token을 생성하는 함수

#### - 클라이언트로 custome token을 전달하는 함수

## 15. `npm install express cors` 명령어를 이용해 설치

## 16. `functions/src/index.ts`파일에 express 앱을 생성

```JS
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors({ origin: true }));

app.post("/kakao", async (req, res) => {
    // TODO: API 구현하기
});

exports.auth = functions.https.onRequest(app);

```

### [KAKAO REST API DOC](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token)

## 17. 토큰을 요청하기 위해서는 REST API키가 필수이고, 이는 [내 애플리케이션] > [앱 키]에서 확인 가능

![스크린샷 2024-01-01 오전 12 16 52](https://github.com/jh0152park/Firebase-Recap/assets/118165975/c172225c-731a-4f40-835b-e5a3abec1ddd)

## 18. axios를 이용해 HTTP 통신을 처리하고, dotenv도 함께 설치 `npm install dotenv axios`

## 19. getToken 함수 작성

```JS
async function getToken(code: string): Promise<ITokenResponse> {
    const body = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY as "",
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI as "",
        code: code,
    };

    const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams(body)
    );
    return res.data;
}
```

## 20. getKakaoUser 함수 작성

```JS
async function getKakaoUser(token: string): Promise<KakaoUser> {
    const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}
```

## 21. `npm install firebase-admin` 명렁어로 설치

#### 가져온 카카오 유저 정보를 바탕으로 Firebae Authentication을 이용해 사용자를 생성해 주어야 하고,

#### 이때 사용자와 Custom Token을 생성하기 위해서 Admin SDK가 필요.

### 21-1. 서비스 계정의 비공개 키 파일 생성

#### a. Firebase Console -> Project 설정 -> 서비스 계정 -> 새 비공개 키 생성

#### b. 생성된 키는 download되는데 복구가 불가능하니 잘 간직

#### c. Download된 키 파일을 이용해 Admin App을 초기화하기 위해서 Secret Manager를 이용해 환경을 구성해야함

#### d. 먼저 구글 콘솔로 이동해 보안 비밀을 생성. [바로가기](https://console.cloud.google.com/)

        - 결제 정보가 연동이 되어야 보안 비밀 생성이 가능

#### e. 이름, 다운로드 했던 비공개키 업로드

#### f. `functions/src/index.ts`의 exports.auth = 부분에 생성한 보안 비밀에 접근할 수 있도록 runWith추가

#### g. Admin app 초기화 코드 작성

## 22. 사용자 만들기

생성한 app을 이용해 auth service를 불러오고 유저 업데이트를 시도함.
만약 유저가 없다면 `auth/user-not-found` 에러가 발생하므로, try-catch문을 이용해 유저 생성 코드를 작성해야함.
[추가 오류 코드 목록](https://firebase.google.com/docs/auth/admin/errors?hl=ko)

## 23. [커스텀 토큰 만들기](https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=ko)

## 24. [함수배포](https://firebase.google.com/docs/functions/get-started?hl=ko&gen=2nd#deploy-functions-to-a-production-environment)

    - firebase deploy --only functions

배포가 완료되면 Firebase Console -> 모든 제품 -> Functions에서 확인 가능

배포 시도시 --fix 에러가 발생할 경우

```
$ (cd functions && npx eslint . --fix)
# or
$ (cd functions && node_modules/eslint/bin/eslint.js . --fix)
```

배포 시도시 `Missing JSDoc comment` 에러가 발생할 경우, `.eslintrc.js`파일의 `rules`부분에 아래와 같이 에러가 나는 함수를 추가

```
"require-jsdoc": [
    "error",
    {
        require: {
            getToken: false,
            getKakaoUser: false,
            getAdminApp: false,
            updateOrCreateUser: false,
        },
    },
],
```

위 방법이 동작하지 않는다면, 함수들을 function이 아닌 arrow function으로 다시 작성한다.

추가적으로 react-router 에서 deploy functions 중 에러가 발생되고있다.

버전6부터 `@types/react-router-dom`이 필요하지 않으므로 삭제하도록 한다. `npm uninstall @types/react-router-dom`
[참고링크](https://stackoverflow.com/questions/70138299/types-react-router-dom-gives-errors-when-vite-build)

```
Error: Your project recap-1daad must be on the Blaze (pay-as-you-go) plan to complete this command. Required API cloudbuild.googleapis.com can't be enabled until the upgrade is complete. To upgrade, visit the following URL:

https://console.firebase.google.com/project/recap-1daad/usage/details
```

또 위와같은 에러가 발생할 경우, firebase console에서 요금제를 아직 변경하지 않아서 발생하는 에러이다.

이미 결제정보는 입력해 두었으므로 콘솔에서 요금제를 Spark 에서 Blaze로 변경하자.

이후 디플로이 시도시 빈번하게 에러가 발생하는데, 에러를 잘 처리하고 다시 확인해보자. (dependencies가 잘 설치 되어있는지 등등)
