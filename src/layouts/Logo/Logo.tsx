import './Logo.scss';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="Logo">
      <Link to="/">
        <img src="img/Logo.svg" alt="Logo" className="Logo__img" />
      </Link>
    </div>
  );
}
