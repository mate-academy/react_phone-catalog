import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <>
    <Navbar />
    <div>
      <Outlet /> {/* This is where HomePage, PhonesPage etc will render */}
    </div>
  </>
);
