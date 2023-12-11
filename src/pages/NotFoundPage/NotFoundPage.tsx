import { NavLink } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <NavLink to="/" className="pathInscription">
        <div className="nav-logo">
          <img src="/_new/img/icons/home-logo.svg" alt="home-logo" />
        </div>
        <img
          src="/_new/img/icons/GrayArrowRight.svg"
          alt="arrowRight"
          className="pathInscription__arrowRight"
          style={{ transform: 'rotate(180deg)' }}
        />
        <p className="pathInscription__text">Back to Home Page</p>
      </NavLink>
      <h1 className="notFoundPage__text">Page not found</h1>
    </div>
  );
};
