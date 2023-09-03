import React, { useState } from 'react';
import flag from '../../img/flag.png';
import flag_active from '../../img/flag_active.png';
import { Link } from 'react-router-dom';
import { fetchAuthMe, fetchAddZ, fetchRemZ } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux'

const Rabotnik_ads = function(props) {

    let [flag_counter, setFlag_counter] = useState(false)

    const change_flag = async (e) => {
        e.target.src = flag_active
        e.target.classList.add('active_flag')
        setTimeout(() => {
            e.target.classList.remove('active_flag')
            e.target.src = flag
        }, 1000)
        flag_counter = false

        const id = props.ads._id
        await dispatch(fetchAddZ(id))
    }


    const isAuth = Boolean(window.localStorage.getItem('accessToken'))
    const dispatch = useDispatch()

    const getID = () => {
        const userID = props.ads.user
        localStorage.setItem('userID', userID)
    }

    return(
        <div className="rabotnik">
        <img src={flag_counter ? flag_active : flag} alt="" className="flag" onClick={change_flag} style={{zIndex: '15'}}/>
        <Link to='/exp_profile'>
            <div className='rabotnik__info' onClick={getID}>
                <p>{props.ads.title}</p>
                <p>{props.ads.text}</p>
            </div>
        </Link>
        </div>
  )
}

export default Rabotnik_ads;