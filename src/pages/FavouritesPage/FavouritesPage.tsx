import './FavouritesPage.scss';

import { useAppSelector } from '../../helpers/hooks';
import { ProductItem } from '../../components/ProductItem';
import { BackButton } from '../../components/BackButton';

export const FavouritesPage: React.FC = () => {
  const favorites = useAppSelector(state => state.favorites);

  return (
    <section className="page__section favourites-page">
      <div className="favourites-page__container">
        <h1 className="favourites-page__title">
          Favourites page
        </h1>

        <div className="favourites-page__button-back">
          <BackButton />
        </div>

        {!favorites.length ? (
          <h2 className="favourites-page__notification">
            Products not found
          </h2>
        ) : (
          <ul className="favourites-page__list">
            {favorites.map(product => (
              <ProductItem
                key={product.itemId}
                product={product}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
