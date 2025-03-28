import { useState } from 'react';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { SideBarPage } from './modules/SideBarPage';
import 'swiper/css'

export const App = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <div className="App">
      { sideBarVisible && (<SideBarPage />)}
      <HomePage />
    </div>
  );
};
