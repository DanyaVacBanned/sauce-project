import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import men_img from '../../img/men1.jpg'
import upArrowSity from '../../img/стрелкаВлевоРотейт.png'
import galka from '../../img/галочка.png'
import upArrow from '../../img/стрелкаВверх.png'
import backArrow from '../../img/стрелкаНазад.png'
import { fetchAuthUpdate, fetchAuthMe, fetchInstallImage } from '../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'



const ExpProfileSetting = () => {

    const [spec, setSpec] = useState([])
    let [specArray, setspecArray] = useState([])
    
    useEffect(() => {
        specArray = spec.length > 0 ? spec.join(' , ') : '';
        setspecArray(specArray)
    }, [spec]);


    const clickFiltersGalka = (e) => {
        e.target.previousElementSibling.childNodes[0].classList.toggle('activeFilter')
        if(e.target.previousElementSibling.childNodes[0].classList.contains('activeFilter')){
          const newSpec = e.target.innerHTML;
          setSpec((prevSpec) => {
            const updatedSpec =  Array.isArray(prevSpec) ? prevSpec.concat(newSpec) : [newSpec];
            return updatedSpec;
          })
    
        } else {
          setSpec(prevSpec => prevSpec.filter(item => item !== e.target.innerHTML));
        }
    }

    let [sity, setSity] = useState([])

    const clickGalka = (el) => {
        setSity(el.target.innerHTML)
    }
    
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


    const watchSpec = () => {
        document.querySelector('.dropdown_specialnost').classList.toggle('show')
        const upArrow = document.querySelector('.upArrow')
        if(upArrow.classList.contains('disabledMenu')){
          upArrow.classList.remove('disabledMenu')
          upArrow.classList.add('activeMenu')
        } else{
          upArrow.classList.add('disabledMenu')
          upArrow.classList.remove('activeMenu')
        }
    }


    const [change, setChange] = useState('')


    const onSubmit = async (values) => {
        console.log(values)
        const user = await dispatch(fetchAuthUpdate(values))
        console.log(user)
    }

    const isAuth = Boolean(window.localStorage.getItem('accessToken'))
    const dispatch = useDispatch()
    let [data, setData] = useState([])

    React.useEffect(() => {
        const asyncFn = async () => {
            let data = await dispatch(fetchAuthMe())
            data = data.payload
            setData(data)
        }
        asyncFn()
    }, [])

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
        } = useForm({
            defaultValues: {
              
            }
          })


          
    let [url, setUrl] = useState('') 

    let menImg = ""
    const changeAvatar =  async (e) => {
        const values = e.target.files[0].name
        await dispatch(fetchInstallImage(values))
    }
            

  return (
    <div className='ExpProfile'>
        
        <form>
        <Link to='/profile_exp'><img src={backArrow} className='backArrow'/></Link>
        <button type='submit' onClick={handleSubmit(onSubmit)} className='button save'>Cохранить</button>
        <h1 className='profile_h1'>Личный кабинет</h1>
        
        <div className="container">
            <div className="row">
                <div className="col-xl-4 col-sm-5 col-12 img">
                    <img src={url ? url : men_img} 
                    alt=""/>
                    <input type='file' 
                         onChange={e =>  changeAvatar(e)}
                         accept='image/*'
                         className='ImageInput'/>
                    </div>
                    <div className="col-xl-8 col-sm-7 col-12 main-info">
                    <div className="item-border name">
                        <div className="name item col-12">Имя:&#8195;<input type="text" className="input_back input-name col-10" 
                        placeholder='ваше имя'  
                        label='fullName'
                        {...register('fullName')}
                        /></div>
                    </div>
                    <div className="item-border mail_item">
                        <div className="mail item col-xl-12 col-lg-9 col-sm-8 col-9">Почта:&#8195;<input type="text" className="input_back input-mail col-xl-10 col-lg-8 col-sm-10 col-11" 
                        placeholder='ваша почта'
                        label='email'
                        {...register('email')}
                        /></div>
                    </div>
                    <div className="item-border password_item">
                        <div className="password item col-xl-12 col-lg-9 col-sm-8 col-8">Пароль:&#8195;<input type="text" className="input_back input-password col-xl-9 col-sm-8 col-11" 
                        placeholder='ваш пароль'
                        label='password'
                        {...register('password')}
                        /></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* <div className="item-border nameMobile mar-top" style={{display: 'none'}}>
                        <div className="name item col-sm-12 col-9">Имя:&#8195;<input type="text" class="input_back input-name  col-sm-10  col-11" 
                        placeholder='ваше имя'  
                        defaultValue={data.fullName}
                        label='fullName'
                        {...register('fullName')}
                        /></div>
                    </div> */}
                    <div class="item-border">
                        <div class="sity1 item col-sm-12 col-9">Город:&#8195;
                        <input type="text" 
                        class="input_back input-sity col-sm-9 col-11" 
                        placeholder='город' 
                        readOnly='true'
                        label='city'
                        value={sity}
                        {...register('city')}/>
                        <img src={upArrowSity} className='upArrowSity disabledMenu' onClick={watchSitySpec} />
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
                    <div class="item-border mar-top">
                        <div class="citizenship item col-sm-12 col-9">Гражданство:&#8195;<input type="text" class="input_back input-citizenship  col-lg-9 col-sm-8 col-11" 
                        placeholder='ваше гражданство'
                        label='cityzship'
                        {...register('cityzship')}
                        /></div>
                    </div>
                    <div className="item-border">
                        <div className="phone item col-sm-12 col-9">Телефон:&#8195;<input type="text" class="input_back input-phone col-sm-9 col-11" 
                        placeholder='телефон (необязательно)'
                        label='phone'
                        {...register('phone')}
                        /></div>
                    </div>
                    <div class="item-border">
                        <div class="work item col-sm-12 col-9">Специальность:&#8195;
                        <input type="text" 
                        class="input_back input-work col-lg-9 col-sm-7 col-11" 
                        placeholder='профессия' 
                        readOnly='true' 
                        style={{paddingRight: '60px'}}
                        value={specArray}
                        label='specional'
                        {...register('specional')}/></div>
                        <img src={upArrow} className='upArrow disabledMenu' onClick={watchSpec} />
                        <ul className='dropdown_specialnost' style={{display: 'none'}}>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>автослесарь</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>автомеханик</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>атвожестянщик</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>автомаляр</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>автоэлектрик</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>арматурщик</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>администратор</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>мастер приемщик</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>инженер по гарантии</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>сервисный инженер</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>механик-моторист</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>механик по ремонту трансмиссии</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>механик по ремонту ходовой части</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>мастер кузовного цеха</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>парковщик</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>шиномонтажник</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>автомойщик </li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>администратор автомойки</li>
                            </div>
                            <div className="item">
                            <div className="link__icon">
                                <img className='filetrsGalka' src={galka} alt=""/>
                            </div>&#8195;
                            <li className="link__todo" onClick={clickFiltersGalka}>специалист детейлинга и химчистки</li>
                            </div>
                            
                        </ul>
                    </div>
                    <div class="item-border">
                        <div class="experience item col-sm-12 col-9">Стаж:&#8195;<input type="text" class="input_back input-experience col-sm-9 col-11" 
                        placeholder='стаж работы (если есть)'
                        label='exp'
                        {...register('exp')}
                        /></div>
                    </div>
                    <div className="item-border no">
                        <textarea type="text" 
                        class="input_back input-field col-xl-12 col-lg-9 col-12"
                        value={data.info ? data.info : ''}
                        placeholder='Здесь вы можете дополнительно и более подробно рассказать о своих навыках, умениях и опыте работы.
                        Это поможет Работодателю узнать больше информации о ваших профессиональных качествах и увеличивает шансы сделать выбор в вашу пользу.' />
                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>
  );
}

export default ExpProfileSetting;
