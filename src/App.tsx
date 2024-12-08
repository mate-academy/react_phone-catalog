import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="box-border bg-white font-mont-regular">
      <NavBar />

      <div className="m-auto min-h-screen max-w-[1200px]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
