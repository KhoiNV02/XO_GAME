import style from './bodyMap.module.scss';
import Row from './components/row/Row';
import { useEffect, useState, useContext, useMemo } from 'react';
import { winContext } from '../../Map';
import { socketContext } from '../../../../App';
function BodyMap({ func }) {
  const socket=useContext(socketContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [ban,setBan]=useState(true);
  const [id,setID]=useState();
  socket.on("sendId",(id)=>{
   setID(id);
  });
  socket.on("Start",()=>{
    setBan(false);
  })
  socket.on("handleCheckIndex",(index)=>{
    setSelectedRow(index.row-1); 
    setSelectedColumn(index.column-1); 

    if (id===index.id)
   {
    setBan(false);
   }
   else
   if (id!==index.id)
   {setBan(true);
  }
  })
  const [map, setMap] = useState([
    [4, 4, 4],
    [4, 4, 4],
    [4, 4, 4],
  ]);
  const Rows = [1, 2, 3];
  const [winner, setWinner] = useState('No');
  const [Xcheck, setXcheck] = useState(false);
  const reset = useContext(winContext);
  const reGame = useMemo(() => {
    if (reset === true) {
      setWinner('No');
      setMap([
        [4, 4, 4],
        [4, 4, 4],
        [4, 4, 4],
      ]);
      setXcheck(false);
    setSelectedColumn(null);
    setSelectedRow(null);
    }

  }, [reset]);
  const checkWin = (res) => {
    let s2 = map[0][2] + map[1][1] + map[2][0];
    let s1 = map[1][1] + map[2][2] + map[0][0];
    let end = false;
    if (s1 === 3) {
      setWinner(true);
      end = true;
    } else if (s1 === 0) {
      setWinner(false);
      end = true;
    } else {
      if (s2 === 3) {
        setWinner(true);
        end = true;
      } else if (s2 === 0) {
        setWinner(false);
        end = true;
      }
    }
    for (var i = 0; i < 3; i++) {
      let s = 0;

      for (var j = 0; j < 3; j++) s += map[i][j];
      if (s === 3) {
        setWinner(true);
        end = true;
        break;
      } else if (s === 0) {
        setWinner(false);
        end = true;
        break;
      }
    }
    for (var i = 0; i < 3; i++) {
      let s = 0;

      for (var j = 0; j < 3; j++) s += map[j][i];
      if (s === 3) {
        setWinner(true);
        end = true;
        break;
      } else if (s === 0) {
        setWinner(false);
        end = true;
        break;
      }
    }
    if (end===false)
    {
      let s = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        s += map[i][j];
      }
    }
    if (s === 5) {
      setWinner('No2');
    }
    }
    res(end);
  };
  useEffect(() => {
    func(winner);
    setMap([
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
    ]);
  }, [winner]);
  function checkEnd() {
    
  }
  useEffect(() => {
    const promise = new Promise((res, rej) => {
      checkWin(res);
    });
    promise.then((res) => {
      if (res === false) checkEnd();
    });
  });

  const handleSend = (mes, row, column) => {
    socket.emit("sendIndex",{row,column,id});
    map[row - 1][column - 1] = mes ? 1 : 0;
    setBan(!ban);
    setXcheck(!Xcheck);
  };

  return (
    <>
      <div className={style.bodyMap}>

        {Rows.map((item, index) => {
          return <Row key={index} index={item} Xcheck={Xcheck} send={handleSend} selected={index === selectedRow ? {row:selectedRow,column:selectedColumn}: false} ></Row>;
        })}

      {
     ban&&<div className={style.Lock}>
      </div>
          }
      </div>
     
    </>
  );
}

export default BodyMap;
