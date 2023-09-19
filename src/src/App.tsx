import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

export const App = () => (
  <>
    <div className="App">
      <Header />
      <Outlet />
    </div>

    {/* <footer className="footer">footer
    </footer> */}

  </>
);
