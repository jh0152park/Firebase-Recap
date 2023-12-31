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
