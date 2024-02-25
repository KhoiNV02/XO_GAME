// import Increase from './UseState/Increase.js'
// import Content from './Content';
import { Fragment, useState,createContext } from 'react';
import './components/GlobalStyles/index';
import GlobalStyles from './components/GlobalStyles/index';
import { Link, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout';
import io from 'socket.io-client';
// import CountDown from './countDown';

export const socketContext = createContext();
function App() {
  const [show, setShow] = useState(false);
  const socket = io('https://tic-tac-toe-gs8t.onrender.com');
  return (

    <>
    <socketContext.Provider value={socket}>
      <Routes>
        
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
        </socketContext.Provider>
    </>
  );
}

export default App;
