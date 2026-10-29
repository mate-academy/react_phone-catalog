import './Path.scss';
import { Link, useLocation } from 'react-router-dom';
import HomeLogo from '../../assets/icons/Home_icon.png';
import NextIcon from '../../assets/icons/next_icon.png';

export const Path = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <div className="Path ">
      <Link to="/" className="Path-homeLink">
        <img
          src={HomeLogo}
          alt="Home logo"
          className="Path-homeLogo Path-icon"
        />
      </Link>

      {pathnames.map((pathName, index) => {
        const currentPath = `/${pathnames.slice(0, index + 1).join('/')}`;
        const formattedName =
          pathName.charAt(0).toUpperCase() + pathName.slice(1);

        return (
          <div key={currentPath} className="Path-item">
            <img src={NextIcon} alt="/" className="Path-next Path-icon" />
            <Link to={currentPath} className="Path-link">
              <span className="Path-name">{formattedName}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
