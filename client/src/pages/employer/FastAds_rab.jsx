import React, { useState, useEffect } from 'react';
import geo from '../../img/geo.png'
import galka from '../../img/галочка.png'
import FastRabs from '../../components/employer/Urgent/FastRabs';
import MyBidsFast from '../../components/employer/Urgent/MyBidsFast';
import Fast_Bookmarks from '../../components/employer/Urgent/Fast_Bookmarks';
import EmpNavbar from '../../components/employer//EmpNavbar';
import EmpNavbarMobile from '../../components/employer/EmpNavbarMobile';
import filter_icon from '../../img/filters.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppCreate, fetchFAppsSpec, fetchMyFApps, fetchFAppSpecFilterCity, fetchFAppSpecFilterSpecional, fetchAddFAppZ, fetchRemFAppZ, fetchGetAllFAppZ } from '../../redux/slices/auth'
import { useForm } from 'react-hook-form';

const FastAds_rab = () => {


    const [fastbid, setFastBid] = useState([
        {id: 1, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty'},
        {id: 2, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
        {id: 456, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwertyqwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
        {id: 254, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    ])
    const dispatch = useDispatch()
      //values = по чему филтровать например Краснодар
      const filterCity = async(values) => {
        const filterApp = await dispatch(fetchFAppSpecFilterCity(values))
        console.log(filterApp)
      }
      const filterSpec = async(values) => {
        const filterApp = await dispatch(fetchFAppSpecFilterSpecional(values))
        console.log(filterApp)
      }
    const [isActive, setIsActive] = useState(false);

     const clickGalka = (el) => {
        document.querySelectorAll('.galka').forEach((e) => {
            e.style.display = 'none'
        })
        console.log(el)
        el.target.nextElementSibling.style.display = 'block'
    }

    const addAds = () => {
        setActiveMyAds(current => current = true);
        setBookmarks(current => current = false);
        setActiveAds(current => current = false);
    
        document.querySelector('.buttonBookmarks').classList.remove('menuAnimation')
        document.querySelectorAll('.button').forEach(e => {
          if(e.classList.contains('menuAnimation')) e.classList.remove('menuAnimation');
        })
        document.querySelectorAll('.button')[1].classList.add('menuAnimation')
        document.querySelectorAll('.button')[3].classList.add('menuAnimation')

        document.querySelector('.adsForm').style.display = 'block'
        const forAddADs = document.createElement('div')
        forAddADs.classList.add('forAddADs')
        forAddADs.setAttribute('style', 'position:absolute; width:100%; height:200%; background:#000; z-index:100001; opacity:0.5;')
        document.querySelector('html').prepend(forAddADs)
    }

    const addNewAds = async() => {

        const textInput = document.querySelector('.text').value
        const name = document.querySelector('.name').value
        if(textInput !== '' && name !== ''){
            const newBid = {
                id: Date.now(),
                myName: name, 
                mytext: textInput,
            }
            setFastBid([...fastbid, newBid])
            document.querySelector('.adsForm').style.display = 'none';
            document.querySelectorAll('.forAddADs').forEach((e) => {
                e.remove();
                document.querySelector('.text').value = '';
                document.querySelector('.name').value = '';
            })
        } else {
            alert('пожалуйста, заполните все необходимые поля')
        }


    }

    let [bookmarksNew, setbookmarksNew] = useState([])
    const GetZ = async() => {
      bookmarksNew = await dispatch(fetchGetAllFAppZ())
      setbookmarksNew(bookmarksNew)
    }
    GetZ()

    const removeForm = () => {
        document.querySelector('.text').value = ''
        document.querySelector('.adsForm').style.display = 'none';
        document.querySelectorAll('.forAddADs').forEach((e) => {
            e.remove();
        })
    }

    const [ActiveAds, setActiveAds] = useState(true);
    const [ActiveMyAds, setActiveMyAds] = useState(false);
    const [Bookmarks, setBookmarks] = useState(false);
    
    const handleClickAds = (e) => {
        setActiveMyAds(current => current = false);
        setBookmarks(current => current = false);
        setActiveAds(current => current = true);
    
        document.querySelector('.buttonBookmarks').classList.remove('menuAnimation')
        document.querySelector('.dopMenu').style.display = 'none'
    
    
        document.querySelectorAll('.button').forEach(e => {
          if(e.classList.contains('menuAnimation')) e.classList.remove('menuAnimation');
        })
        if(e.target.classList.contains('button')){
          e.target.classList.add('menuAnimation')
        } else {
          e.target.parentElement.classList.add('menuAnimation')
        }
    
    };
    
    const handleClickMyAds = (e) => {
        setActiveMyAds(current => current = true);
        setBookmarks(current => current = false);
        setActiveAds(current => current = false);
    
        document.querySelector('.buttonBookmarks').classList.remove('menuAnimation')
        document.querySelector('.dopMenu').style.display = 'block'
    
        document.querySelectorAll('.button').forEach(e => {
          if(e.classList.contains('menuAnimation')) e.classList.remove('menuAnimation');
        })
        if(e.target.classList.contains('button')){
          e.target.classList.add('menuAnimation')
        } else {
          e.target.parentElement.classList.add('menuAnimation')
        }
    };
  
    const handleClickBookmarks = (e) => {

        setActiveMyAds(current => current = false);
        setBookmarks(current => current = true);
        setActiveAds(current => current = false);
    
        document.querySelectorAll('.button').forEach(e => {
          if(e.classList.contains('menuAnimation')) e.classList.remove('menuAnimation');
        })
        if(e.target.classList.contains('buttonBookmarks')){
          e.target.classList.add('menuAnimation')
        } else {
          e.target.parentElement.classList.add('menuAnimation')
        }
    };

    const handleClicFilters = () => {
        setActiveMyAds(current => current = false);
        setBookmarks(current => current = false);
        setActiveAds(current => current = true);
    
        document.querySelectorAll('.button').forEach(e => {
          if(e.classList.contains('menuAnimation')) e.classList.remove('menuAnimation');
        })
        document.querySelectorAll('.button')[0].classList.add('menuAnimation');
        document.querySelectorAll('.button')[2].classList.add('menuAnimation');
        document.querySelector('.dopMenu').style.display = 'none';
    };
    
    const clickGeo = (e) => {
        console.log(e)
        e.currentTarget.children[1].classList.toggle('show');
    }
    
      
    const onClickFilters = (e) => {
      e.currentTarget.children[2].classList.toggle('show');
    }

    let [myFapps, setMyFapps] = useState([])

    const myApps = async() => {
      myFapps = await dispatch(fetchMyFApps())
      setMyFapps(myFapps)
    }
    myApps()

    const [spec, setSpec] = useState([])
    let [fastData, setfastData] = useState([])
  
  
    React.useEffect(() => {
      const asyncFn = async() => {
        let fastData = await dispatch(fetchFAppsSpec())
        fastData = fastData.payload.postSpec
        setfastData(fastData)
      }
      asyncFn()
    }, [spec, setfastData]);
  
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
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid },
      } = useForm({
          defaultValues: {
            
          }
        })
    const onSubmit = async(values) => {
      const data = dispatch(fetchAppCreate(values))
    }


    return (

        <div className='FastAds_rab'>
            
            <EmpNavbar/>
            <EmpNavbarMobile/>

           
            <div className="container body">

                <div className="row alignment">

                    <div className='col-lg-2 col-4 button menuAnimation buttonNuN litleFont' onClick={handleClickAds}>
                        <span>Готов выйти <br/> на подмену</span>
                    </div>
                    <div className='col-lg-3 col-4 buttonFilters buttonNuN' onClick={handleClicFilters}>
                        <ul className="link" onClick={onClickFilters}>
                            <img src={filter_icon} alt="" class="filters" />&#8194;<span>Фильтры</span>
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
                    <div className='col-1 buttonGeo buttonNuN'>
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
                    <div className='col-lg-3 col-11 button buttonMy buttonNuN' onClick={handleClickMyAds}>
                <span>Мои вакансии</span>
                    </div>

                    <div className="mobileLitleMenu" style={{display: 'none'}}>
                        <div className="row">
                            <div className='col-5 buttonFilters' onClick={handleClicFilters}>
                            <ul className="link" onClick={onClickFilters}>
                                        <img src={filter_icon} alt="" class="filters" />&#8194;<span className="filtersSpan">Фильтры</span>
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
                            <div className="col-1"></div>
                            <div className='col-5 buttonGeo'>
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
                        </div>
                        <div className= 'col-12 button menuAnimation' onClick={handleClickAds}>
                            <span>Оъявления</span>
                        </div>
                        <div className= 'col-12 button buttonMy' onClick={handleClickMyAds}>
                            <span>Мои объявления</span>
                        </div>
                    </div>

                    <div className="dopMenu" style={{display: 'none'}}>
                        <div className="row" style={{marginTop: '0'}}>
                                <div className="col-3 NonInMobile"></div>
                                <div className='col-lg-3 col-sm-5 col-5 buttonAddAds' onClick={addAds}>
                                    <span>Новая вакансия</span>
                                </div>
                                <div className="col-1"/>
                                <div className="col-lg-3 col-sm-5 col-5 buttonBookmarks" onClick={handleClickBookmarks}>
                                <span>Закладки</span>
                            </div>
                    </div>
                    </div>

                    <form className='adsForm' onSubmit={handleSubmit(onSubmit)}>
                        <p>Новая вакансия</p>
                        <input className="name" 
                               placeholder="Название вакансии:"
                               label='title'
                               {...register('title')}/>
                        <textarea className='text' 
                               type='text' 
                               placeholder='Здесь вы можете указать:
                               График работы, Ближайшее метро, Ставка или Доход за смену и другое.
                               Так же вы можете указать дополнительную информацию по вашей вакансии, которая может заинтересовать Соискателей'
                               label='text'
                               {...register('text')}/>
                        <button type="submit" onClick={addNewAds}>Добавить вакансию</button>
                        <button onClick={removeForm}>Отмена</button>
                    </form>

                    <div className={ActiveAds ? 'block' : 'none'}>
                        <FastRabs fastrabotniki={fastData}/>
                    </div>
                    <div className={ActiveMyAds ? 'block' : 'none'}>
                        <MyBidsFast bids={myFapps}/>
                    </div>
                    <div className={Bookmarks ? 'block' : 'none'}>
                        <Fast_Bookmarks bookmarks={bookmarksNew}/>
                    </div>
                  
                </div>        

            </div>
        </div>
    )

}

export default FastAds_rab;