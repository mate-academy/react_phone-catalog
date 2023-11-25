import { useLocation } from 'react-router-dom';
import './style.scss';

export const MobileHome = () => {
  const location = useLocation();
  const pathname = location.pathname.split('/');

  return (
    <div className="mob-content">
      <div className="mobiles">
        <a href="/">
          <img
            className="mobiles__image"
            src="./img/icons/Home.png"
            alt="home"
          />
        </a>
        <img
          className="mobiles__right"
          src="./img/icons/right.svg"
          alt="right"
        />
        <p className="mobiles__text">{pathname}</p>
      </div>
    </div>
  );
};

export default MobileHome;
