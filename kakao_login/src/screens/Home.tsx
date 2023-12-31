import { Center, Text } from "@chakra-ui/react";

declare global {
    interface Window {
        Kakao: any;
    }
}

const KAKAO_SCOPE_NICKNAME = "profile_nickname";
const KAKAO_SCOPE_PROFILE_IMAGE = "profile_image";

export default function Home() {
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }

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

    return (
        <Center w="100%" h="100vh">
            <Center
                w="250px"
                h="50px"
                borderRadius="30px"
                bgColor="yellow.400"
                _hover={{
                    cursor: "pointer",
                    bgColor: "yellow.500",
                }}
                transition="all 0.2s linear"
                onClick={onLoginWithKakao}
            >
                <Text fontWeight="bold" fontSize="25px">
                    카카오 로그인하기
                </Text>
            </Center>
        </Center>
    );
}
