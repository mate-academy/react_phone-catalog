/* eslint-disable */
import { Outlet, useLocation, useParams } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useRef } from 'react';
import { BreadCrumbs } from './components/BreadCrumbs/BreadCrumbs';

export const App = () => {
  const refForFooter = useRef<null | HTMLDivElement>(null);

  const show = () => {
    if (refForFooter.current) {
      refForFooter.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const location = useLocation();
  const { productId } = useParams();
  console.log(productId);
  

  return (
    <div className="App">
      <div ref={refForFooter} />
      <Navbar />
      <div className='commonPage-container '>
        {location.pathname !== '/' && <div className={
          productId === undefined ? 'breadcrumbs' : ''
        }><BreadCrumbs path={location.pathname} /></div>}
        <Outlet />
      </div>
      <Footer onClick={show} />
    </div>
  );
};
