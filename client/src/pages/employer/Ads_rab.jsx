import React, {useState, useMemo, useEffect} from "react";
import EmpNavbar from '../../components/employer/EmpNavbar';
import EmpNavbarMobile from '../../components/employer/EmpNavbarMobile';
import Rabotniki_ads from '../../components/employer/rab_ads'
import MyBids from '../../components/employer/MyBids_rab'
import geo from '../../img/geo.png'
import galka from '../../img/галочка.png'
import filter_icon from '../../img/filters.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';
import Bookmarks_ads_rab from '../../components/employer/Bookmarks_ads_rab'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { fetchAppCreate, fetchAppsSpec, fetchAppDelete, fetchMyApps, fetchAppSpecFilterCity, fetchAppSpecFilterSpecional, fetchGetAllZ } from '../../redux/slices/auth'
function Ads_rab() {

  
  const dispatch = useDispatch()
      //values = по чему филтровать например Краснодар
      const filterCity = async(values) => {
        const filterApp = await dispatch(fetchAppSpecFilterCity(values))
        console.log(filterApp)
      }
      const filterSpec = async(values) => {
        const filterApp = await dispatch(fetchAppSpecFilterSpecional(values))
        console.log(filterApp)
      }
  const [ads, setAds] = useState([
    {id: 1, name: 'stopapupa', text: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty'},
    {id: 2, name: 'stopapupa',  text: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 456, name: 'stopapupa',  text: 'qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwertyqwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 254, name: 'stopapupa',  text: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 14, name: 'stopapupa',  text: 'qwerty qwerty qwerty qqwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty ty qwerty qwerty'},
    {id: 42, name: 'stopapupa',  text: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 71, name: 'stopapupa',  text: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 92, name: 'stopapupa',  text: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
  ])

  const [myads, setMyads] = useState([
    {id: 1, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty'},
    {id: 2, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 456, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwertyqwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 254, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
    {id: 2594, myName: 'stopapupa',  mytext: 'qwerty qwerty qwerty qwer qwerty qwerty qwerty qwerty qwerty'},
  ])

  let [bookmarksNew, setbookmarksNew] = useState([])

  const GetZ = async() => {
    bookmarksNew = await dispatch(fetchGetAllZ())
    setbookmarksNew(bookmarksNew)
  }
  GetZ()
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
    
  const onClickFilters = (e) => {
    e.currentTarget.children[2].classList.toggle('show');
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
      forAddADs.setAttribute('style', 'position:absolute; width:100%; height:200%; background:#000; z-index:10000000; opacity:0.5;')
      document.querySelector('html').prepend(forAddADs)
  }
    
  const addNewAds = async(value) => {
    
    
      const textInput = document.querySelector('.text').value
      const name = document.querySelector('.name').value
      if(textInput !== '' && name !== ''){
          const newBid = {
              id: Date.now(), 
              myName: name,
              mytext: textInput,
          }
          setMyads([...myads, newBid])
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

  const removeForm = () => {
          document.querySelector('.text').value = ''
          document.querySelector('.adsForm').style.display = 'none';
          document.querySelectorAll('.forAddADs').forEach((e) => {
              e.remove();
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
      el.target.nextElementSibling.style.display = 'block'
  }
  
  const [spec, setSpec] = useState([])
  let [data, setData] = useState([])


  React.useEffect(() => {
    const asyncFn = async () => {
      let data = await dispatch(fetchAppsSpec())
      data = data.payload
      console.log(data)
      setData(data)
    }
    asyncFn()
    }, [spec, setData]);

    let [myapps, setMyapps] = useState([])

  const myApps = async() => {
    myapps = await dispatch(fetchMyApps())
    setMyapps(myapps)
  }
  myApps()
  
  // const clickUser = async(id) => {
  //   const user = await dispatch(fetchGetOneUser(id))
  //   console.log(user)
  // }

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

  let sometime = true;
  const soonmoonFunc = () => {

      if(sometime){
          document.querySelector('body').style.background = 'black'
          document.querySelector('.navbar_menu').style.background = 'black'
          document.querySelectorAll('.input_back').forEach((e) => {e.style.color = 'white'})
          document.querySelector('.sun-moon').src = sun_img;
          sometime = false
      } else{
          document.querySelector('body').style.background = 'white'
          document.querySelector('.navbar_menu').style.background = 'white'
          document.querySelectorAll('.input_back').forEach((e) => {e.style.color = 'black'})
          document.querySelector('.sun-moon').src = moon_img;
          sometime = true
      }
  }



  return (

      <div className="Ads_rab">

        <EmpNavbar/>
        <EmpNavbarMobile/>

        <div className="container">
          <div className="row">

            
              <div className='col-lg-2 col-4 button menuAnimation buttonNuN' onClick={handleClickAds}>
                <span>Объявления</span>
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
            <div className="row">
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
              <Rabotniki_ads Ads_rab={data}/>
            </div>
            <div className={ActiveMyAds ? 'block' : 'none'}>
              <MyBids ads={myapps}/>
            </div>
            <div className={Bookmarks ? 'block' : 'none'}>
              <Bookmarks_ads_rab bookmarks={bookmarksNew}/>
            </div>

          </div>
        </div>

      </div>
    );
}
  
  export default Ads_rab;