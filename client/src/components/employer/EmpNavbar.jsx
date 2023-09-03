import React from "react";
import { Link } from 'react-router-dom';


function EmpNavbar() {
    return (
        <div className="navbar">
            <ul className="navbar_menu">
                <li className="navbar__element twoString"><Link to='/profile_rab'>Личный кабинет</Link></li>
                <li className="navbar__element"><Link to='/experts'>Специалисты</Link></li>
                <li className="navbar__element"><Link to='/ads_rab'>Объявления</Link></li>
                <li className="navbar__element twoString "><Link to='/fast_ads_rab'>Срочные заявки</Link></li>
                <li className="navbar__element"><Link to='/mainchat'>Сообщения</Link></li>
                <li className="navbar__element widthEight"><Link to='/forum'>Форум</Link></li>
                <li className="navbar__element fast twoString"><Link to='/info'>Информация<br/>и Новости</Link></li>
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
  
  export default EmpNavbar;