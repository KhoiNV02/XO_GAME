import chatIcon from '../../../../assets/img/send.png';
import style from './Text.module.scss';
import { useState, useRef,memo } from 'react';
function Text(props) {

  const textAreaRef = useRef();
  const [message, setMessage] = useState('');
  const handleSendMessage = (keyDown) => {
    if (keyDown.keyCode === 13) {
      try
      {
        keyDown.preventDefault();
      }
      catch(e)
      {

      }
      setMessage('');
      textAreaRef.current.focus();
      props.sendMessage(message);
    }
  };
  return (
    <div className={style.Text}>
      <textarea
      value={message}
        ref={textAreaRef}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          handleSendMessage(e);
        }}
      />
      <img src={chatIcon} onClick={()=>{
        const e={keyCode:13};
        handleSendMessage(e);
      }}/>
    </div>
  );
}

export default memo(Text);
