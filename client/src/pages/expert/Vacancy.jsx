import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpNavbar from '../../components/expert/ExpNavbar';
import Experts_ads from '../../components/expert/exp_ads'
import ExpNavbarMobile from '../../components/expert/ExpNavbarMobile';
import MyBids_exp from '../../components/expert/MyBids_exp'
import geo from '../../img/geo.png'
import galka from '../../img/галочка.png'
import filter_icon from '../../img/filters.png'
import sun_img from '../../img/sun.png';
import moon_img from '../../img/moon.png';
import { useForm } from 'react-hook-form'
import Bookmarks_spec from "../../components/expert/Bookmarks_spec";
import { fetchAppCreate, fetchAppsRab, fetchAppRabFilterCity, fetchAppRabFilterSpecional, fetchMyApps, fetchAddZ, fetchRemZ, fetchGetAllZ } from '../../redux/slices/auth'


function Vacancy() {

  const [ads, setAds] = useState([
    {id: 1, name: 'straura', text: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 2, name: 'straura', text: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 456, name: 'straura', text: 'aap aapapapap aapapapap aapapapap aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 254, name: 'straura', text: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 14, name: 'straura', text: 'aapapapap aapapapapap aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 42, name: 'straura', text: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 71, name: 'straura', text: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 92, name: 'straura', text: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap aapapapap aapapapapaapapapap aapapapap aapapapap aapapapapaapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
  ])

  const [myadsSpec, setmyadsSpec] = useState([
    {id: 1, myName: 'straura', mytext: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 254, myName: 'straura', mytext: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
    {id: 2594, myName: 'straura', mytext: 'aapapapap aapapapapaapapapap aapapapap aapapapap aapapapap'},
  ])


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
    forAddADs.setAttribute('style', 'position:absolute; width:100%; height:200%; background:#000; z-index:1000000; opacity:0.5;')
    document.querySelector('html').prepend(forAddADs)
  }
  //values = по чему филтровать например Краснодар
  const filterCity = async(values) => {
    const filterApp = await dispatch(fetchAppRabFilterCity(values))
    console.log(filterApp)
  }
  const filterSpec = async(values) => {
    const filterApp = await dispatch(fetchAppRabFilterSpecional(values))
    console.log(filterApp)
  }
  const addNewAds = () => {

    

    const textInput = document.querySelector('.text').value
    const name = document.querySelector('.name').value
    if(textInput !== '' && name !== ''){
        const newBid = {
            id: Date.now(), 
            myName: name,
            mytext: textInput,
        }
        setmyadsSpec([...myadsSpec, newBid])
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

  const [spec, setSpec] = useState([])
  let [data, setData] = useState([])


  useEffect(() => {
    const specArray = spec.length > 0 ? spec.join(', ') : '';
    document.querySelector('.specArray').value = specArray;
  }, [spec]);

  const dispatch = useDispatch()

  React.useEffect(() => {
    const asyncFn = async () => {
      let data = await dispatch(fetchAppsRab())
      data = data.payload.postSpec
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
  const filterAppCity = async() => {
    const filterApp = await dispatch()
  }

  let [bookmarksNew, setbookmarksNew] = useState([])
  const AddZ = async() => {
    const id = window.localStorage.getItem('userID')
    await dispatch(fetchAddZ(id))
  }
  const RemZ = async() => {
    const id = window.localStorage.getItem('userID')
    await dispatch(fetchRemZ(id))
  }
  const GetZ = async() => {
    const id = '64c60533a20048a3b4af01a8'
    bookmarksNew = await dispatch(fetchGetAllZ())
    setbookmarksNew(bookmarksNew)
  }
  GetZ()

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

      <div className="Ads_exp">

        <ExpNavbar/>
        <ExpNavbarMobile/>

        <div className="container">
          <div className="row">

            <div className='backOpacity col-lg-2 col-4 button menuAnimation buttonNuN' onClick={handleClickAds}>
              <span>Вакансии</span>
            </div>
            <div className='col-lg-3 col-4 backOpacity buttonFilters buttonNuN' onClick={handleClicFilters}>
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
            <div className='col-1 backOpacity buttonGeo buttonNuN'>
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
            <div className='col-lg-3 col-11 buttonMy backOpacity button buttonNuN' onClick={handleClickMyAds}>
              <span>Мои объявления</span>
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
                <div className="col-3 NonInMobile"/>
                  <div className='col-lg-3 col-5 buttonAddAds' onClick={addAds}>
                    <span>Новое объявление</span>
                  </div>
                  <div className="col-1"/>
                  <div className="col-lg-3 col-5 buttonBookmarks" onClick={handleClickBookmarks}>
                    <span>Закладки</span>
                  </div>
                </div>
            </div>

            <form className='adsForm'  onSubmit={handleSubmit(onSubmit)}>
              <p>Новое объявление</p>
              <input className="name" 
                placeholder="Название объвления:"
                label='title'
                {...register('title')}/>
              <textarea className='text' 
                type='text' 
                label='text'
                {...register('text')}
                placeholder='Здесь вы можете разместить свою заявку о желании и готовности работать.
                Так же описать дополнительную информацию по вашему опыту, который может заинтересовать Работодателя'/>
              <button onClick={addNewAds}>Добавить объявление</button>
              <button onClick={removeForm}>Отмена</button>
            </form>

            <div className={ActiveAds ? 'block' : 'none'}>
              <Experts_ads Ads_exp={data}/>
            </div>
            <div className={ActiveMyAds ? 'block' : 'none'}>
              <MyBids_exp ads={myapps}/>
            </div>
            <div className={Bookmarks ? 'block' : 'none'}>
              <Bookmarks_spec bookmarks={bookmarksNew}/>
            </div>

          </div>
        </div>

      </div>
    );
}
  
  export default Vacancy;