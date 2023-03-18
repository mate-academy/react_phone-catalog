import { Link, useLocation } from 'react-router-dom';
import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './way.scss';

export const Way = () => {
  const location = useLocation();

  const renderString = () => {
    const str = location.pathname.replace('/', '');

    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <div className="wrapper-way">
      <NavLinkCustom way="/" classStyle="home-link">
        <img src="./img/icons/Home.png" alt="home" />
      </NavLinkCustom>
      <img src="../../img/icons/Right.png" alt="right" />
      <Link to={location.pathname} className="page">
        {renderString()}
        {/*         <img src="../../img/icons/Right.png" alt="right" /> */}
      </Link>
      {/*       <span>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</span> */}
    </div>
  );
};
