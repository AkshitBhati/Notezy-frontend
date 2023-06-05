import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  useColorMode,
  useColorModeValue,
  Box
} from "@chakra-ui/react";
import "./style.css";

import { useDispatch } from "react-redux";
import { deleteNotes, updateNotes } from "../../../Redux/notes/note.actions";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify"
export default function NoteCard({ title, body, user, _id }) {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [tempTitle, setTitle] = useState(title);
  const [tempBody, setBody] = useState(body);

  
  const updateNote =()=>{

    dispatch(updateNotes(_id,{title:tempTitle,body:tempBody}))
    onClose()
    toast.success('Note updated successfully')
  }
  
  const { toggleColorMode } = useColorMode()
  const cardBg = useColorModeValue("#FFB4B4", 'gray.500')

  return (
    <Card bg={cardBg} color="white">
  <CardBody>
    <Box textAlign="center">
      <Heading as="h1" fontWeight="600" fontFamily="Roboto" fontSize={{ base: "20px", md: "24px", lg: "28px" }} mb={2}>
        {title}
      </Heading>
      <Heading as="h3" fontWeight="500" fontSize={{ base: "16px", md: "18px", lg: "20px" }} my={2}>
        {body}
      </Heading>
    </Box>

    <Flex justifyContent="center" alignItems="center" mt={4}>
      <>
        <Button onClick={onOpen} mr={3}>
          Update
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                value={tempTitle}
                m
                placeholder="Please enter title"
                onChange={(e) => setTitle(e.target.value)}
              ></Input>
              <Textarea
                mt={8}
                value={tempBody}
                placeholder="Please enter description"
                onChange={(e) => setBody(e.target.value)}
              ></Textarea>
            </ModalBody>

            <ModalFooter >
              <Button colorScheme="blue" mr={3} onClick={updateNote}>
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>

              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <Button
        onClick={() => {
          dispatch(deleteNotes(_id));
        }}
      >
        Delete
      </Button>
    </Flex>
  </CardBody>
</Card>

  );
}
