import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link, Text
} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom"
import {DASHBOARD, REGISTER} from "../../lib/routes";
import {useLogin} from "../hooks/auth.jsx";
import {useForm} from "react-hook-form"
import {useState} from "react";
import {emailValidate, passwordValidate} from "../../utils/form-validate/FormValidate.jsx";

const Login = () => {
    const {login, isLoading} = useLogin()
    const [text, setText] = useState('')
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();


    async function handleLogin(data) {
        const succeeded = await login({
            email: data.email,
            password: data.password,
            redirectTo: DASHBOARD,

        });
        if (succeeded) reset();
    }


    return (<Center className="w-full h-[100vh] flex ">
        <Box className='mx-1 max-w-md p-9 border-[1px] rounded-lg '>
            <Heading className="mb-4 text-lg text-center ">
                Log In
            </Heading>
            <form onSubmit={handleSubmit(handleLogin)}>
                <FormControl isInvalid={true} py="2">
                    <FormLabel>Email</FormLabel>
                    <Input type={"email"} placeholder={"email"} {...register("email", emailValidate)}/>
                    <FormErrorMessage> {errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={true} py="2">
                    <FormLabel>Password</FormLabel>
                    <Input type={"password"} placeholder={"password"} {...register('password', passwordValidate)}/>
                    <FormErrorMessage> {errors.password && errors.password.message} </FormErrorMessage>
                </FormControl>
                <Button
                    lg={'4'}
                    type={"submit"}
                    colorScheme={"teal"}
                    size={"md"} w={'full'}
                    isLoading={isLoading}
                    loadingText={'Logging in '}>Log In</Button>
            </form>
            <Text fontSize={"xlg"} align={"center"} mt={"^"}>Dont have not account
                <Link as={RouterLink} to={REGISTER} color={"teal.400"} marginRight={"10px"} marginLeft={"10px"}
                      style={{fontWeight: "bold"}}>register</Link>
                Instead!
            </Text>
        </Box>
    </Center>)
}
export default Login
