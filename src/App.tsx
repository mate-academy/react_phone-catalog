import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Main } from './components/main';
import { useContext } from 'react';
import { ContextApp } from './appContext/AppContext';

export const App = () => {
  const {app} = useContext(ContextApp)
  return (
    <div ref={app} className="app">
      <Header />
      <h1 className="app__title">Product Catalog</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        {/* <Route path='/phones' element={<Phones />} />
            <Route path='/tablets' element={<Tablets />} />
            <Route path='/accessories' element={<Accessories />} /> */}
      </Routes>
      <Outlet />
      <div className="app__separator"></div>
      <Footer />
    </div>
  );
};
