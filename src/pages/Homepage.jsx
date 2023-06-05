import notebook from "../assets/notebook.png";
import {  Button, useColorMode, useColorModeValue, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./style.css"

export default function Homepage() {
  const nav = useNavigate()
  const { toogleColorMode } = useColorMode()
  const bg = useColorModeValue("#AEE2FF", "#B799FF")
  
  return (
    <div className="home">
      <section>
        <img src={notebook} alt="" className="home__image" />
      </section>
      <div className="warpper">

      <section>
        <h1 className="home__content">
        All your notes.<br />
          Organized. <br />
          Effortless.<br />
          </h1>
          <p>Easily, Create, Manage, And Categorize Your Notes With Evernote App. </p>
          

          <Button ml={'80px'} mt={'20px'} bg={bg} p={'20px'} onClick={() => { nav('/register') }} >Signup
         </Button>
          
         <Text textDecoration={'underline'} fontSize={'15px'} fontWeight={'600'} cursor={'pointer'} onClick={() => nav('/login')}>Already have an account ?</Text>
        </section>
        
        </div>

    </div>
    

  );
}
