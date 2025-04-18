/* eslint-disable @typescript-eslint/indent */
import classNames from 'classnames';
import { Card } from '../Card';
import { CategoryHeader } from '../CategoryHeader';
import { NotFoundProduct } from '../NotFoundProduct';
import './Favorites.scss';
import { useFavorites } from './FavoritesContext';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <section
      className={classNames('favorites', {
        'favorites--not-found': favorites.length === 0,
      })}
    >
      {favorites.length === 0 ? (
        <NotFoundProduct />
      ) : (
        <>
          <CategoryHeader category={'favorites'} />

          <div className="favorites__text">
            <h2 className="favorites__text-title text text__title">
              Favorites
            </h2>

            <p className="favorites__text-description text text__body">
              {favorites.length} items
            </p>
          </div>

          <div className="favorites__list">
            {favorites.map(product =>
              product.category &&
              (product.category === 'phones' ||
                product.category === 'tablets' ||
                product.category === 'accessories') ? (
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={
                    'images' in product ? product.images[0] : product.image
                  }
                  price={
                    'priceDiscount' in product
                      ? product.priceDiscount
                      : product.price
                  }
                  fullPrice={
                    'priceRegular' in product
                      ? product.priceRegular
                      : product.fullPrice
                  }
                  screen={product.screen}
                  capacity={product.capacity}
                  ram={product.ram}
                  category={product.category}
                />
              ) : null,
            )}
          </div>
        </>
      )}
    </section>
  );
};
