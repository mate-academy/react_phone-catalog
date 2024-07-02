import './Favourites.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import { ProductList } from '../../components/ProductList';
import { useAppContext } from '../../store/store';

export const FavouritePage = () => {
  const {
    state: { favourites },
  } = useAppContext();

  return (
    <div className="favourites">
      <Breadcrumbs />

      <div className="products__info">
        <h1 className="favourites__title">Favourites</h1>
        <div className="favourites__amount">{`${favourites.length} models`}</div>
      </div>

      {!favourites.length ? (
        <div className="favourites--empty" />
      ) : (
        <ProductList products={favourites} />
      )}
    </div>
  );
};
