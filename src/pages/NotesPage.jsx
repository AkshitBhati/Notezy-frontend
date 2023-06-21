import { Box, Button, Grid, IconButton, Input, Textarea, useDisclosure, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../components/Notespage/NoteCard/NoteCard";
import { createNotes, getNotes } from "../Redux/notes/note.actions";
import { BsPlusLg } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { ChromePicker } from 'react-color';
import { IoMdColorPalette } from "react-icons/io";


export default function NotesPage() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.noteReducer);
  const { toggleColorMode } = useColorMode();
  const [notes, setNotes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noteColor, setNoteColor] = useState("#ACBCFF");
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const createNote = () => {
    if (body === "") {
      toast.error("Enter valid details");
    } else {
      dispatch(createNotes({ title, body, color: noteColor }));
      toast.success("Note created successfully");
      onClose();
      setTitle("");
      setBody("");
    }
  };

  const handleColorChange = (color) => {
    setNoteColor(color.hex);
  };

  const toggleColorPicker = () => {
    setColorPickerOpen(!isColorPickerOpen);
  };

  return (
    <Box mt={20} padding={8} >
      <Box
        display="grid"
        gridGap={10}
        w="90%"
        margin="auto"
        gridTemplateColumns={{ sm: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
      >
        {notes?.map((el) => (
          <NoteCard {...el} color={noteColor} />
        ))}
      </Box>

      <>
        <IconButton
          boxShadow={
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
          }
          position={"fixed"}
          w={"80px"}
          h={"80px"}
          borderRadius={50}
          bg={noteColor}
          bottom={0}
          right={0}
          onClick={onOpen}
          margin={16}
          icon={<BsPlusLg />}
        ></IconButton>

        <Modal
          bg={"red"}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent backgroundColor={noteColor}>
            <ModalHeader>Create New Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input
                value={title}
                placeholder="Please enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                mt={8}
                value={body}
                placeholder={"Please enter description"}
                onChange={(e) => setBody(e.target.value)}
              />
              <div
                style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                onClick={toggleColorPicker}
              >
                <IoMdColorPalette style={{fontSize:"35px"}} />
                {isColorPickerOpen && (
                  <ChromePicker color={noteColor} onChange={handleColorChange} />
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={createNote}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
}
