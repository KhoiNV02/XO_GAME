import Chat from '../../components/Chat';
import style from '../Home/Home.module.scss';
import Map from '../../components/Map/Map'
import { useContext,useEffect,useRef, useState } from 'react';
import { socketContext } from '../../App';
import sound from "../../assets/sound/gamemusic.mp3"
import loa2 from "../../assets/img/Loa.gif"
import loa1 from "../../assets/img/Turn.png"
import hand from "../../assets/img/Here.gif"
function Home() {
  const audioRef=useRef();
  const socket=useContext(socketContext);
  const [loa,setLoa]=useState(true);
  socket.emit("createRoom",0);
  socket.on("reject",()=>{
    alert("bạn không thể truy cập room hiện tại đã đủ người chơi");
    window.location.reload();
  })
  socket.on("F5",()=>{
    alert("đối thủ của bạn đã thoát, tiến hành reload");
    window.location.reload();
  })

const click=()=>{
  audioRef.current.play();
  setLoa(false);
}
  return (
    <>
    <audio src={sound} ref={audioRef} />
      <div className={style.backGround}>
        <div className={style.containerMap}>
          <div className={style.Map}>
            <Map></Map>
          </div>
          <Chat></Chat>
        </div>
        {
          loa&& 
          <>
           <img src={hand} className={style.Hand}></img>
          <img src={loa1} className={style.Loa}  onClick={click}></img>
          </>
}
      </div>
    </>
  );
}

export default Home;
