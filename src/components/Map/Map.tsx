import { Link, useLocation } from 'react-router-dom';
import './Map.scss';

type Props = {
  name?: string;
};

export const Map: React.FC<Props> = ({ name }) => {
  const { pathname } = useLocation();
  const path = pathname.slice(1).split('/')[0];
  const normalizedMapText = path[0].toUpperCase() + path.slice(1);

  return (
    <div className="map">
      <Link to="/">
        <span className="icon icon--home"></span>
      </Link>

      <span className="icon icon--arrow-right--disabled" />

      {name ? (
        <div className="map__port">
          <Link to={`/${path}`} className="map__link">
            {normalizedMapText}
          </Link>

          <span className="icon icon--arrow-right--disabled" />

          <p className="map__text">{name}</p>
        </div>
      ) : (
        <p className="map__text">{normalizedMapText}</p>
      )}
    </div>
  );
};
