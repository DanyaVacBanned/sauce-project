import React from "react";
import { Link } from 'react-router-dom';
import menu_mobile from '../../img/меню.png'

function ExpNavbarMobile() {

    let menuCouner = false
    const dropdownMenu = () => {
        if(!menuCouner) {
            document.querySelector('.navbar_menu-mobile').style.display = 'block';
            menuCouner = true;
        } else {
            document.querySelector('.navbar_menu-mobile').style.display = 'none'
            menuCouner = false;
        } 
    }


    return (
        <div className='mobileNavbar exp'>
            <img src={menu_mobile} onClick={dropdownMenu}/>
            <ul className="navbar_menu-mobile">
                <li className="navbar__element "><Link to='/profile_exp'>Личный кабинет</Link></li>
                <li className="navbar__element"><Link to='/ads_exp'>Вакансии</Link></li>
                <li className="navbar__element fast twoString"><Link to='/fast_ads_exp'>Срочные заявки.<br/> Подработка</Link></li>
                <li className="navbar__element"><Link to='/forum'>Форум</Link></li>
                <li className="navbar__element"><Link to='/mainchat'>Сообщения</Link></li>
                <li className="navbar__element fast twoString"><Link to='/info'>Информация и Новости</Link></li>
                <li className="navbar__element out outExp">                  
                <Link to='/' 
                    //   onClick={window.localStorage.removeItem('accessToken')}
                      >
                      Выход
                </Link>
                </li>
            </ul>
        </div>
    );
  }
  
  export default ExpNavbarMobile;