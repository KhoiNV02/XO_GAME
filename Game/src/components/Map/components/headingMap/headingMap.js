import style from './headingMap.module.scss';
import dog from '../../../../assets/img/dog.png';
import dog2 from '../../../../assets/img/anh.png';
import clsx from 'clsx';

function HeadingMap(props) {
  const score={S1:props.S1,S2:props.S2}
  return (
    <>
      <div className={style.headingMap}>
        <div className={style.User1}>
          <div className={style.Image}>
            <img src={dog}></img>
          </div>
          <div className={style.Name}>
            <p>RoadJons</p>
          </div>
        </div>
        <div className={style.Score}>
          <p>
            {score.S1} - {score.S2}
          </p>
          <p>VS</p>
        </div>
        <div className={clsx(style.User1, style.User2)}>
          <div className={style.Name}>
            <p>Amber</p>
          </div>

          <div className={style.Image}>
            <img src={dog2}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadingMap;
