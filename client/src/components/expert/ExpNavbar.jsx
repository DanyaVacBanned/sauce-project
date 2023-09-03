import React from "react";
import { Link } from 'react-router-dom';


function ExpNavbar() {
    return (
      <>
        <div className="navbar">
            <ul className="navbar_menu exp">
                <li className="navbar__element"><Link to='/profile_exp'>Личный кабинет</Link></li>
                <li className="navbar__element"><Link to='/ads_exp'>Вакансии</Link></li>
                <li className="navbar__element fast twoString"><Link to='/fast_ads_exp'>Срочные заявки.<br/>Подработка</Link></li>
                <li className="navbar__element"><Link to='/forum'>Форум</Link></li>
                <li className="navbar__element"><Link to='/mainchat'>Сообщения</Link></li>
                <li className="navbar__element fast twoString"><Link to='/info'>Информация<br/>и Новости</Link></li>
                <li className="navbar__element out">                  
                <Link to='/' 
                      // onClick={window.localStorage.removeItem('accessToken')}
                      >
                      Выход
                </Link>
                </li>
            </ul>
        </div>
      </>
    );
  }
  
  export default ExpNavbar;