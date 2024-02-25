import style from './Map.module.scss';
import BodyMap from './components/BodyMap/bodyMap';
import HeadingMap from './components/headingMap/headingMap';
import { useState, createContext} from 'react';
export const winContext = createContext();
function Map() {

  const [score, setScore] = useState({ S1: 0, S2: 0 });
  const [resetPoint, setResetPoint] = useState(false);
  const alertWinner = (win) => {
    if (win === true) {
      alert('X win');
      setScore({
        S1: score.S1 + 1,
        S2: score.S2,
      });
      setResetPoint(true);
    } else if (win === false) {
      alert('O Win');
      setScore({
        S1: score.S1,
        S2: score.S2 + 1,
      });
      setResetPoint(true);
    } else if (win === 'No2') {
      alert('Không một ai chiến thắng');
      setResetPoint(true);
    } else {
      setResetPoint(false);
    }
  };
  return (
    <winContext.Provider value={resetPoint}>
      <>
        <HeadingMap S1={score.S1} S2={score.S2}></HeadingMap>
        <BodyMap func={alertWinner}> </BodyMap>
      </>
    </winContext.Provider>
  );
}

export default Map;
