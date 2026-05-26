import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Menu } from '../Header/components/Menu';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export const Layout = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  return (
    <div>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>{isMenuOpen ? <Menu /> : <Outlet />}</main>
      <Footer />
    </div>
  );
};
