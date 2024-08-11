import style from './Cell.module.scss';
import { useEffect, useState, memo, useLayoutEffect, useContext, useMemo, useRef } from 'react';
import X from '../../../../../../../assets/img/x.png';
import O from '../../../../../../../assets/img/o.png';
import { winContext } from '../../../../../Map';
function Cell(props) {
  const [check, setCheck] = useState(false);
  const [checked, setChecked] = useState(true);
  const [stateCell, setstateCell] = useState(props.Xcheck);
  const cellRef=useRef();
  const reset = useContext(winContext);
  
  useEffect(()=>{
    if (props.selected.row===false)
    {
      console.log("hehe");
    }
    else
    if (props.selected.row!==undefined)
    {

     handleClickCell();
    }
  },[props.selected])

  useLayoutEffect(() => {
    setstateCell(props.Xcheck);
  }, [check]);
  const reGame = useMemo(() => {
    if (reset === true) {
      setCheck(false);
      setChecked(true);
      setstateCell(props.Xcheck);
    }
  }, [reset]);
  const handleClickCell = () => {
    if (checked) {
      setCheck(!check);
      setChecked(false);
      props.send(!props.Xcheck, props.index);
    }
  };

  return (
    <>
      <div className={style.cell} onClick={handleClickCell} ref={cellRef}>
        {check && <img  src={stateCell ? X : O}></img>}
      </div>
    </>
  );
}

export default memo(Cell);
