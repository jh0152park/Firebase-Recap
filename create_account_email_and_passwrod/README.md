# 비밀번호 기반 계정 만들기

# https://firebase.google.com/docs/auth/web/password-auth?hl=ko

## 해당 예시의 경우 Email 주소와 기본적인 Password로 계정을 만들게 되는데,

## 문제는 유효하지 않은 Email 주소를 사용해도 문제가 없기 때문에 요구사항을 잘 확인해야 한다.

# Firebase 프로젝트 콘솔에서 인증 -> 로그인방법 -> 이메일/비밀번호 사용 설정을 먼저 해야한다.

![스크린샷 2023-12-29 오후 11 43 36](https://github.com/jh0152park/Firebase-Recap/assets/118165975/75287759-f186-4b49-bb6f-e2a7cac6a6d6)
![스크린샷 2023-12-29 오후 11 44 25](https://github.com/jh0152park/Firebase-Recap/assets/118165975/ef8b9c2b-c961-4498-98bb-c9c65a709a81)
![스크린샷 2023-12-29 오후 11 45 23](https://github.com/jh0152park/Firebase-Recap/assets/118165975/6111f766-dc65-4f58-b491-26bb3241ba34)
![스크린샷 2023-12-29 오후 11 45 47](https://github.com/jh0152park/Firebase-Recap/assets/118165975/95ad1483-2a0e-49a2-b4a6-09d9de92def8)
![스크린샷 2023-12-29 오후 11 46 28](https://github.com/jh0152park/Firebase-Recap/assets/118165975/5652d3d3-d3ce-4ad1-9f28-8e9ea803e29a)

# Create a new account code

```JS
async function onSubmit(data: any) {
        try {
            setCreate(true);
            const credentials = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            // await updateProfile(credentials.user, {
            //   displayName: data.name
            // })
            //
            alert("Create Account Done");
        } catch (e) {
            if (e instanceof FirebaseError) {
                const errorCode = e.code;
                const errorMessage = e.message;
                console.log(`code: ${errorCode}, message: ${errorMessage}`);
            }
        } finally {
            reset();
            setCreate(false);
        }
    }
```
