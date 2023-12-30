import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
    const [create, setCreate] = useState(false);
    const { register, handleSubmit, reset } = useForm();

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

    return (
        <Center w="100%" h="100vh">
            <VStack w="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack w="50%" alignItems="flex-start">
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        type="email"
                        {...register("email", { required: true })}
                    />
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                </VStack>
                <Button colorScheme="teal" type="submit" isLoading={create}>
                    Submit
                </Button>
            </VStack>
        </Center>
    );
}

export default App;
