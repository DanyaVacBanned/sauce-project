import React, {useState} from 'react';
import krest from '../../../img/крестик.png'
import { fetchAppDelete } from '../../../redux/slices/auth'
import { useDispatch, useSelector } from "react-redux";

const MyBidFast_exp = function(props) {

    const dispatch = useDispatch()


    let [myapps, setMyapps] = useState([])

    const Delete = async (e) => {
        
        const result = window.confirm('удалить объявление?')
        if(result){
            const id = props.bid._id
            myapps = await dispatch(fetchAppDelete(id))
            setMyapps(myapps)
        }
    }

    return(
        <div className="rabotnik-my">
            <div className='delete'><img src={krest} onClick={Delete}/></div>
            <div className='rabotnik__info-my'>
                <p>{props.bid.title}</p>
                <p>{props.bid.text}</p>
            </div>
        </div>
  )
}

export default MyBidFast_exp;