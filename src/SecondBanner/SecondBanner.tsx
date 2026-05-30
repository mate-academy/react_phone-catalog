import { Link } from 'react-router-dom';
import './SecondBanner.scss';
export const SecondBanner = () => {
  return (
    <div className="second-banner">
      <Link to={'/phones'} className="second-banner-image"></Link>
      <div className="second-banner-text">
        <span className="second-banner-title">New colors!</span>
        <Link to={'/phones'} className="second-banner-button">
          Have a look
        </Link>
      </div>
    </div>
  );
};
