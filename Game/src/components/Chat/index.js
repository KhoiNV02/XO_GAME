import clsx from 'clsx';
import style from '../Chat/Chat.module.scss';

import ChatText from './components/ChatText/ChatText';
import Text from './components/Text/Text';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { socketContext } from '../../App';

function Chat() {
  const [id,setID]=useState();
  const [message, setMessage] = useState([]);
  const socket=useContext(socketContext);
  console.log(message);
  socket.on('sendId',(id)=>{
 setID(id)
    socket.on('getMessage',(obj)=>{
      setMessage((prevMessages) => [...prevMessages, obj]);
    })
  })   
  const getMessage = (messageFromText) => {
    socket.emit("sendMessage",messageFromText);
  };

  return (
    <div className={style.container}>
      <div className={style.child}>
        <div className={style.title}>
          <div>
            <h1>Chat</h1>
          </div>
          <hr></hr>
        </div>
        <div className={style.chatContent}>
          {message.map((item, index) => {
            return (
              <div key={index}>
                { <ChatText check={id!==item.id} message={item.mes}></ChatText>}
              </div>
            );
          })}
        </div>
        <Text sendMessage={getMessage}></Text>
      </div>
    </div>
  );
}
export default Chat;
