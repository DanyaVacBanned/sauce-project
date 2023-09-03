import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import left_arrow from '../../img/стрелкаНазад.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { fetchAdminLogin, fetchAuth, selectIsAuth } from '../../redux/slices/auth';
const Entrance = () => {




    // let sometime = true;
    // const soonmoonFunc = () => {
    //     if(sometime){
    //         document.querySelector('body').style.background = 'black'
    //         document.querySelector('.Entrance').style.color = 'white'
    //         document.querySelectorAll('.black-white').forEach(e => {e.style.color = 'white'}) 
    //         document.querySelector('.sun-moon').src = sun_img
    //         sometime = false
    //     } else{
    //         document.querySelector('.sun-moon').src = sun_img;
    //         document.querySelector('body').style.background = 'white'
    //         document.querySelector('.Entrance').style.color = 'black' 
    //         document.querySelectorAll('.black-white').forEach(e => {e.style.color = 'black'})
    //         sometime = true  
    //     }
    // }

    const theme = localStorage.getItem('theme')


    window.addEventListener("load", () => {
        if(theme == 'dark'){
            document.querySelector('.Entrance').classList.add("theme-dark")
            document.querySelectorAll('.black-white').forEach(e => {e.classList.add("theme-dark")})
        } else {
            document.querySelector('.Entrance').classList.remove("theme-dark")
            document.querySelectorAll('.black-white').forEach(e => {e.classList.remove("theme-dark")})
        }
    })

    // const profileExp = () => {
    //     window.location = '/profile_exp'
    // }

    // const registration = () => {
    //     window.location = '/registration'
    // }
        const {
            register,
            handleSubmit,
            setError,
            formState: { errors, isValid },
            } = useForm({
                defaultValues: {
                    email: '',
                    password: ''
                }
            })
        const LoginAdmin = async(values) => {
            const user = await dispatch(fetchAdminLogin(values))
            console.log(user)
        }
        const isAuth = Boolean(window.localStorage.getItem('accessToken'))
        const dispatch = useDispatch()
        let role = null
        const onSubmit = async (values) => {
            const data = await dispatch(fetchAuth(values))
            console.log(data)
            if(data.payload.userDto.email == 'admin112'){
                if(data.payload.userDto.password == 'admin_3322_01ADminUwPOo2s8osmnf83'){
                     LoginAdmin(values)
                   return <Navigate to='/info' />
                }
            }
            if('accessToken' in data.payload){
                window.localStorage.setItem('accessToken', data.payload.accessToken)
            }
            if(!data.payload){
                alert('Не удалось авторизоваться')
            }
            if(data.payload.userDto.role === 1){
                window.localStorage.setItem('role', 1)
            }
            if(data.payload.userDto.role === 2){
                window.localStorage.setItem('role', 2)
            }
            
        }   
        if(isAuth){
            if(window.localStorage.getItem('role') == 2){
                return <Navigate to='/profile_rab' />
            }
            if(window.localStorage.getItem('role') == 1){
                return <Navigate to='/profile_exp' />
            }
        }
        console.log('isAuth', isAuth)
  return (
    <>  
    
        <div className='Entrance block'>
            <div className="entrance-blank">

                <Link to='/'>
                    <img className="left-arrow-2" src={left_arrow} alt=""/>
                </Link>

                <h1>Вход</h1>

                <form onSubmit={ handleSubmit(onSubmit) } className="form">
    
                    <input type="text" 
                    placeholder="Почта"
                    label='E-mail'
                    error={Boolean(errors.email?.message)}
                    {...register('email', { required: 'Укажите почту'})}/>

                    <input type="text" 
                    placeholder="Пароль"
                    label='Пароль'
                    error={Boolean(errors.password?.message)}
                    {...register('password', { required: 'Укажите пароль'})}/><br/>

                
                    <button type="submit" className="registration black-white">
                        Войти
                    </button>
                
                </form>




                <span>первый раз на сайте?</span><br/>

                <Link to='/registration'>
                    <button className="to-entrance-button black-white">
                        Зарегистрироваться
                    </button>
                </Link>

            </div>
        </div>

    </>

  );

}

export default Entrance;
