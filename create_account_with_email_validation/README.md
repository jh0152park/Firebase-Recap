
![스크린샷 2023-12-31 오후 5 05 14](https://github.com/jh0152park/Firebase-Recap/assets/118165975/e5a75a16-09c0-4241-836f-a18ecfd2244c)

### 혹시 모르니 Firebase console에서 비밀번호가 없는 email login 허용해준다.

# Workflow
이메일 계정 인증은 `이메일 + 비밀번호로 계정을 만드는 단계`에서 추가적으로 이루어지는 과정이다.

따라서 계정을 생성만 할뿐 자동으로 로그인이 되도록 해서는 안된다. (이메일 인증이 아직 이루어 지지 않았기 때문이다.)

이메일과 비밀번호로 계정을 만들었으면, 해당 이메일로 Verification link를 전송하고, Valid한 Email이라면 해당 link를 통해 이메일 인증을 진행한다.

그 이후 Sign in with email을 하는 과정에서 `user.emailVerfied`가 `True`일 경우 정상적으로 로그인을 진행하게 되고,
인증이 되지 않았을 경우 로그인을 제한할 수 있다.


----------

## Verification link at email
![스크린샷 2023-12-31 오후 5 43 08](https://github.com/jh0152park/Firebase-Recap/assets/118165975/60f77827-1731-4974-a5ad-81c63c5fc14c)


## user.emailVerified 값
![스크린샷 2023-12-31 오후 5 45 08](https://github.com/jh0152park/Firebase-Recap/assets/118165975/c2a08aff-e1c9-4fa7-9779-484f9837d0d9)

## Send email code
```JS
function onSubmit(data: any) {
        setCreate(true);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                sendEmailVerification(userCredential.user).then(() => {
                    alert("send verification email");
                    console.log(userCredential.user.email);
                    console.log(userCredential.user.emailVerified);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`code: ${errorCode}, message: ${errorMessage}`);
            })
            .finally(() => {
                reset();
                setCreate(false);
            });
    }
```
