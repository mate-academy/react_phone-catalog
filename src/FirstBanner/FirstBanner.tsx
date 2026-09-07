import { Link } from 'react-router-dom';
import './FirstBanner.scss';

export const FirstBanner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <span className="banner-title">
          Now available <br /> in our store!
        </span>
        <span className="banner-span">be the first!</span>
        <Link
          to={'/phones/apple-iphone-14-pro-128gb-spaceblack'}
          className="banner-link"
        >
          order now
        </Link>
      </div>
      <Link
        to={'./img/phones/apple-iphone-14-pro-128gb-spaceblack'}
        className="banner-image"
      ></Link>
    </div>
  );
};
