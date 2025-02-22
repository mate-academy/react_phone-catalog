import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => (
  <Link to="/" className="logo">
    <div className="logo__box">
      <p>Nice</p>
      <img src="/img/icons/favicon.png" alt="img logo" className="icon__logo" />
    </div>
    <p>Gadgets</p>
  </Link>
);
