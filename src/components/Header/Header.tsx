import { NavLink } from 'react-router-dom';
import { PageNavList } from '../PageNavList/PageNavList';

export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="logo">
          LOGO
        </NavLink>
        <PageNavList />
      </nav>
    </header>
  );
};
