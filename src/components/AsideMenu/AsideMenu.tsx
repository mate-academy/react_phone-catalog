import { Link } from 'react-router-dom';
import './AsideMenu.scss';
import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../PageContext';

export const AsideMenu: React.FC = () => {
  const { favItems, bucketItems } = useContext(ProductsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="aside-layout">
      <ul className="aside-links">
        <li>
          <Link to="/" className="aside-link">
            home
          </Link>
        </li>
        <li>
          <Link to="/phones" className="aside-link">
            phones
          </Link>
        </li>
        <li>
          <Link to="/tablets" className="aside-link">
            tablets
          </Link>
        </li>
        <li>
          <Link to="/accessories" className="aside-link">
            accessories
          </Link>
        </li>
      </ul>
      <ul className="aside-icons">
        <li className="aside-block">
          <Link to="/favorites" className="aside-icon">
            <img src="./uploadedImg/like.png"></img>
            {favItems.length > 0 && (
              <div className="show-items">{favItems.length}</div>
            )}
          </Link>
        </li>
        <li className="aside-block">
          <Link to="/bucket" className="aside-icon">
            <img src="./uploadedImg/shoppingBag.png"></img>
            {bucketItems.length > 0 && (
              <div className="show-items">{bucketItems.length}</div>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};
