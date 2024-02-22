// eslint-disable
/* eslint-disable */
import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useRef } from 'react';
import { Navigator } from './components/navigator/Navigator';

export const App = () => {
  const refForFooter = useRef<null | HTMLDivElement>(null);

  const show = () => {
    if (refForFooter.current) {
      refForFooter.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const location = useLocation()
  console.log(location ,'location');
  console.log(location.pathname === '/phones','location truth');


  return (
    <div className="App">
      <div ref={refForFooter} />
      <Navbar />
      <div className='commonPage-container'>
        {location.pathname !== '/' && <Navigator path={location.pathname} />}
        <Outlet />
      </div>
      <Footer onClick={show} />
    </div>
  );
};
