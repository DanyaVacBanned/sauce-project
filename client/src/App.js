import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './styles/reset.css' 
import './styles/styles.scss'
import './styles/adaptivStyles.scss'

import Guest from "./pages/Guest";

import Entrance from './pages/registration/Entrance';
import Registration from './pages/registration/Registration';

import EmpProfile from './pages/employer/EmpProfile';
import EmpProfileSettings from './pages/employer/EmpProfileSettings';
import Experts from './pages/employer/Experts'
import Ads_rab from './pages/employer/Ads_rab';
import SpecProfile from './pages/employer/ExpertProfile';
import FastAds_rab from './pages/employer/FastAds_rab';

import ExpProfile from './pages/expert/ExpProfile';
import ExpProfileSettings from './pages/expert/ExpProfileSettings';
import Vacancy from './pages/expert/Vacancy';
import EmployerProfile from './pages/expert/EmployerProfile';
import FastAds_exp from './pages/expert/FastAds_exp';

import Chat from './pages/chat/Chat'
import MainChat from './pages/chat/MainChat'
import Messages from './pages/chat/Messages'

import Forum from './pages/Forum';
import News from './pages/News';

import { selectIsAuth, fetchAuthMe } from './redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux'

function App() {


  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   dispatch(fetchAuthMe())
  // }, [])

  return (
    <div className="App">




      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Guest/>}/>

          <Route path='/entrance' element={<Entrance/>}/>
          <Route path='/registration' element={<Registration/>}/>

          <Route path='/profile_rab' element={<EmpProfile/>}/>
          <Route path='/profileSettings_rab' element={<EmpProfileSettings/>}/>
          <Route path='/experts' element={<Experts/>}/>
          <Route path='/ads_rab' element={<Ads_rab/>}/>
          <Route path='/exp_profile' element={<SpecProfile/>}/>
          <Route path='/fast_ads_rab' element={<FastAds_rab/>}/>

          <Route path='/profile_exp' element={<ExpProfile/>}/>
          <Route path='/profileSettings_exp' element={<ExpProfileSettings/>}/>
          <Route path='/ads_exp' element={<Vacancy/>}/>
          <Route path='/emp_profile' element={<EmployerProfile/>}/>
          <Route path='/fast_ads_exp' element={<FastAds_exp/>}/>

          <Route path='/chat' element={<Chat/>}/>
          <Route path='/mainchat' element={<MainChat/>}/>
          <Route path='/messages' element={<Messages/>}/>

          <Route path='/forum' element={<Forum/>}/>
          <Route path='/info' element={<News/>}/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
