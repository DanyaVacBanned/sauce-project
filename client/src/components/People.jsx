import React from "react";
import men from '../img/men1.jpg'
import { Link } from "react-router-dom";
const People = (props) => {



  return (
          <Link to='/chat' style={{textDecoration: 'none'}}>
            <div className="people">
              <img src={men} className="peopleAvatar"/>
              <span className="peopleName">{props.people.name}</span>
              <p className="lastMessage"><span>Последнее сообщение: </span>{props.people.lastMessage}</p>
            </div>
          </Link>
  );
};

export default People;