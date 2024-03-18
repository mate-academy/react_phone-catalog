import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';

import { ProductList } from '../../ProductList/ProductList';

// import { Product } from '../../../Types/Product';
import homeIcon from '../../../img/Home.png';
import arrowRightGrey from '../../../img/arrowRight.png';
import { ProductsContext } from '../../ProductsContext/ProductsContext';

export const Favorites: React.FC = () => {
  const location = useLocation().pathname.slice(1);
  const { favoriteProducts } = useContext(ProductsContext);

  const updateCurrentLocation =
    location.slice(0, 1).toLocaleUpperCase() + location.slice(1);

  return (
    <>
      <div className="product__navigation">
        <NavLink to="/">
          <img src={homeIcon} alt="home-icon" />
        </NavLink>
        <img src={arrowRightGrey} alt="arrow-icon" />
        <h1 className="product__navigation-path">{updateCurrentLocation}</h1>
      </div>

      <div className="product__wrapper">
        {favoriteProducts.length === 0 ? (
          <h2 className="product__empty title">Your favorite list is empty</h2>
        ) : (
          <>
            <h1 className="product__title title">Favorites</h1>
            <ProductList products={favoriteProducts} />
          </>
        )}
      </div>
    </>
  );
};
