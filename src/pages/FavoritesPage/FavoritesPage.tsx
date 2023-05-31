import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../cart-context';
import { ProductList } from '../../components/ProductList';
import { Product } from '../../types/Product';

import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import {
  ReactComponent as IconArrowRight,
} from '../../images/icons/arrow_right.svg';
import { ReactComponent as IconHome } from '../../images/icons/home.svg';

export const FavouritesPage: React.FC = () => {
  const { favouritesItems } = useContext(ShopContext);

  const favourites = useMemo(() => {
    return favouritesItems
      .map((item) => item.product)
      .filter((product): product is Product => product !== null);
  }, [favouritesItems]);

  const favouritesAmount = useMemo(() => favourites.length, [favourites]);

  if (favourites.length === 0) {
    return (
      <ErrorMessage
        message="You haven't added any products to your favorites yet."
      />
    );
  }

  return (
    <>
      <div className="product-page">
        <div className="product-page__container">
          <div className="path">
            <Link to="/" className="path__link">
              <IconHome />
            </Link>

            <IconArrowRight className="path__arrow" />

            <Link to="/phones" className="path__link">
              <div className="path__text">Favourites</div>
            </Link>
          </div>

          <h1 className="product-page__title">Favourites</h1>

          <div className="product-page__amount">
            {favouritesAmount === 1 ? '1 item' : `${favouritesAmount} items`}
          </div>

          <ProductList products={favourites} />
        </div>
      </div>
    </>
  );
};
