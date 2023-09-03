import React from "react";
import { Link, Navigate } from 'react-router-dom';
import big_pepper from '../img/big_pepper.png';
import white_avtoservice from '../img/white_avtoservice.jpeg';
import white_avtomoika from '../img/white_avtomoika.jpeg';
import black_avtoservice from '../img/black_avtoservice.png';
import black_avtomoika from '../img/black_avtomoika.png';
import pepper_to_case from '../img/pepper_to_case.png';
import tg from '../img/telegram.png';
import whatsapp from '../img/whatsapp.png';
import phone from '../img/phone.png';
import sun_img from '../img/sun.png';
import moon_img from '../img/moon.png';
import whiteback from '../img/white-back.jpeg'
import black_back from '../img/black_back.jpeg'


let sometime = true;
// const soonmoonFunc = () => {

//     const guestBlock = document.querySelector('.Guest');
//     const main_info__1 = document.querySelector('.main_info');

//     if(sometime) {

//       if(window.screen.width > 428) {
//           document.querySelector('.header').style.backgroundImage = `url(${black_back})`
//       } else {
//           document.querySelector('.headerMini').style.backgroundImage = `url(${black_back})`
//       }
//       if(window.screen.width > 1280) {
//           document.querySelector('.remont__img').src = black_avtoservice;
//           document.querySelector('.moika__img').src = black_avtomoika;
//       } else {
//           document.querySelector('.remont__img__mobile').src = black_avtoservice;
//           document.querySelector('.moika__img__mobile').src = black_avtomoika;
//       }
//       document.querySelector('.guest_navbar').style.background = 'black';
//       guestBlock.style.background = 'black';
//       guestBlock.style.color = 'white';
//       main_info__1.style.background = 'black'
//       main_info__1.style.color = 'white';
//       document.querySelector('.footer').style.background = 'black';
//       sometime = false;
//       document.querySelector('.sun-moon').src = sun_img

//     } else {

//       if(window.screen.width > 428) {
//         document.querySelector('.header').style.backgroundImage = `url(${whiteback})`
//       } else {
//         document.querySelector('.headerMini').style.backgroundImage = `url(${whiteback})`
//       }
//       if(window.screen.width > 1280) {
//         document.querySelector('.remont__img').src = white_avtoservice;
//         document.querySelector('.moika__img').src = white_avtomoika;
//       } else {
//         document.querySelector('.remont__img__mobile').src = white_avtoservice;
//         document.querySelector('.moika__img__mobile').src = white_avtomoika;
//       }
//       document.querySelector('.guest_navbar').style.background = 'white';
//       guestBlock.style.background = 'white';
//       guestBlock.style.color = 'black';
//       main_info__1.style.background = 'white';
//       main_info__1.style.color = 'black';
//       document.querySelector('.footer').style.background = 'white';
//       sometime = true;
//       document.querySelector('.sun-moon').src = moon_img
//     }

// }

// let flag = 'light'
// const sun_moon__Func = () => {
//   document.querySelector('.Guest').classList.toggle("theme-dark");
//   document.querySelector('.header').classList.toggle("theme-dark");
//   document.querySelector('.guest_navbar').classList.toggle("theme-dark");
//   document.querySelector('.footer').classList.toggle("theme-dark");
//   if(flag == 'light') {flag = 'dark'} else {flag = 'light'}
//   localStorage.setItem("theme", flag);
// }



// const entrance = () => {
//   window.location = '/entrance'
// }

// const news = () => {
//   window.location = '/news'
// }




export function Guest() {

  const isAuth = Boolean(window.localStorage.getItem('accessToken'))
  
  if(isAuth){
    if(window.localStorage.getItem('role') == 1){
        return <Navigate to='/profile_rab' />
    }
    if(window.localStorage.getItem('role') == 2){
        return <Navigate to='/profile_exp' />
    }
}
    return (

      <div id="Guest" className="Guest">

        {/* <img className='sun-moon' onClick={sun_moon__Func} src={moon_img}/> */}

        <div className="header">
          <img className="big_pepper" src={big_pepper} alt="" />
          <h1 className='company_name'>СОУС</h1>
          <ul>
              <li><span>Поиск вакансий и работы</span></li>
              <li><span>Наём сотрудников и специалистов</span></li>
              <li><span>Открытая доска объявлений</span></li>
              <li><span>Срочные заявки</span></li>
              <li><span>Профессиональный форум</span></li>
          </ul>
        </div>

        <div className="headerMini" style={{display: 'none'}}>
          <img className="big_pepper" src={big_pepper} alt="" />
          <h1 className='company_name'>СОУС</h1>
          <ul>
              <li><span>Поиск вакансий и работы</span></li>
              <li><span>Наём сотрудников и специалистов</span></li>
              <li><span>Открытая доска объявлений</span></li>
              <li><span>Срочные заявки</span></li>
              <li><span>Профессиональный форум</span></li>
          </ul>
        </div>

        <div id='header' className="guest_navbar">
          <div className="guest_navbar__items">
            <Link to='/entrance' className='guest_navbar__item entrance palka'>Вход</Link>
            <Link to='/news' className='guest_navbar__item inform'>Информация и Новости</Link>
            <a href='#footer' className='guest_navbar__item palka rightPalka'>Контакты</a>
          </div>
        </div>

        <div className="main">

          <div className="main__title">Вакансии и Специалисты в сферах: </div>

          <div className="mainImg" style={{display: 'none'}}>
            <img className="img1 remont__img__mobile" src={white_avtoservice}/>
            <img className="moika__img__mobile" src={white_avtomoika}/>
          </div>

          <div className="avtoservice">
            <img src={white_avtoservice} width="300px"/>
            {/* <div className='remont__img' width="300px"></div> */}
            <div className="some_info avtoservice_info">
              <p>Автосервис и техническое обслуживание авто: </p>
              <ul>
                <li className="avtoservice__list_item">автослесарь</li>
                <li className="avtoservice__list_item">автомеханик</li>
                <li className="avtoservice__list_item">автослесарь - универсал</li>
                <li className="avtoservice__list_item">автодиагност</li>
                <li className="avtoservice__list_item">автожестянщик</li>
                <li className="avtoservice__list_item">автомаляр</li>
                <li className="avtoservice__list_item">автоэлектрик</li>
                <li className="avtoservice__list_item">арматурщик</li>
                <li className="avtoservice__list_item">администратор</li>
                <li className="avtoservice__list_item paddingTop2">мастер приемщик</li>
                <li className="avtoservice__list_item paddingTop">инженер по гарантии</li>
                <li className="avtoservice__list_item paddingTop1">сервисный инженер</li>
                <li className="avtoservice__list_item">механик-моторист</li>
                <li className="avtoservice__list_item">механик по ремонту трансмиссии</li>
                <li className="avtoservice__list_item">механик по ремонту ходовой части</li>
                <li className="avtoservice__list_item">мастер кузовного цеха</li>
                <li className="avtoservice__list_item">парковщик</li>
                <li className="avtoservice__list_item">шиномонтажник</li>
              </ul>
            </div>
          </div>
          <div className="avtomoika">
          <img src={white_avtomoika} width="300px"/>
            {/* <div className='moika__img' width="300px"></div> */}
            <div className="some_info avtomoika_info">
              <p>Автомойка и усуги по уходу за автомобилем: </p>
              <ul>
                <li className="list__item">автомойщик</li>
                <li className="list__item">администратор автомойки</li>
                <li className="list__item">полировщик</li>
                <li className="list__item">специалист детейлинга и химчистки</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main_info">
            <div className="myContainer">

              <div className="phoneGrid">
                <div className="float marTopFloat">
                  <div className="text">
                      <img width='50px' src={pepper_to_case}  alt=""/><br/>
                      <p className="case__info">У нас все анкеты и профили специалистов с фотографиями, с указанием гражданства и с именами – это обязательные условия для регистрации работников на нашем сайте. Так же при указании ими своих контактных номеров, опыта и профессиональных качеств, это всё отображается в их анкетах открыто и в свободном доступе, для зарегистрированных Работодателей.</p>
                  </div>
                  <div className="text">
                      <img width='50px' src={pepper_to_case}  alt=""/><br/>
                      <p className="case__info">Вам не нужно платить за доступ к контактам или анкетам соискателей или за пакеты «просмотров анкет». Они все в открытом доступе, с открытыми номерами телефонов (если те их сами указали), с открытыми окнами сообщений и возможностью им бесплатно писать. Эти доступы тоже бесплатны и открыты.</p>
                  </div>
                </div>
                <div className="float float1">
                  <div className="text">
                      <img width='50px' src={pepper_to_case}  alt=""/><br/>
                      <p className="case__info">Возможность раз в сутки поднимать Ваше объявление и обновлять его актуальность. Не нужно платить за увеличение просмотров или поднятия объявлений. Их и так увидят все специалисты на сайте, после поднятия они и так будут в «ТОПе объявлений». Эти функции полностью бесплатны.</p>
                  </div>
                  <div className="text">
                      <img width='50px' src={pepper_to_case}  alt=""/><br/>
                      <p className="case__info">Удобная и быстрая система поиска, без ненужных граф и лишних настроек в фильтрах. Именно потому что у нас профильное сообщество, здесь нет гигантских объёмов информации, среди которой надолго долго перебирать, отсеивать кучу спама и искать нужное.</p>
                  </div>
                </div>
                <div className="float float2">
                  <div className="text ">
                      <img width='50px' src={pepper_to_case}  alt=""/><br/>
                      <p className="case__info">Регистрация без ввода личных данных, номеров телефонов , ИНН, БИК и прочей бюрократии. Только электронная почта, имя и адрес Вашего объекта . Никакого подвоха нет – регистрация тоже абсолютно бесплатна.</p>
                  </div>
                  <div className="text">
                      <img width='50px' src={pepper_to_case}  alt=""/><br/>
                      <p className="case__info">Подача и размещение объявлений – бесплатны.</p>
                  </div>
                </div>
              </div>

            </div>  
        </div>

        <div id='footer' className="footer">
            <div className="container">

              <div className="footbar row">
              <a href="https://web.telegram.org/a/#5429264050" className="tg reserve_number col-4">@mastersous</a>
                    <div className="reserve reserve_number col-4">+7(999)520-20-08</div>
                  <div className="footer__contacts footer__item col-4">
                    <ul className="contacts__logo">
                      <a className="link-logo__wa link-logo"><li><img src={whatsapp} alt="" className="link"/></li></a>
                      <a className="link-logo__nb link-logo"><li><img src={phone} alt="" className="link"/></li></a>
                    </ul>
                  </div>  
              </div> 

              <div className="footbarMobile" style={{display: 'none'}}>

                <p className="number">+7(999)520-20-08</p>
                <div className="footer__contacts footer__item">
                    <ul className="contacts__logo">
                      <a href="https://web.telegram.org/a/#5429264050" className="link-logo__wa link-logo"><li><img src={tg} alt="" className="link"/></li></a>
                      <a href="#" className="link-logo__wa link-logo"><li><img src={whatsapp} alt="" className="link"/></li></a>
                      <a href="#" className="link-logo__nb link-logo"><li><img src={phone} alt="" className="link"/></li></a>
                    </ul>
                </div>  
              </div> 

            </div>
        </div>

      </div>
    );
};
  
export default Guest;