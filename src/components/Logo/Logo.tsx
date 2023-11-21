import { Link } from 'react-router-dom';
import './style.scss';

export const Logo = () => (
  <div className="logo">
    <Link to="/" className="logo__link" aria-label="logo" />
  </div>
);
