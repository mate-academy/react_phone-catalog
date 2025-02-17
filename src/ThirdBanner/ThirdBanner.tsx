import { Link } from 'react-router-dom';
import './ThirdBanner.scss';

export const ThirdBanner = () => {
  return (
    <div className="third-banner">
      <Link to={'/tablets'} className="third-banner-button">
        Check new Tablets
      </Link>
      <Link to={'/tablets'} className="third-banner-image"></Link>
    </div>
  );
};
