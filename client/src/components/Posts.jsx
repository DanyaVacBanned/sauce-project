import React, { useState } from "react";
import Post from "./Post";
import { useForm } from "react-hook-form";
import { fetchPostCreate, fetchPostDelete, fetchPostOne, fetchPostUpdate, fetchPostMy } from "../redux/slices/auth";
import { useDispatch } from "react-redux";

const Posts = ({posts}) => {

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
 

  const [post, setPost] = useState([])

  const dispatch = useDispatch()
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
      const post = await dispatch(fetchPostCreate(values))
      setPost(post)

      }
      const updatePost = async(values) => {
        const id = '64c704ee0bafc57b82b9ac80'
        const post = await dispatch(fetchPostUpdate(id, values))
      }
      const getMyPost = async() => {
        const myPost = await dispatch(fetchPostMy())
      }
      getMyPost()
      const newPost = () => {
        document.querySelector('.adsForm').classList.add('show')
      }
      posts = posts.payload



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
      
      const addNewAds = () => {
        document.querySelector('.text').value = ''
        document.querySelector('.name').value = ''
        document.querySelector('.adsForm').classList.remove('show');
        window.location.reload()
      }

      const removeForm = () => {
        document.querySelector('.name').value = ''
        document.querySelector('.text').value = ''
        document.querySelector('.adsForm').classList.remove('show');
    } 



  return (

          <div className="posts">
            <button className="createPost" onClick={newPost}>Создать пост</button>
              <form className='adsForm' onSubmit={handleSubmit(onSubmit)}>
                <p>Новый пост</p>
                <input className="name" 
                placeholder="Название поста:"
                label='title'
                {...register('title')}/>
                <textarea className='text' 
                type='text' placeholder='Текст поста'
                label='text'
                {...register('text')}/>
                <button type="submit" onClick={addNewAds}>Опубликовать пост</button>
                <button onClick={removeForm}>Отмена</button>
              </form>
              {
                posts 
                ? posts.map((e) => <Post post={e} key={e._id}/>).reverse()
                : <h1 style={{textAlign: 'center', marginBottom: '50px'}}>Посты не найдены</h1>
              }
          </div>

  );
};

export default Posts;