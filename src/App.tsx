import { Outlet } from 'react-router-dom';
import './App.scss';
import { TopBar } from './components/TopBar';

export const App = () => {
  return (
    <>
      <TopBar />
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};
