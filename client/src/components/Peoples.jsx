import React from "react";
import men from '../img/men1.jpg'
import People from "./People";

const Peoples = ({peoples}) => {



  return (

          <div className="peoples">
            {peoples.map((e) => <People people={e} key={e.id}/>)}
          </div>

  );
};

export default Peoples;