import './NavigationInPage.scss';
import { Link, useLocation } from 'react-router-dom';

export const NavigationInPage = () => {
  const location = useLocation();
  const fullLocation = location.pathname.split('/').filter(Boolean);

  return (
    <div className="location">
      <Link className="home-link" to="/">
        <img src="/imgForProject/icon/Home.png" alt="Home" />
      </Link>
      {fullLocation.map((nameOfPage, index) => {
        const path = '/' + fullLocation.slice(0, index + 1).join('/');

        return (
          <div key={index} className="step__of_nav">
            <img
              className="icon__next-location"
              src="/imgForProject/icon/Chevron_right-location.png"
              alt="Chevron right"
            />
            <span className="name-of__location">
              <Link className="link_on__page" to={path}>
                {nameOfPage}
              </Link>
            </span>
          </div>
        );
      })}
    </div>
  );
};
