import './Menu.scss';
import { Header } from '../../Header';
//import { NavList } from '../Navigation/components/NavList';
import { Navigation } from '../Navigation/Navigation';

export const Menu: React.FC = () => {
  return (
    <aside className="menu" style={{ overflow: 'hidden' }}>
      <Header />
      <Navigation className="menu__nav" />
    </aside>
  );
};
