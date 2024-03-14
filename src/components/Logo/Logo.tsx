import { Link } from 'react-router-dom';
import { goTop } from '../../helpers/goTop';
import './Logo.scss';

export const Logo = () => {
  return (
    <Link to="/" onClick={goTop}>
      <div className="logo" />
    </Link>
  );
};
