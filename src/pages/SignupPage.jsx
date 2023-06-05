import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import {
    
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement
    
  } from '@chakra-ui/react';
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/config";
import { getUser } from "../Redux/users/user.actions";
import { toast } from "react-toastify"
export default function SignupPage(){
    const nav = useNavigate()
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [name,setName] =useState("")
  const [showPassword, setShowPassword] = useState(false)


    const handleSignup =async()=>{
        let data = await axios.post(BASE_URL+"/user/register",{
            name,email,password
        })
        let  {message,status} = data.data
        if(status==1){
            toast.success('User created successfully')
            nav("/login")
            localStorage.setItem('userInfo', JSON.stringify(data))
        }else{
            toast.error('Enter correct credentials')
        }
    }
   

    return (
        <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.100', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Heading fontSize={'2xl'} textAlign={'center'} mt={"-25px"} mb={"25px"}>Sign up </Heading>
          <Stack spacing={4}>
          <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input  value={name} onChange={(e)=>setName(e.target.value)} type="text" required />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  required
  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
  
/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
              </Stack>
              <Box textDecoration={'underline'} cursor={'pointer'} mt={'-25px'} onClick={() => nav('/login')} color={'blue.300'}>Login?</Box>
              <Button
              onClick={handleSignup}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>


        


      

    )
}