import { Link, useLocation } from 'react-router-dom';
import './Path.scss';

export const Path = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/').filter(name => name !== '');

  return (
    <div className="path">
      <Link to="/">
        <div className="icon icon--home" />
      </Link>

      {pathParts.map((part, index, arr) => (
        <div className="path__part" key={part}>
          <div className="icon icon--arrow-right-disabled" />

          {arr.length - 1 === index
            ? (
              <p className="path__text">
                {part[0].toUpperCase() + part.slice(1)}
              </p>
            )
            : (
              <Link to={`/${part}`} className="path__link">
                {part[0].toUpperCase() + part.slice(1)}
              </Link>
            )}
        </div>
      ))}
    </div>
  );
};
