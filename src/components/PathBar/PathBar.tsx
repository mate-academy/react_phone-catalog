import { Link, useLocation } from 'react-router-dom';
import './PathBar.scss';

export const PathBar = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathParts = path.split('/').filter(p => p !== '');

  return (
    <div className="path-bar">
      <Link
        to="/"
      >
        <i className="icon icon--home" />
      </Link>

      {pathParts.map(part => {
        const text = part[0].toUpperCase() + part.slice(1);

        return (
          <div
            key={part}
            className="path-bar__part"
          >
            <i className="icon icon--arrow-right-grey" />

            {pathParts[pathParts.length - 1] === part
              ? (<p className="path-bar__text">{text}</p>)
              : (
                <Link className="path-bar__link" to={`/${part}`}>
                  {text}
                </Link>
              )}
          </div>
        );
      })}
    </div>
  );
};
