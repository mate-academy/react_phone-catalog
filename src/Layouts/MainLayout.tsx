import { Outlet } from 'react-router-dom';
import { Header } from '../Components/header/header';
import Footer from '../Components/footer/footer';
import { CartProvider } from '../Components/cartcontext/cartcontext';

export const MainLayout = () => (
  <>
    <CartProvider>
      <Header />
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '100vh',
      }}
      >
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  </>
);

export default MainLayout;
