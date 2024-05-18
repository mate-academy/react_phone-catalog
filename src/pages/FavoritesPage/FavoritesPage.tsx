import { ProductList } from '../../Components/ProductList/ProductList';
import { useContext } from 'react';
import { ProductContext } from '../../helper/ProductContext';
import { Breadcrumbs } from '../../Components/Breadcrumbs/Breadcrumbs';
import './Favorites.scss';

export const FavoritesPage = () => {
  const { favorites } = useContext(ProductContext);

  return favorites.length ? (
    <div className="favoritesPage">
      <Breadcrumbs device="favorites" />
      <h1 className="favoritesPage__h1">Favorites</h1>
      <div className="favoritesPage__amount">{`${favorites.length} items`}</div>

      <div className="productList" data-cy="productList">
        <ProductList products={favorites} />
      </div>
    </div>
  ) : (
    <div className="favoritesPage__empty">Your favorites is empty</div>
  );
};
