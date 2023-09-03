import React from 'react';
import men_img from '../../../img/men1.jpg';
import flag from '../../../img/flag.png';
import flag_active from '../../../img/flag_active.png';
import { Link } from 'react-router-dom';
import { fetchAuthMe, fetchAddFAppZ, fetchRemFAppZ } from '../../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux'


const Fast_Bookmark = function(props) {


    const dispatch = useDispatch()

    const getID = () => {
        const userID = props.rabotnik._id
        localStorage.setItem('userID', userID)
        console.log(userID)
    }

    let flag_counter = false
    const change_flag = async (e) => {
        if(flag_counter){
            e.target.src = flag_active
            e.target.classList.add('active_flag')
            flag_counter = false

            const id = props.rabotnik._id
            await dispatch(fetchAddFAppZ(id))
            console.log(id)
        } else {
            e.target.src = flag
            e.target.classList.remove('active_flag')
            flag_counter = true

            const id = props.rabotnik._id
            await dispatch(fetchRemFAppZ(id))
        }
    } 

    return(
        <div className="rabotnik">
        <img src={flag_active} alt="" className="flag" onClick={change_flag} style={{zIndex: '15'}}/>
        <Link to='/exp_profile' onClick={getID}>
            <div className="rabotnik__info">
                <p>{props.rabotnik.title}</p>
                <p>{props.rabotnik.text}</p>
            </div>
        </Link>
        </div>
  )
}

export default Fast_Bookmark;