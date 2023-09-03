import React, {useState} from 'react';
import Timer from '../Timer';
import krest from '../../img/крестик.png'
import { fetchAppDelete } from '../../redux/slices/auth'
import { useDispatch, useSelector } from "react-redux";
const Myads_rab = function(props) {

    const OnClickUp = (e) => {
       e.target.style.display = 'none';
       e.target.nextElementSibling.style.display = 'block';
       
    };

    let [myapps, setMyapps] = useState([])

    const dispatch = useDispatch()


    const Delete = async (e) => {
    
        const result = window.confirm('удалить объявление?')
        if(result){
            const id = props.myads._id
            myapps = await dispatch(fetchAppDelete(id))
            setMyapps(myapps)
        }
    }

   

    return(
        <div className="rabotnik-my">
            <div className='delete'><img src={krest} onClick={Delete}/></div>
            <div className="rabotnik__info-my">
                <p>{props.myads.title}</p>
                <p>{props.myads.text}</p>
            </div>
            <button onClick={OnClickUp} className="up">Поднять в поиске</button>
            <Timer/>
        </div>
  )
}

export default Myads_rab;