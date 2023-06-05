

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../../Redux/users/user.types'
import { logoutUser } from '../../../Redux/users/user.actions';
import { toast } from 'react-toastify';





export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch()
  const {auth,token,loading,error} = useSelector((state)=>state.userReducer)

  const nav = useNavigate()
  const bg = useColorModeValue("#ACBCFF" , "gray.800")

  const handleLogout = () => {
    dispatch(logoutUser())
    toast.success('loged out successfully')
  }
 return (
    <>
      <Box bg={bg} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'} cursor={'pointer'} fontFamily={'Lato'} fontSize={'20px'}>
            <Box onClick={() => nav('/')}>Notezy</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
                <Button position={'absolute'} right={'120px'} onClick={() => nav('/notes')}>All Notes</Button>
                <Button onClick={handleLogout} position={'absolute'} right={'240px'} display={auth == true?"block":"none"}>Logout</Button>
              </HStack>
          </HStack>
          <Flex alignItems={'center'}>
         
          <Button  onClick={toggleColorMode} mr={"25px"}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Text display={auth} ml={'15px'} mb={'-20px'} onClick={() => nav('/notes')} >All Notes</Text>
              <Text ml={'15px'} onClick={handleLogout}  display={auth == true?"block":"none"}>Logout</Text>
            </Stack>
          </Box>
        ) : null}
      </Box>

      
    </>
  );
}