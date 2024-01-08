import {
  Link,
  useSearchParams,
} from 'react-router-dom';

import { ProductCard } from '../../components/ProductCard';
import { NoResults } from '../../components/NoResults';
import { SearchParamsName } from '../../helpers/searchHelper';

import './FavouritesPage.scss';
import { useAppSelector } from '../../store/hooks';

type Props = {
};

export const FavouritesPage: React.FC<Props> = (
) => {
  const { items: favorites } = useAppSelector(state => state.favorites);
  const [searchParams] = useSearchParams();
  const query = searchParams.get(SearchParamsName.QUERY) || '';

  const preparedQuery = query.trim().toLowerCase();
  const visibleProducts = [...favorites]
    .filter(item => item.name.includes(preparedQuery));

  return (
    <div
      data-cy="productList"
      className="FavouritesPage
      FavouritesPage__container
      page__container"
    >
      <div className="FavouritesPage__top">
        <Link to="/" className="FavouritesPage__link icon--home" />
        <i className="FavouritesPage__icon icon--arrow-right" />
        <p className="FavouritesPage__link__title">Favourites</p>
      </div>

      <h1 className="FavouritesPage__title">Favourites</h1>
      <p className="FavouritesPage__info">{`${favorites.length} items`}</p>

      {visibleProducts.length ? (
        <div className="FavouritesPage__grid">
          {
            visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
      ) : (
        <div className="FavouritesPage__error">
          <NoResults title="Favourites not found" />
        </div>
      )}
    </div>
  );
};
