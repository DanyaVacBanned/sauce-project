import React, { useState } from "react";
import menImg from '../img/men1.jpg'
import { fetchAddComment, fetchDeleteComment } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import deleteImg from '../img/крестик.png'
import changeImg from '../img/редактировать.png'

const Comment = (props) => {
  console.log(props)

  const dispatch = useDispatch()
      

const deletePost = async() => {
  document.querySelectorAll('.miniFormComm').forEach(element => {
      element.style.display = 'block'
  });
}

const deletePostBut = async() => {
  const commId = props.comment._id
  const postId = props.commentsX._id
  toString(commId)
  await dispatch(fetchDeleteComment({postId, commId}))
  window.location.reload();
}

const removeForm = async() => {
  document.querySelectorAll('.miniFormComm').forEach(element => {
      element.style.display = 'none'
  });
}

  return (

        <div className="comment myComment">
            {
                props.comment.userId == window.localStorage.getItem('userID')
                ? <img src={deleteImg} className="deleteComment" style={{display: 'block'}}/>
                : <img src={deleteImg} className="deleteComment" style={{display: 'none'}}/>
            } 
            <img src={menImg} className="commentImg"/>
            <div className="commentName">Egor</div>
            <div className="commentText">{props.comment.comment}</div>
            <div className="miniFormComm" style={{display: 'none'}}>
              <button onClick={deletePostBut}>Удалить пост</button>
              <button onClick={removeForm}>отмена</button>
            </div>
        </div>

  );
};

export default Comment;