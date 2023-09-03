import React from "react";
import { Link } from 'react-router-dom';
import menu_mobile from '../../img/меню.png'


function EmpNavbarMobile() {

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
        <div className='mobileNavbar'>
            <img src={menu_mobile} onClick={dropdownMenu}/>
            <ul className="navbar_menu-mobile">
                <li className="navbar__element"><Link to='/profile_rab'>Личный кабинет</Link></li>
                <li className="navbar__element"><Link to='/experts'>Специалисты</Link></li>
                <li className="navbar__element"><Link to='/ads_rab'>Объявления</Link></li>
                <li className="navbar__element"><Link to='/fast_ads_rab'>Срочные заявки</Link></li>
                <li className="navbar__element"><Link to='/forum'>Форум</Link></li>
                <li className="navbar__element"><Link to='/mainchat'>Сообщения</Link></li>
                <li className="navbar__element fast"><Link to='/info'>Информация и Новости</Link></li>
                <li className="navbar__element">                  
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
  
  export default EmpNavbarMobile;