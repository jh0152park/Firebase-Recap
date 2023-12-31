import { Center, Text } from "@chakra-ui/react";

export default function Home() {
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
            >
                <Text fontWeight="bold" fontSize="25px">
                    카카오 로그인하기
                </Text>
            </Center>
        </Center>
    );
}
