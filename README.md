# JavaScript 프로젝트에 Firebase 추가

# https://firebase.google.com/docs/web/setup?hl=ko

# Firebase 프로젝트 만들기

# https://console.firebase.google.com/u/0/?hl=ko

![스크린샷 2023-12-29 오후 9 43 20](https://github.com/jh0152park/Firebase-Recap/assets/118165975/8ca36c9b-7b32-4317-919f-4311ca99cab4)
![스크린샷 2023-12-29 오후 9 43 34](https://github.com/jh0152park/Firebase-Recap/assets/118165975/462afb8d-26c2-453f-823e-587238ef4114)
![스크린샷 2023-12-29 오후 9 43 45](https://github.com/jh0152park/Firebase-Recap/assets/118165975/b34f6cab-b433-41c4-8f0a-4d2c2e21299c)
![스크린샷 2023-12-29 오후 9 44 30](https://github.com/jh0152park/Firebase-Recap/assets/118165975/7a4f7cdc-030a-4931-8cab-305b84a74442)

# 프로젝트에 앱 추가하기

## iOS / Android / Web 선택하기

![스크린샷 2023-12-29 오후 9 45 01](https://github.com/jh0152park/Firebase-Recap/assets/118165975/c7787335-544a-4cae-a2a8-1630da41047c)
![스크린샷 2023-12-29 오후 9 53 05](https://github.com/jh0152park/Firebase-Recap/assets/118165975/f5e7f2c4-90e3-406e-9a43-378dd0082b3b)
![스크린샷 2023-12-29 오후 9 53 29](https://github.com/jh0152park/Firebase-Recap/assets/118165975/3a00bcda-79d1-48ba-901f-57d8d9db2522)

1. `npm install firebase`
2. `firebaseConfig` key 복사해두기
3. `src` 폴더에 `.env` 파일 생성하기 (`App.tsx`, `index.tsx` 파일과 같은 경로)
4. 복사해둔 `firebaseConfig` 키값을 `.env` 파일에 복사하기
5. `.gitignore`에 `.env`가 포함 되어있는지 확인하기

### .env 파일을 만들때 KEY값 이름 앞에 `REACT_APP_` 을 꼭 붙여야 한다

```
REACT_APP_API_KEY="my api key"
REACT_APP_AUTH_DOMAIN="my auth domail"
REACT_APP_PROJECT_ID="my project id"
REACT_APP_STORAGE_BUCKET="my sotrage bucket"
REACT_APP_MESSAGING_SENDER_ID="my messaging sender id"
REACT_APP_APP_ID="my app id"
```

### .env 파일의 key값은 아래처럼 사용한다

```
const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
...
...
```

## firebase config 선언하기

```JS
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
```
