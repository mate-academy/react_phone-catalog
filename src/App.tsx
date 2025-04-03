import { useState } from 'react';
import './App.scss';
import 'swiper/css'
import { SideBar } from './components/SideBar/SideBar';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const [activeAside, setActiveAside] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [disabledIds, setDisabledIds] = useState<number[]>([0, 2]);

  return (
    <div className="App">
    <div className={classNames("SideBar", {
            'activeSideBar': activeAside,
            'inactiveSideBar': !activeAside,
          })}>
            <SideBar setActiveAside={setActiveAside}/>
          </div>
      <Outlet context={{setActiveAside, width, setWidth, disabledIds, setDisabledIds}} />
    </div>
  );
};
