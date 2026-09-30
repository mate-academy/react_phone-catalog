import { useFavorite } from '../../context/FavoriteContext';
import { ProductList } from '../../Product/ProductList/ProductList';
import './Favorites.scss';

export const Favorites = () => {
  const { favorites } = useFavorite();

  const products = favorites.map(item => item.product);

  return (
    <div className="favorites">
      <h2 className="favorites__title">Favourites</h2>

      {products.length > 0 ? (
        <div className="favorites__items">
          <p className="favorites__count">
            {products.length} Items
          </p>
          <div className="favorites__content">
            <ProductList products={products} />
          </div>
        </div>
      ) : (
        <p className="favorites__subTitle">
          There are no favorites yet
        </p>
      )}
    </div>
  );
};
