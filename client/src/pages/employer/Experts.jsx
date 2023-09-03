import React, { useState, useMemo, useEffect } from 'react';
import filter_icon from '../../img/filters.png'
import galka from '../../img/галочка.png'
import Rabotniki from '../../components/employer/Rabotniki';
import EmpNavbar from '../../components/employer/EmpNavbar';
import EmpNavbarMobile from '../../components/employer/EmpNavbarMobile';
import Bookmarks from '../../components/employer/Bookmakrs'
import geo from '../../img/geo.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';

import { fetchSpec, fetchGetOneUser, fetchAddUserZ, fetchRemUserZ, fetchGetAllUserZ, fetchSpecFilterCity, fetchSpecFilterSpecional } from '../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux';

const Experts = () => {

    const dispatch = useDispatch()

    const onClickFilters = (e) => {
        e.currentTarget.children[2].classList.toggle('show');
    }
    const FilterCity = async(values) => {
      //values это то по чему нужно отсортировать по городу например Краснодар
      const filterUser = await dispatch(fetchSpecFilterCity(values))
    } 
    const FilterSpecional = async(values) => {
      const filterUser = await dispatch(fetchSpecFilterSpecional(values))
    }
    
    const [bid, setBid] = useState([
        {id: 1, spec: 'автомойщик', address: 'ул.Воинская д.3', cost: '40-60т.р', phone: '8(999)-999-9999'},
        {id: 2, spec: 'инженер', address: 'ул.Воинская д.3', cost: '40-60т.р', phone: '8(999)-999-9999'},
        {id: 3, spec: 'администратор', address: 'ул.Воинская д.3', cost: '40-60т.р', phone: '8(999)-999-9999'},
    ])
 
    const [isActive, setIsActive] = useState(false);

    const [showBookmarks, setShowBookmarks] = useState(false);

    const bookmarksClick = (e) => {
      setShowBookmarks(!showBookmarks);
        if(showBookmarks == true){
          e.currentTarget.childNodes[0].innerHTML = 'Специалисты'
          document.querySelector('.bookmarks').style.display = 'none'
          document.querySelector('.experts').style.display = 'block'
        } else {
          e.currentTarget.childNodes[0].innerHTML = 'Закладки'
          document.querySelector('.experts').style.display = 'none'
          document.querySelector('.bookmarks').style.display = 'block'
        }
    };

    const [spec, setSpec] = useState([])

    let [specArray, setUsers] = useState([])
    let [bookmarks, setBookmarks] = useState([])
    let sortdedRabotniki = specArray
    let [searchQuery, setSearhQuery] = useState('')
    // sortdedRabotniki = useMemo(() => {
    //     return specArray.filter(rabotnik => rabotnik.specional.join(' ').includes(searchQuery));
    // }, [searchQuery, setUsers]);

    
    const GetZ = async() => {
      const id = window.localStorage.getItem('myID')
      bookmarks = await dispatch(fetchGetAllUserZ())
      setBookmarks(bookmarks)
    }
    GetZ()
    React.useEffect((users) => {
      const asyncFn = async() => {
        const isAuth = Boolean(window.localStorage.getItem('accessToken'))
        specArray = await dispatch(fetchSpec())
        specArray = specArray.payload
        setUsers(specArray)
      }
      asyncFn()
    }, [spec, setUsers]);


    
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

    const removeActiveGalka = () => {
        document.querySelectorAll('.filetrsGalka').forEach((e) => {
            e.classList.remove('activeFilter')
        })
    }

    const addActiveGalka = () => {
        document.querySelectorAll('.filetrsGalka').forEach((e) => {
            e.classList.add('activeFilter')
        })
    }

    const clickGeo = (e) => {
        console.log(e)
        e.currentTarget.children[1].classList.toggle('show');
    }

    const clickGalka = (el) => {
        document.querySelectorAll('.galka').forEach((e) => {
            e.style.display = 'none'
        })
        console.log(el)
        el.target.nextElementSibling.style.display = 'block'
    }


    return (

        <div className='Experts'>

            <EmpNavbar/>
            <EmpNavbarMobile/>

            <h1>Специалисты</h1>


            <div className="container body">

                <div className="row alignment">

                    <div className='col-sm-4 col-12 button searchButton'>
                        <div className="search">
                            <input 
                                type="text" 
                                placeholder="Поиск по специальности"
                                value={searchQuery}
                                onChange={e => {setSearhQuery(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className='col-sm-3 col-3 button'>
                        <ul className="link" onClick={onClickFilters}>
                        <img src={filter_icon} alt="" class="filters" />&#8194;<span className='filtersSpan'>Фильтры</span>
                            <div className="dropdown-menu" style={{columns: '2'}} onClick={e => {e.stopPropagation()}}>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>автослесарь</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>автомеханик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>парковщик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>атвожестянщик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>автомаляр</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>автоэлектрик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>арматурщик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>администратор</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>мастер приемщик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>инженер по гарантии</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>сервисный инженер</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>механик-моторист</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>механик по ремонту трансмиссии</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>механик по ремонту ходовой части</li>
                    </div>                  
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>мастер кузовного цеха</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>парковщик</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>шиномонтажник</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>автомойщик </li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>администратор автомойки</li>
                    </div>
                    <div className="item">
                      <div className="link__icon">
                        <img className='filetrsGalka activeFilter' src={galka} alt=""/>
                      </div>&#8195;
                      <li className="link__todo" onClick={clickFiltersGalka}>специалист детейлинга и химчистки</li>
                    </div>
                  </div>
                        </ul>
                    </div>
            {/* инпут для фильтров */}
            <input className="specArray" style={{display: 'none'}}/>
                    <div className='col-sm-1 col-2 buttonGeo'>
                        <ul className="sity" onClick={clickGeo}><img src={geo} alt="" class="filters"/>
                        <div className="dropdown-menu-country">
                            <div className="item-country">
                            <span onClick={clickGalka}>Краснодар</span><img className='galka' src={galka} style={{display: 'block'}} alt=""/>
                            </div>
                            <div className="item-country">
                            <span onClick={clickGalka}>Нижний новгород</span><img className='galka' src={galka} alt=""/>
                            </div>
                            <div className="item-country">
                            <span onClick={clickGalka}>Москва</span><img className='galka' src={galka} alt=""/>
                            </div> 
                            <div className="item-country">
                            <span onClick={clickGalka}>Казань</span><img className='galka' src={galka} alt=""/>
                            </div>
                            <div className="item-country">
                            <span onClick={clickGalka}>Санкт-петербург</span><img className='galka' src={galka} alt=""/>
                            </div>           
                        </div>
                        </ul>
                    </div>
                    <div className='col-sm-3 col-5 button'>
                        <div className='my-advertisement' onClick={e => bookmarksClick(e)}>
                            <span className="advertisement__span">{showBookmarks ? 'Закладки' : 'Специалисты'}</span>
                        </div>
                    </div>
                    
                </div>

                <div className='experts'>
                  <Rabotniki className='rabotniki' rabotniki={{sortdedRabotniki}}/> 
                </div>
                <div className='bookmarks' style={{display: 'none'}}>
                  <Bookmarks className='rabotniki' bookmarks={{bookmarks}}/>
                </div>

            </div>
        </div>
    );

}

export default Experts;