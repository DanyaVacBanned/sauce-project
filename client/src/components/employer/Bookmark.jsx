import React from 'react';
import men_img from '../../img/men1.jpg';
import flag from '../../img/flag.png';
import flag_active from '../../img/flag_active.png';
import { Link } from 'react-router-dom';
import { fetchAuthMe, fetchAddUserZ, fetchRemUserZ } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux'


const Bookmark = function(props) {


    const dispatch = useDispatch()


    let flag_counter = false
    const change_flag = async (e) => {
        if(flag_counter){
            e.target.src = flag_active
            e.target.classList.add('active_flag')
            flag_counter = false

            const id = props.rabotnik._id
            await dispatch(fetchAddUserZ(id))

        } else {
            e.target.src = flag
            e.target.classList.remove('active_flag')
            flag_counter = true

            const id = props.rabotnik._id
            await dispatch(fetchRemUserZ(id))
        }
    }



    const getID = () => {
        const userID = props.rabotnik._id
        localStorage.setItem('userID', userID)
    }

    return(
        <div className="rabotnik">
        <img src={flag_active} alt="" className="flag" onClick={change_flag} style={{zIndex: '15'}}/>
        <Link to='/exp_profile' onClick={getID}>
            <img src={men_img} alt="" className="men_img"/>
            <div className="rabotnik__info">
                <span className="rabotnik__work">Специальность:&#8194;{props.rabotnik.specional}.</span><br/>
                <span className="rabotnik__name">Стаж:&#8194;{props.rabotnik.stage ? props.rabotnik.stage : 'без стажа'}.</span><br/>
                <span className="rabotnik__country">Гражданство:&#8194;{props.rabotnik.cityzship}.</span><br/>
            </div>
        </Link>
        </div>
  )
}

export default Bookmark;