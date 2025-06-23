import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { TopBar } from '../TopBar';

export const HomePage = () => {
  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
};
