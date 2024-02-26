import { Link } from 'react-router-dom';
import './Logo.scss';
import { goTop } from '../../helpers/goTop';

export const Logo = () => {
  return (
    <Link
      to="/"
      onClick={goTop}
    >
      <div className="logo" />
    </Link>
  );
};
