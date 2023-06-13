/* eslint-disable react/jsx-one-expression-per-line */
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartedProduct } from '../../components/CartContext';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../helpers/types/Product';

export const FavoritesPage = () => {
  const { favProducts } = useContext(CartedProduct);
  const totalFav = favProducts.length;

  return (
    <section className="fav-page">
      <div className="fav-page__container _container">
        <div className="page-navigation">
          <Link to="/" className="page-navigation__home-link" />
          <Link
            to="/favorites"
            className="page-navigation__current-page-link"
            style={{
              pointerEvents: 'none',
            }}
          >
            Favorites
          </Link>
        </div>

        <h1 className="fav-page__title _titles">Favorites</h1>

        <p className="fav-page__total total">
          {totalFav} model{totalFav > 1 ? 's' : ''}
        </p>

        { totalFav === 0 ? (
          <p>No products in Favorites</p>
        )
          : (
            <div
              className="fav-page__producst-container products-grid"
              data-cy="productList"
            >
              {favProducts.map((phone: Product) => (
                <Fragment key={phone.id}>
                  <ProductCard product={phone} />
                </Fragment>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};
