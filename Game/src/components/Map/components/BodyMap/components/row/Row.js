import { useEffect, useState } from 'react';
import style from '../Row.module.scss';

import Cell from './cell/cell';
function Row(props) {
  const [selectedColumn, setSelectedColumn] = useState(null);
useEffect(()=>{
  if (props.selected.row===false)
  {
    console.log("hehe");
  }
  else
  setSelectedColumn(props.selected.column);
},[props.selected])
  const Cells = [1, 2, 3];
  const Xcheck = props.Xcheck;
  const handleCheck = (mes, index) => {
    props.send(mes,props.index,index);
  };
  return (
    <>
      <div className={style.row}>
        {Cells.map((item, index) => {
          return <Cell key={index} index={item} Xcheck={Xcheck} send={handleCheck} selected={index === selectedColumn? {row:props.selected.row,column:selectedColumn}: false}></Cell>;
        })}
      </div>
    </>
  );
}

export default Row;
