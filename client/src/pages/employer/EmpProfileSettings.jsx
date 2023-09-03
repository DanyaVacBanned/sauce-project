import men_img from '../../img/men1.jpg'
import upArrowSity from '../../img/стрелкаВлевоРотейт.png'
import { Link } from 'react-router-dom';
import { fetchAuthUpdate, fetchAuthMe, fetchInstallImage } from '../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form'


const EmpProfileSettings = () => {
    

    const isAuth = Boolean(window.localStorage.getItem('accessToken'))
    const dispatch = useDispatch()
    let [data, setData] = useState([])
    
    React.useEffect(() => {
        const asyncFn = async () => {
            let data = await dispatch(fetchAuthMe())
            data = data.payload
            setData(data)
            console.log(data)
        }
        asyncFn()
    }, [])

    const [change, setChange] = useState('')

    const saveUpdates = () =>{
        document.querySelectorAll('.input_back').forEach(e => {
            const someStr = e.parentElement.innerHTML
            // me.payload.
        })
    }

    const onSubmit = (values) =>{
        const asyncFn = async () => {
            const user = await dispatch(fetchAuthUpdate(values))
        }
        asyncFn()
    }

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
        } = useForm({
            defaultValues: {
              'fullName': data.fullName
            }
          })
      
    // const updates = useMemo(() => {


    // })


    const watchSitySpec = () => {
        document.querySelector('.dropdown_sity__spec').classList.toggle('show')
        const upArrow = document.querySelector('.upArrowSity')
        if(upArrow.classList.contains('disabledMenu')){
          upArrow.classList.remove('disabledMenu')
          upArrow.classList.add('activeMenu')
        } else{
          upArrow.classList.add('disabledMenu')
          upArrow.classList.remove('activeMenu')
        }
    }

    const clickGalka = (el) => {
        document.querySelector('.input-sity').value = el.target.innerHTML
    }


    let [url, setUrl] = useState('') 

    let menImg = ""
    const changeAvatar =  async (e) => {
        const values = e.target.files[0].name
        url = await dispatch(fetchInstallImage(values))
        console.log(url)
        setUrl(url)
    }


    return (
        <div className='EmpProfile'>

            <h1 className='profile_h1'>Личный кабинет</h1>
            
            <form onSubmit={ handleSubmit(onSubmit) }  className="container">
                <Link to='/profile_rab'><button className='button save' onClick={saveUpdates} >Cохранить</button></Link>
                <div className="row">
                    <div className="col-xl-4 col-lg-5 col-sm-5 col-12 img">
                        <img  src = {
                            url
                            ? url
                            : men_img
                        }
                        alt=""/>
                        <input type='file'
                        name='file'
                        onChange={changeAvatar}
                        className='ImageInput'/>
                    </div>
                    <div className="col-xl-8 col-lg-7 col-sm-7 col-12 main-info">
                        <div className="item-border name">
                            <div className="name item col-12">Имя:&#8195;
                            <input type="text" 
                            className="input_back input-name col-10" 
                            placeholder='ваше имя'
                            label='fullName'
                            {...register('fullName')}/></div>
                        </div>
                        <div className="item-border mail_item">
                            <div className="mail item col-xl-12 col-lg-9 col-sm-8 col-9">Почта:&#8195;
                            <input type="text" 
                            className="input_back input-mail col-xl-10 col-sm-10 col-11" 
                            placeholder='ваша почта'
                            label='email'
                            {...register('email')}/></div>
                        </div>
                        <div className="item-border password_item">
                            <div className="password item col-xl-12 col-lg-9 col-sm-8 col-9">Пароль:&#8195;
                            <input type="text" 
                            className="input_back input-password col-xl-9 col-sm-8 col-11" 
                            placeholder='ваш пароль'
                            label='password'
                            {...register('password')}/></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="item-border nameMobile mar-top" style={{display: 'none'}}>
                            <div className="name item col-sm-12 col-9">Имя:&#8195;
                            <input type="text" 
                            className="input_back input-name  col-sm-9 col-11" 
                            placeholder='ваше имя' 
                            label='fullName'
                            {...register('fullName')}/></div>
                        </div>
                        <div class="item-border">
                        <div class="sity1 item col-sm-12 col-9">Город:&#8195;
                        <input type="text" 
                        class="input_back input-sity col-sm-9 col-11" 
                        placeholder='город' 
                        readOnly
                        label='city'
                            {...register('city')}/>
                        <img src={upArrowSity} className='upArrowSity disabledMenu' onClick={watchSitySpec}/>
                        </div>
                        <ul className='dropdown_sity__spec' style={{display: 'none'}}>
                            <div className="item-country">
                                <span className='oneString' onClick={clickGalka}>Краснодар</span>
                            </div>
                            <div className="item-country">
                                <span onClick={clickGalka}>Нижний новгород</span>
                            </div>
                            <div className="item-country">
                                <span className='oneString' onClick={clickGalka}>Москва</span>
                            </div> 
                            <div className="item-country">
                                <span className='oneString' onClick={clickGalka}>Казань</span>
                            </div>
                            <div className="item-country">
                                <span onClick={clickGalka}>Санкт-петербург</span>
                            </div>           
                        </ul>
                    </div>
                        <div className="item-border">
                            <div className="phone item col-sm-12 col-9">Телефон:&#8195;
                            <input type="text" 
                            className="input_back input-phone col-sm-9 col-11" 
                            placeholder='телефон (необязательно)'
                            label='phone'
                            {...register('phone')}
                            
                            />
                            </div>
                        </div>
                        <div className="item-border">
                            <div className="field item col-sm-12 col-9">Адрес основного объекта:&#8195;
                            <input type="text" 
                            className="input_back input-field col-sm-6 col-11" 
                            placeholder='ул. ... , дом 00'
                            label='addressObject'
                            {...register('addressObject')}/></div>

                        </div>
                        <div className="item-border">
                            <div className="field item col-sm-12 col-9">Все объекты:&#8195;
                            <input type="text" 
                            className="input_back input-field col-xl-8 col-sm-9 col-11" 
                            placeholder='прочие объекты компании'
                            label='allObject'
                            {...register('allObject')}/></div>

                        </div>
                        <div className="item-border no">
                            <input type="text" 
                            class="input_back input-field col-12" 
                            placeholder='Здесь вы можете рассказать дополнительную информацию про условия сотрудничества, условия труда на рабочем месте, график работы и другое.
                             Это поможет Соискателю повысить заинтересованность к вашей вакансии и лояльность к вашец Организации'
                             label='info'
                             {...register('info')}/>
                        </div>
                    </div>
                </div>
            </form>

        </div>
  );
}

export default EmpProfileSettings;
