import Footer from './Footer/Footer';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import ToastNotification from '../UI/ToastNotification/ToastNotification';
import { useToastStore } from '../store/toastStore';

const Layout = () => {
  const { toasts } = useToastStore();

  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
        <div>
          {toasts.map(toast => (
            <ToastNotification
              key={toast.id}
              open={true}
              title={toast.message}
              description={toast.description || ''}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
