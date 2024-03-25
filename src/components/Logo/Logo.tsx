import { NavLink } from 'react-router-dom';
import './logo.scss';
import { scrollToTop } from '../../helpers/scrollToTop';

export const Logo = () => {
  return (
    <NavLink
      to="/"
      className="logo icon"
      onClick={scrollToTop}
    />
  );
};
