import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import left_arrow from '../../img/стрелкаНазад.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';
import galka from '../../img/галочка.png'
import upArrow from '../../img/стрелкаВверх.png'
import upArrowSity from '../../img/стрелкаВверхРотейт.png'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthReg } from '../../redux/slices/auth'

const Registration = () => {

  // const soonmoonFunc = () => {
  //     if(sometime){
  //         document.querySelector('.sun-moon').src = moon_img;
  //         document.querySelector('body').style.background = 'black'
  //         document.querySelector('.Entrance').style.color = 'white'
  //         document.querySelectorAll('.Who').forEach((e) => {e.style.color = 'white'})
  //         document.querySelectorAll('.item-country').forEach((e) => {e.style.color = 'black'})
  //         document.querySelectorAll('.link__todo').forEach((e) => {e.style.color = 'black'})
  //         document.querySelectorAll('.black-white').forEach(e => {e.style.color = 'white'}) 
  //         document.querySelector('.entrance-button').style.color = 'white'
  //         document.querySelector('.sun-moon').src = sun_img
  //         sometime = false
  //     } else{
  //         document.querySelector('.sun-moon').src = sun_img;
  //         document.querySelector('body').style.background = 'white'
  //         document.querySelector('.Entrance').style.color = 'black' 
  //         document.querySelectorAll('.Who').forEach((e) => {e.style.color = 'black'})
  //         document.querySelectorAll('.black-white').forEach(e => {e.style.color = 'black'})
  //         document.querySelector('.entrance-button').style.color = 'black'
  //         document.querySelector('.sun-moon').src = moon_img
  //         sometime = true  
  //     }
  // }

  const theme = localStorage.getItem('theme')
  window.addEventListener("load", () => {
      if(theme == 'dark'){
          document.querySelector('.Entrance').classList.add("theme-dark")
          document.querySelector('body').classList.add("theme-dark")
          document.querySelectorAll('.Who').forEach((e) => {e.classList.add("theme-dark")})
          document.querySelectorAll('.item-country').forEach((e) => {e.classList.add("theme-dark")})
          document.querySelectorAll('.link__todo').forEach((e) => {e.classList.add("theme-dark")})
          document.querySelectorAll('.black-white').forEach(e => {e.classList.add("theme-dark")}) 
          document.querySelector('.entrance-button').classList.add("theme-dark")
      } else {
          document.querySelector('.Entrance').classList.remove("theme-dark")
          document.querySelector('body').classList.remove("theme-dark")
          document.querySelectorAll('.Who').forEach((e) => {e.classList.remove("theme-dark")})
          document.querySelectorAll('.item-country').forEach((e) => {e.classList.remove("theme-dark")})
          document.querySelectorAll('.link__todo').forEach((e) => {e.classList.remove("theme-dark")})
          document.querySelectorAll('.black-white').forEach(e => {e.classList.remove("theme-dark")}) 
          document.querySelector('.entrance-button').classList.remove("theme-dark")
      }
  })

  const rabClick = (e) => {
    document.querySelector('.rabform').style.display = 'block'
    document.querySelector('.specform').style.display = 'none'
    document.querySelectorAll('input').forEach((e) => { e.value = '' })
    document.querySelectorAll('.Who').forEach( e => {e.classList.remove('activeReg')})
    e.target.classList.add('activeReg')
    
    window.localStorage.setItem('role', '2')
  } 

  const specClick = (e) => {
    document.querySelector('.rabform').style.display = 'none'
    document.querySelector('.specform').style.display = 'block'
    document.querySelectorAll('input').forEach((e) => { e.value = '' })
    document.querySelectorAll('.Who').forEach( e => {e.classList.remove('activeReg')})
    e.target.classList.add('activeReg')
    
    window.localStorage.setItem('role', '1')
  } 

  const watchSity = () => {
    document.querySelector('.dropdown_sity').classList.toggle('show')
    const upArrow = document.querySelector('.upArrowSity_rab')
    if(upArrow.classList.contains('disabledMenu')){
      upArrow.classList.remove('disabledMenu')
      upArrow.classList.add('activeMenu')
    } else{
      upArrow.classList.add('disabledMenu')
      upArrow.classList.remove('activeMenu')
    }
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
      document.querySelector('.upArrowSity').style.zIndex = '2';
    } else{
      upArrow.classList.add('disabledMenu')
      upArrow.classList.remove('activeMenu')
      document.querySelector('.upArrowSity').style.zIndex = '20';
    }
  }

  const [spec, setSpec] = useState([])

  useEffect(() => {
    const specArray = spec.length > 0 ? spec.join(', ') : '';
    document.querySelector('.specArray').value = specArray;
  }, [spec]);

  const clickFiltersGalka = (e) => {
    e.target.previousElementSibling.childNodes[0].classList.toggle('activeFilter')
    if(e.target.previousElementSibling.childNodes[0].classList.contains('activeFilter')){
      const newSpec = e.target.innerHTML;
      setSpec((prevSpec) => {
        const updatedSpec =  Array.isArray(prevSpec) ? prevSpec.concat(newSpec) : [newSpec];
        document.querySelector('.specArray').value = updatedSpec.join(',  ');
        return updatedSpec;
      })

    } else {
      setSpec(prevSpec => prevSpec.filter(item => item !== e.target.innerHTML));
    }
  }

  const clickGalka = (el) => {
    document.querySelector('.changeSity_spec').value = el.target.innerHTML
    document.querySelector('.changeSity').value = el.target.innerHTML
  }

  let counter = 0
  const regFuncSpec = () => {
    document.querySelectorAll('.specform__input').forEach(e => {
      if(e.value !== ''){
        counter++
      }
    })
    if(counter == 6){
        window.location = '/profile_exp'
        counter = 0
    } else {
      alert("Пожалуйста, заполните все необходимые поля")
    }
  }

  const regFuncRab = () => {
    document.querySelectorAll('.rabform__input').forEach(e => {
      if(e.value !== ''){
        counter++
      }
    })
    if(counter == 5){
        window.location = '/profile_exp'
        counter = 0
    } else {
      alert("Пожалуйста, заполните все необходимые поля")
    }
  } 
  
  
  
  let role = 1


    if(window.localStorage.getItem('role') == 1){
      role = '1'
      
    }
    if(window.localStorage.getItem('role') == 2){
      role =  '2'
      
    }
  


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    } = useForm({
        defaultValues: {
          'role': role
        }
      })
  
    
    const dispatch = useDispatch()
    
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuthReg(values))

        if(data.payload.accessToken){
            window.localStorage.setItem('accessToken', data.payload.accessToken)

        }
        if(!data.payload.accessToken){
          alert('Не удалось зарегистрироваться')
        }
        
     
        console.log(data)
    }   


    const isAuth = Boolean(window.localStorage.getItem('accessToken'))
    if(isAuth){
          if(window.localStorage.getItem('role') == 2){
              return <Navigate to='/profile_rab' />
          }
          if(window.localStorage.getItem('role') == 1){
              return <Navigate to='/profile_exp' />
          }
    }

    
  return (
    <>


      <div className='Entrance'>
        <div className="register-blank">
        <Link to='/entrance'><img 
        className="left-arrow-1" 
        
        src={left_arrow} 
        alt=""/></Link>
            <h1>Регистрация</h1>

            <div className='row'>

            <button className="Who" 
            onClick={rabClick}>
            Работодатель
            </button>

            <button className="Who Who1 activeReg" 
            onClick={specClick}>
            Специалист
            </button>

            </div>
            <form onSubmit={ handleSubmit(onSubmit) } className="form specform" >


                <input type="text" 
                placeholder="Имя" 
                className='specform__input'
                label='fullName'
                {...register('fullName')}/>

                <input type="text" 
                placeholder="выберите город" 
                className='changeSity_spec specform__input' 
                readOnly                    
                label='city'
                {...register('city')}/>

                  <img src={upArrowSity} 
                  className='upArrowSity disabledMenu' 
                  onClick={watchSitySpec}/>

                  <ul className='dropdown_sity__spec' style={{display: 'none'}}>
                    <div className="item-country">
                      <span onClick={clickGalka}>Краснодар</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Нижний новгород</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Москва</span>
                    </div> 
                    <div className="item-country">
                      <span onClick={clickGalka}>Казань</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Санкт-петербург</span>
                    </div>           
                  </ul>

                <input type="text" 
                placeholder="Гражданство" 
                className='specform__input'                    
                label='cityzship'
                {...register('cityzship')}/>

                <input type="text" 
                placeholder="Выберите специальность(и)" 
                className='specArray specform__input' 
                readOnly                    
                label='specional'
                {...register('specional')}/>

                <img src={upArrow} 
                className='upArrow disabledMenu' 
                onClick={watchSpec}/>
                
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
                      <li className="link__todo" onClick={clickFiltersGalka}>парковщик</li>
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
                  
                <input type="text" 
                placeholder="Почта" 
                className='specform__input'                    
                label='E-mail'
                {...register('email')}/>
                
                <input type="text" 
                placeholder="Пароль" 
                className='specform__input'                    
                label='password'
                {...register('password')}/>
                
                <button 
                type='submit'
                className="entrance-button" 
                >
                Зарегистрироваться
                </button>

            </form>
            <form class="form rabform" style={{display: 'none'}} onSubmit={handleSubmit(onSubmit)}>

 

                  <input type="text" 
                  placeholder="Имя" 
                  className='rabform__input'                    
                  label='fullName'
                  {...register('fullName')}/>

                  <input type="text" 
                  placeholder="выберите город" 
                  className='cursorPointer changeSity rabform__input' 
                  readOnly                    
                  label='city'
                  
                  {...register('city')}/>

                  <img src={upArrowSity} 

                  className='upArrowSity_rab disabledMenu' 
                  onClick={watchSity} 
                  readOnly/>

                  <ul className='dropdown_sity' style={{display: 'none'}}>
                    <div className="item-country">
                      <span onClick={clickGalka}>Краснодар</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Нижний новгород</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Москва</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Казань</span>
                    </div>
                    <div className="item-country">
                      <span onClick={clickGalka}>Санкт-петербург</span>
                    </div>           
                  </ul>

                  <input type="text" 
                  placeholder="Адрес основного объекта" 
                  className='rabform__input'                    
                  label='addressObject'
                  
                  {...register('addressObject')}/>

                  <input type="text" 
                  placeholder="Почта" 
                  className='rabform__input'                    
                  label='E-mail'
                  
                  {...register('email')}/>

                  <input type="text" 
                  placeholder="Пароль" 
                  className='rabform__input'                    
                  label='password'
                  
                  {...register('password')}/>

                  <button 
                  type="submit"
                  className="entrance-button" 
                  >
                  Зарегистрироваться
                  </button>

              </form>
        </div>

      </div>

    </>
  );
  
}

export default Registration;