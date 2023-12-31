import { useNavigate } from "react-router-dom";
import { Center, Heading } from "@chakra-ui/react";

export default function Kakao() {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    console.log(code);
    if (!code) {
        navigate("/login");
    }

    return (
        <Center w="100%" h="100vh">
            <Heading>Kakao login route</Heading>
        </Center>
    );
}
