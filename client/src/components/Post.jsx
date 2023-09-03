import React, { useState } from "react";
import menImg from '../img/men1.jpg'
import deleteImg from '../img/крестик.png'
import changeImg from '../img/редактировать.png'
import Comments from "./Comments";
import { useDispatch } from "react-redux";
import { fetchAddComment, fetchDeleteComment, fetchGetAllComment, fetchPostDelete } from "../redux/slices/auth";
const Post = (props) => {
    const dispatch = useDispatch()

    const [comments, setComments] = useState([])

    const getAllComents = async() => {
        const id = '64c9e8b6747b2e19e1920acb'
        // const id = props.post._id
        let comments = await dispatch(fetchGetAllComment(id))
        comments = comments.payload
        setComments(comments)
    }

    const openCom = (e) => {
        e.target.nextSibling.classList.toggle('show')
        const scrollEl = e.target.nextSibling.firstChild
        scrollEl.scrollTo(0, scrollEl.scrollHeight)
        getAllComents()
    }



    const deletePost = async() => {
        document.querySelectorAll('.miniForm').forEach(element => {
            element.style.display = 'block'
        });
    }

    const deletePostBut = async() => {
        const id = props.post._id
        await dispatch(fetchPostDelete(id))
        console.log(id)
        window.location.reload();
    }

    const removeForm = async() => {
        document.querySelectorAll('.miniForm').forEach(element => {
            element.style.display = 'none'
        });
    }
    
    const addComment = async(values) => {
        const id = '64c9e8b6747b2e19e1920acb'
        const comm = await dispatch(fetchAddComment(id, values))
        console.log(comm)
    }
   

  return (

        <div className="post myPost">
            {
                props.post.user._id == window.localStorage.getItem('userID')
                ? <img src={changeImg} className="changeComment" style={{display: 'block'}}/>
                : <img src={changeImg} className="changeComment" style={{display: 'none'}}/>
            }
            {
                props.post.user._id == window.localStorage.getItem('userID')
                ? <img src={deleteImg} className="deleteComment" onClick={deletePost} style={{display: 'block'}}/>
                : <img src={deleteImg} className="deleteComment" onClick={deletePost} style={{display: 'none'}}/>
            }
            {
                props.post.user._id == window.localStorage.getItem('userID')
                ? <img src={menImg} className="postAvatar mypostAvatar"/>
                : <img src={menImg} className="postAvatar"/>
            }
             <div className="name">{props.post.user.fullName}</div>
             <div className="postName title">{props.post.title}</div>
             <div className="postText text">{props.post.text}</div>
             <button onClick={openCom} className="openComments">Коментарии</button>
             <Comments comments={props}/>
             <div className="miniForm" style={{display: 'none'}}>
            <button onClick={deletePostBut}>Удалить пост</button>
            <button onClick={removeForm}>отмена</button>
            </div>
        </div>
  );
};

export default Post;