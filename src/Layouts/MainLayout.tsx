import { Outlet } from 'react-router-dom';
import Header from '../Components/header/header';
import Footer from '../Components/footer/footer';
import { LikeProvider } from '../Components/Likecontext/likecontext';
import { FavoriteProvider } from '../Components/favoritescontext/FavoriteContext';
import { CartProvider } from '../Components/cartcontext/cartcontext';

export const MainLayout = () => (
  <>
    <FavoriteProvider>
      <LikeProvider>
        <CartProvider>
          <Header />
          <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Outlet />
          </main>
          <Footer />
        </CartProvider>
      </LikeProvider>
    </FavoriteProvider>
  </>
);

export default MainLayout;
