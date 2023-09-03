import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/chat/main.scss";
import EmpNavbar from "../../components/employer/EmpNavbar";
import EmpNavbarMobile from "../../components/employer/EmpNavbarMobile";
import Peoples from "../../components/Peoples";

const MainChat = () => {


  const [peoples, setPeople] = useState([
    {id: 1, name: 'Антон', lastMessage: 'пока'},
    {id: 2, name: 'Гриша', lastMessage: 'понял'},
    {id: 3, name: 'Егор', lastMessage: 'ахах'},
    {id: 4, name: 'Борис', lastMessage: ''},
    {id: 5, name: 'Катя', lastMessage: 'окей'}, 
  ])

  return (
    <div className="mainChat">

      <EmpNavbar/>
      <EmpNavbarMobile/>

      <div className="container">
          <Peoples peoples={peoples}/>
      </div>
    
    </div>
  );
};

export default MainChat;