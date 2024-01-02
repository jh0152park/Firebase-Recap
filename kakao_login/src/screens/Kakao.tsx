import { useNavigate } from "react-router-dom";
import { Center, Heading } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase";

export default function Kakao() {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
        navigate("/login");
    }

    async function kakaoLogin() {
        try {
            const auth = getAuth(firebaseApp);
            const res = await axios.post("/api/auth/kakao", { code });
            console.log(res.data);
            const { firebaseToken } = res.data;
            const kakaoUser = await signInWithCustomToken(auth, firebaseToken);

            alert(`${kakaoUser.user.displayName}님 로그인 완료!`);
        } catch (error) {
            //
        }
    }

    useEffect(() => {
        kakaoLogin();
    }, []);

    return (
        <Center w="100%" h="100vh">
            <Heading>Kakao login route</Heading>
        </Center>
    );
}
