import React from "react";
import EmpNavbar from "../components/employer/EmpNavbar";
import ExpNavbar from "../components/expert/ExpNavbar";
import EmpNavbarMobile from '../components/employer/EmpNavbarMobile';
import ExpNavbarMobile from '../components/expert/ExpNavbarMobile';
import menImg from '../img/men1.jpg';
import { useState } from "react";
import Posts from "../components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostCreate, fetchPostOne, fetchPostAll, fetchPostUpdate, fetchPostDelete} from '../redux/slices/auth'

function Forum() {
  const dispatch = useDispatch()
    // if(localStorage.getItem('identefication') == 'expert'){
    //   const Navbar = <ExpNavbar/>
    //   const NavbarMobile = <ExpNavbarMobile/>
    // } else if (localStorage.getItem('identefication') == 'employes'){
    //   const Navbar = <EmpNavbar/>
    //   const NavbarMobile = <EmpNavbarMobile/>
    // }
  

  const openCom = () => {
    document.querySelector('.comments').classList.toggle('show')
  }

  const [posts, setPosts] = useState([])

  React.useEffect(() => {
    const asyncFn = async () => {
      const posts = await dispatch(fetchPostAll())
      setPosts(posts)
    }
    asyncFn()
  }, [])

  

    return (
      <div className="Forum">
        <EmpNavbar/>
        <EmpNavbarMobile/>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <Posts posts={posts}/>
          </div>
        </div>
        <div style={{height: '70px'}}></div>
      </div>

      </div>
    );
  }
  
  export default Forum;