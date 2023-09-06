import { Link, useLocation } from 'react-router-dom';
import './PathDisplay.scss';

export const PathDisplay = () => {
  const location = useLocation().pathname.split('/');

  return (
    <div className="path">
      <Link
        to="/"
        className="path__home-icon"
      >
        <img alt="home" src="./img/icons/home.svg" />
      </Link>

      {location.map(loco => (
        <Link
          key={loco}
          className="path__link"
          to={`/${loco}`}
        >
          {loco}
        </Link>
      ))}
    </div>
  );
};
