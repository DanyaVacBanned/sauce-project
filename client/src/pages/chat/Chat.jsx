import React from "react";
// import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from 'react-hook-form'
// import EmojiPicker from "emoji-picker-react";

// import icon from "../images/emoji.svg";
import styles from "../../styles/chat/Chat.module.css";
import Messages from "./Messages";
import leftArrow from '../../img/стрелкаНазадБелая.png'
import down from '../../img/вниз.png'
import sendImg from '../../img/отправить.png'
// const socket = io.connect("http://localhost:5000");
import { fetchGetMessage, fetchAddMessage } from '../../redux/slices/auth'
import { useDispatch } from "react-redux";
const Chat = () => {


  const getMessage = async() => {
    const id = '64d38b8d8889c3aca45c69a3'
    const fullMess = await dispatch(fetchGetMessage(id))
    console.log(fullMess)
  }

  const addMessage = async() => {
    const userID = window.localStorage.getItem('userID')
    const id = userID
    const mess = await dispatch(fetchAddMessage(id))
  }

  const dispatch = useDispatch()

  const { search } = useLocation();
  const navigate = useNavigate();
  const [ params, setParams ] = useState({ room: "", user: "" });
  let [ state, setState ] = useState('');
  const [ message, setMessage ] = useState("");
  const [ isOpen, setOpen ] = useState(false);
  const [ users, setUsers ] = useState(0);

  // useEffect(() => {
  //   const searchParams = Object.fromEntries(new URLSearchParams(search));
  //   setParams(searchParams);
  //   socket.emit("join", searchParams);
  // }, [search]);

  // useEffect(() => {
  //   socket.on("message", ({ data }) => {
  //     setState((_state) => [..._state, data]);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("room", ({ data: { users } }) => {
  //     setUsers(users.length);
  //   });
  // }, []);

  // const leftRoom = () => {
  //   socket.emit("leftRoom", { params });
  //   navigate("/");
  // };
  // const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);


  const scroolFunc = () => {
    const scrollEl = document.getElementById('scrollel')
    scrollEl.scrollTo(0, scrollEl.scrollHeight)
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


      


      const onSubmit = (values) => {
        const id = ''
        const asyncFn = async () => {
          const data = await dispatch(fetchAddMessage(values, id))
          setState(values.message)
          console.log()
          let message = document.createElement('input')
          message.type = 'text'
          message.readOnly = 'true'
          message.value = state
          message.className = styles.Mymessage
          (document.getElementById('scrollel')).append(message)
        }     
        asyncFn()   
    } 

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <Link to='/MainChat'><img src={leftArrow} className={styles.left}/></Link>
        <img src={down} onClick={scroolFunc} className={styles.down} id="scrollButton"/>
      </div>

      <div className={styles.messages} id="scrollel">
        <input type="text" readOnly value={state} className='Mymessage'/>
        {/* <Messages messages={state} name={params.name} /> */}
        {/* пример диалога */}
      </div>

      <style>
      </style>


      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Напишите сообщение"
            autoComplete="off"
            required
            label='message'
            {...register('message')}
          />
        </div>

        <div className={styles.button}>
          <input type="submit"  value="Отправить" />
          <img src={sendImg} className={styles.sendImg}/>
        </div>
      </form>
    </div>
  );
};

export default Chat;