import { Outlet } from 'react-router-dom';
import { HeaderRegion } from './shared/HeaderRegion';
import Footer from './shared/Footer/Footer';

export const App = () => {
  return (
    <>
      <HeaderRegion />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};
