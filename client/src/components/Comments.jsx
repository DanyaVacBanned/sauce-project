import React, { useState } from "react";
import Comment from "./Comment";
import send from '../img/отправить.png'
import { fetchAddComment, fetchDeleteComment, fetchGetAllComment } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
const Comments = ({comments}) => {

  const allComments = comments.post.comments
  const commentsX = comments.post

  const dispatch = useDispatch()

  const [comm, setComm] = useState([])

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
      const postID = commentsX._id
      const comm = await dispatch(fetchAddComment(postID, values))
      setComm(comm)
      console.log(comm)
      }

      const remove = () => {
        document.querySelector('.commentText').value = ''
      }

  return (

          <div className="comments" style={{display: 'none'}}>
            <div className="commentsScroll">
            {allComments.map((e) => <Comment comment={e} commentsX={commentsX} key={e._id}/>)}
            </div>
            <form className="addComment" onSubmit={handleSubmit(onSubmit)}>
              <textarea type="text" 
              className="commentText"
              label='comment'
              {...register('comment')} />
              <button type='submit' onClick={remove}>
              <img src={send}/>
              </button>
            </form>
          </div>

  );
};

export default Comments;