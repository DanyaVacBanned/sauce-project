import React, { useState } from 'react';
import flag from '../../../img/flag.png';
import flag_active from '../../../img/flag_active.png';
import { Link } from 'react-router-dom';
import { fetchAuthMe, fetchAddFAppZ, fetchRemFAppZ } from '../../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux'

const FastExp = function(props) {


    let [flag_counter, setFlag_counter] = useState(false)

    const change_flag = async (e) => {
        e.target.src = flag_active
        e.target.classList.add('active_flag')
        setTimeout(() => {
            e.target.classList.remove('active_flag')
            e.target.src = flag
        }, 1000)
        flag_counter = false

        const id = props.fastrabotnik._id
        console.log(id)
        await dispatch(fetchAddFAppZ(id))
    }

    const isAuth = Boolean(window.localStorage.getItem('accessToken'))
    const dispatch = useDispatch()

    
    const getID = () => {
        const userID = props.fastrabotnik.user
        localStorage.setItem('userID', userID)
    }
    

    return(
        <div className="rabotnik">
        <img src={flag_counter ? flag_active : flag} alt="" className="flag" onClick={change_flag} style={{zIndex: '15'}}/>
        <Link to='/emp_profile' onClick={getID}>
            <div className='rabotnik__info'>
                <p>{props.fastrabotnik.title}</p>
                <p>{props.fastrabotnik.text}</p>
            </div>
        </Link>
        </div>
  )
}

export default FastExp;