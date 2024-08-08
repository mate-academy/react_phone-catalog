import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './FavouritePage.scss';

import { ArrowRightGrayImg, homeImg } from '../../utils/indes';
import { StateProduct } from '../../context/ProductContext';
import Product from '../../components/Product/Product';

const FavouritePage: React.FC = () => {
  const { pathname } = useLocation();
  const { localStorage } = useContext(StateProduct);

  const navigationPath = pathname.slice(1);

  const products = [...localStorage].filter(
    product => !!product.addedToFavourites,
  );

  return (
    <div className="favouritePage">
      <div className="favouritePage__block">
        <div className="favouritePage__navigation">
          <Link to="/">
            <img src={homeImg} alt="Home" />
          </Link>
          <img src={ArrowRightGrayImg} alt="ArrowRight" />
          <p className="favouritePage__navigation-title">{navigationPath}</p>
        </div>

        {products.length ? (
          <>
            <div className="favouritePage__top">
              <h1 className="favouritePage__top-title">Favourites</h1>
              <p className="favouritePage__top-count">
                {products.length === 1 ? '1 item' : `${products.length} items`}
              </p>
            </div>

            <div className="favouritePage__contant">
              {products.map(product => (
                <div
                  key={product.id}
                  className="favouritePage__contant-product"
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1 className="favouritePage__message">
            {`You didn't add any products to favourites`}
          </h1>
        )}
      </div>
    </div>
  );
};

export default FavouritePage;
