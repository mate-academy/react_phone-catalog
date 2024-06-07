import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
        <Toaster position="top-right" offset={80} richColors duration={1500} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
