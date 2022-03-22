import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

type Props = {
  favorite: string[],
  cart: string[],
};

export const Layout: React.FC<Props> = ({
  favorite,
  cart,
}) => (
  <>
    <Header
      favorite={favorite}
      cart={cart}
    />

    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </>
);
