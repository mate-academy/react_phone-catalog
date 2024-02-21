// eslint-disable
/* eslint-disable */
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useRef } from 'react';

export const App = () => {
  const refForFooter = useRef<null | HTMLDivElement>(null);

  const show = () => {
    if (refForFooter.current) {
      refForFooter.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="App">
      <div ref={refForFooter} />
      <Navbar />
      <div className='commonPage-container'>
        <Outlet />
      </div>
      <Footer onClick={show} />
    </div>
  );
};
