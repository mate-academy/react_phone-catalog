import './Logo.scss';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className="wrapper">
      <Link to="/" className="logo" />
    </div>
  );
};
