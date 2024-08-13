import { useState } from 'react';
import { Desktop } from './utils/DesktopContext';
import { Tablet } from './utils/TabletContext';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const [onTablet, setOnTablet] = useState(window.outerWidth >= 640);
  const [onDesktop, setOnDesktop] = useState(window.outerWidth >= 1200);

  const handleSetOnDevice = () => {
    if (window.outerWidth >= 1200) {
      setOnDesktop(true);
      setOnTablet(false);
    } else if (window.outerWidth >= 640) {
      setOnDesktop(false);
      setOnTablet(true);
    } else {
      setOnDesktop(false);
      setOnTablet(false);
    }
  };

  window.addEventListener('resize', handleSetOnDevice);

  return (
    <div className="App">
      <Desktop.Provider value={onDesktop}>
        <Tablet.Provider value={onTablet}>
          <Outlet />
        </Tablet.Provider>
      </Desktop.Provider>
    </div>
  );
};
