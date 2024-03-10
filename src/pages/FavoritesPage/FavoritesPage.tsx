import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import './index.scss';

import { StateStore } from '../../store/StoreContext';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { ICONS } from '../../images';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const FavoritesPage = () => {
  const { localStorage } = useContext(StateStore);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const favoriteProducts = [...localStorage].filter(
    product => !!product.addedToFavorites,
  );

  const [filteredProducts] = getFilteredProducts(favoriteProducts, query);

  return (
    <div className="favoritesPage">
      <section className="favoritesPage__nav">
        <Link to="/" className="favoritesPage__nav__link">
          <img src={ICONS.home} alt="Home" />
        </Link>
        <img src={ICONS.arrowRightDisabled} alt="Arrow right" />
        <p className="favoritesPage__nav__path text">Favourites</p>
      </section>

      {!favoriteProducts.length && (
        <h1>You have not added any products to your cart</h1>
      )}

      {!!favoriteProducts.length && !!filteredProducts.length && (
        <>
          <section className="favoritesPage__header">
            <h1>Favourites</h1>

            <p className="favoritesPage__header__counter text">
              {filteredProducts.length === 1
                ? `${filteredProducts.length} item`
                : `${filteredProducts.length} items`}
            </p>
          </section>

          <section className="favoritesPage__content">
            <ProductsList products={filteredProducts} />
          </section>
        </>
      )}

      {!!favoriteProducts.length && !filteredProducts.length && (
        <h1>No results according to your search</h1>
      )}
    </div>
  );
};
