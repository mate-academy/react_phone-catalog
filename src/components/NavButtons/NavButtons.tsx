import { Link } from 'react-router-dom';
import './NavButtons.scss';
// import { Toggler } from '../Elements/Toggler/Toggler';

export const NavButtons = () => {
  return (
    <div className="nav__buttons">
      {/* <Toggler /> */}
      <Link
        to={{
          pathname: '/favourites',
        }}
        // state={{ from: location.pathname }}
        className="nav__button"
      >
        <div className="icon icon--favourite">
          <div className="counter">{1}</div>
        </div>
      </Link>
      <Link
        to={{
          pathname: '/cart',
        }}
        // state={{ from: location.pathname }}
        className="nav__button"
      >
        <div className="icon icon--cart">
          <div className="counter">{1}</div>
        </div>
      </Link>

      {/* <button className="nav__button icon icon--menu" onClick={() => {}} /> */}
    </div>
  );
};
