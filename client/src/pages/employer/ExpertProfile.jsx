import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import men_img from '../../img/men1.jpg'
import flag from '../../img/flag.png'
import flag_active from '../../img/flag_active.png'
import left_arrow from '../../img/стрелкаНазадБелая.png'
import left_arrow_orange from '../../img/стрелкаНазад.png'
import eye from '../../img/eye.png'
import stop from '../../img/stop.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchAppCreate, fetchSpecApps, fetchGetOneUser } from '../../redux/slices/auth'
const SpecProfile = () => {

    const dispatch = useDispatch()

    let flagcounter = false
    let stopcounter = false


    const [data, setData] = useState({})

    React.useEffect(() => {
        const asyncFn = async () => {
            const id = localStorage.getItem('userID')
            let data = await dispatch(fetchGetOneUser(id))
            data = data.payload.user
            setData(data)
        }
        asyncFn()
    })
    const ClickFlag = (e) => {
        e.currentTarget.childNodes[1].classList.toggle('spanActive')
        if(!flagcounter){
            e.currentTarget.childNodes[0].src = flag_active
            if(window.screen.width <= 428){
                e.currentTarget.childNodes[1].innerHTML = 'Убрать из закладок'
            } else {
                e.currentTarget.childNodes[1].innerHTML = 'Убрать из <br/> закладок'
            }
            flagcounter = true
        } else {
            e.currentTarget.childNodes[0].src = flag
            e.currentTarget.childNodes[1].innerHTML = 'В закладки'
            flagcounter = false
        }
    }
    const ClickStop = (e) => {
        e.currentTarget.childNodes[1].classList.toggle('spanActive1')
        if(!stopcounter){
            e.currentTarget.childNodes[0].src = eye
            if(window.screen.width <= 428){
                e.currentTarget.childNodes[1].innerHTML = 'НЕ игнорировать'
            } else {
                e.currentTarget.childNodes[1].innerHTML = 'НЕ <br/> игнорировать'
            }
            stopcounter = true
            console.log(e.currentTarget.childNodes[0])
            console.log(stopcounter)
        } else {
            e.currentTarget.childNodes[0].src = stop
            e.currentTarget.childNodes[1].innerHTML = 'Игнорировать'
            stopcounter = false
        }
    }

    let sometime = true;
    const soonmoonFunc = () => {

        if(sometime){
            if(window.screen.width > 834){
                document.querySelectorAll('.item').forEach(e => {e.style.color = 'white'})
                document.querySelectorAll('.input_back').forEach((e) => {e.style.color = 'white'})
            } else {
                document.querySelectorAll('.mobileOrnageItem').forEach(e => {e.style.color = 'white'})
            }
            document.querySelectorAll('.itemOrange').forEach(e => {e.style.color = 'black'})
            document.querySelector('body').style.background = 'black'
            document.querySelector('.navbar_menu').style.background = 'black'
            document.querySelector('.sun-moon').src = sun_img;
            sometime = false
        } else{
            document.querySelectorAll('.item').forEach(e => {e.style.color = 'black'})
            document.querySelectorAll('.input_back').forEach((e) => {e.style.color = 'black'})
            document.querySelector('body').style.background = 'white'
            document.querySelector('.navbar_menu').style.background = 'white'
            document.querySelector('.sun-moon').src = moon_img;
            sometime = true
        }
    }

  return (
    <div className='ExpertProfile'>

     <Link to='/ads_rab'><img src={left_arrow} className='backArrow'/></Link>
     <Link to='/ads_rab'><img src={left_arrow_orange} className='backArrowOrange' style={{display: 'none'}}/></Link>

        <div className='ExpertProfileWeb'>
            <div className="container">
                <div class="row">
                    <div class="col-xl-5 col-5 img">
                        <img src={men_img} alt=""/>
                        <div class="item-border">
                                <div class="secondname item itemOrange col-12 phone_item">Имя:&#8195;
                                <input type="text" className="input_back itemOrange input-secondname col-12" value={data.fullName} readonly='true'/></div>
                        </div>
                        <div class="item-border">
                                <div class="secondname item itemOrange col-12 phone_item">Город:&#8195;
                                <input type="text" className="input_back itemOrange input-secondname col-12" value={data.city} readonly='true'/></div>
                        </div>
                        <div class="item-border">
                                <div class="secondname item itemOrange col-12 phone_item">Гражданство:&#8195;
                                <input type="text" className="input_back itemOrange input-secondname col-12" value={data.cityzship} readonly='true'/></div>
                        </div>
                        <div class="item-border">
                            <button>написать сообщение</button>
                        </div>
                        <div class="item-border">
                            <input type='text' className='col-12 input-phone' value={data.phone ? data.phone : 'телефон не указан'}/>
                        </div>
                        <div class="item-border bookmarks" onClick={ClickFlag}>
                            <img src={flag}/>
                            <span>В закладки</span>
                        </div>
                        <div class="item-border ignor" onClick={ClickStop}>
                            <img src={stop}/>
                            <span>Игнорировать</span>
                        </div>
                    </div>
                    <div className="col-xl-7 col-7 main-info">
                    <h1 className='profile_h1'>Личный кабинет</h1>
                            <div className="item-border nameSname row">
                                <div className="item col-5">
                                    <span>Специальность:</span>
                                </div>
                                <textarea type="text" className="input_back input-name col-7" readonly='true' value={data.specional}/>
                            </div>
                            <div className="item-border row">
                                <div class="item col-5">
                                    <span>Cтаж:</span>
                                </div>
                                <textarea type="text" className="input_back input-sity col-7" readonly='true' value={data.experience ? data.experience : 'без стажа'}/>
                            </div>
                            <div className="item-border row">
                                <div className="item col-5">
                                    <span>О себе:</span>
                                </div>
                                <textarea type="text" className="input_back input-info col-7" readonly='true' defaultValue='Владею наывками слесарных работ, умею оклеивать пленкой. Интересует график 2/2 день'/>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='ExpertProfileTablet' style={{display: 'none'}}>
            <div className="container">
                <h1 className='profile_h1'>Личный кабинет</h1>
                <div className='orangeBack'>
                    <div class="row firstLine">
                        <div className='col-6'><img src={men_img} alt=""/></div>
                        <div class="item-border borderName col-6">
                            <div class="secondname item col-12 margLeftNAme">Имя:&#8195;
                            <input type="text" className="input_back input-secondname col-12" defaultValue='Арсений' readonly='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="item-border col-6">
                            <div class="item col-12 textarea_class">Город:&#8195;
                                <input type="text" className="input_back input-secondname col-12" defaultValue='Москва' readonly='true'/>
                            </div>
                        </div>
                        <div class="item-border col-6">
                            <div class="secondname item col-12">Гражданство:&#8195;
                                <input type="text" className="input_back input-secondname col-12" defaultValue='Казахстан' readonly='true'/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="item-border col-6">
                            <input type='text' className='col-12 input-phone textarea_class' defaultValue='+7 (999) 520-20-08'/>
                        </div>
                        <div class="item-border col-6 bookmarks" onClick={ClickFlag}>
                            <img src={flag}/>
                            <span>В закладки</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="item-border col-6 textarea_class">
                            <button>написать сообщение</button>
                        </div>
                        <div class="item-border col-6 ignor" onClick={ClickStop}>
                            <img src={stop}/>
                            <span>Игнорировать</span>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="item-border col-6">
                        <div class="item col-12 mobileOrnageItem textarea_class">Специальность:&#8195;
                            <input type="text" className="input_back mobileOrnageItem input-secondname col-12" defaultValue='Россия' readonly='true'/>
                        </div>
                    </div>
                    <div className="item-border col-6">
                        <div class="secondname mobileOrnageItem item col-12" style={{marginLeft: '50px'}}>Стаж:&#8195;
                            <input type="text" className="input_back mobileOrnageItem input-secondname col-12" defaultValue='Россия' readonly='true'/>
                        </div>
                    </div>
                </div>
                <div className="item-border row">
                    <div class="textarea_class mobileOrnageItem item col-12">О себе:&#8195;
                        <textarea type="text" className="input_back mobileOrnageItem input-info col-12" readonly='true' defaultValue='Владею наывками слесарных работ, умею оклеивать пленкой. Интересует график 2/2 день'/>
                    </div>
                </div>
            </div>
        </div>

        <div className='ExpertProfileMobile' style={{display: 'none'}}>
            <div className='container'>
                <h1 className='profile_h1'>Личный кабинет</h1>
                <div class="orangeBack">
                    <div className='col-12'>
                        <img src={men_img} alt=""/>
                    </div>
                    <div class="item-border col-12">
                        <div class="item col-12 textarea_class">Имя:&#8195;
                            <input type="text" className="input_back input-secondname col-9" defaultValue='Арсений' readonly='true'/>
                        </div>
                    </div>
                    <div class="item-border col-12">
                        <div class="item col-12 textarea_class">Город:&#8195;
                            <input type="text" className="input_back input-secondname col-8" defaultValue='Москва' readonly='true'/>
                        </div>
                    </div>
                    <div class="item-border col-12">
                        <div class="secondname item col-12">Гражданство:&#8195;
                            <input type="text" className="input_back input-secondname col-6" defaultValue='Россия' readonly='true'/>
                        </div>
                    </div>
                    <div class="item-border col-12">
                        <input type='text' className='col-12 input-phone textarea_class' defaultValue='+7 (999) 520-20-08'/>
                    </div>
                    <div class="item-border col-12 textarea_class">
                        <button>написать сообщение</button>
                    </div>
                    <div class="item-border col-12 bookmarks" onClick={ClickFlag}>
                        <img src={flag}/>
                        <span>В закладки</span>
                    </div>
                    <div class="item-border col-12 ignor" onClick={ClickStop}>
                        <img src={stop}/>
                        <span>Игнорировать</span>
                    </div>
                </div>
                    <div className="item-border col-12">
                        <div class="item col-12 mobileOrnageItem textarea_class">Специальность:&#8195;
                            <input type="text" className="input_back mobileOrnageItem input-secondname col-12" defaultValue='Автослесарь' readonly='true'/>
                        </div>
                    </div>
                    <div className="item-border col-12">
                        <div class="secondname mobileOrnageItem item col-12">Стаж:&#8195;
                            <input type="text" className="input_back mobileOrnageItem input-secondname col-12" defaultValue='Россия' readonly='true'/>
                        </div>
                    </div>
                    <div className="item-border row">
                        <div class="textarea_class mobileOrnageItem item col-12">О себе:&#8195;
                            <textarea type="text" className="input_back mobileOrnageItem input-info col-12" readonly='true' defaultValue='Владею наывками слесарных работ, умею оклеивать пленкой. Интересует график 2/2 день'/>
                        </div>
                    </div>
            </div>
        </div>



    </div>
  );
}

export default SpecProfile;
