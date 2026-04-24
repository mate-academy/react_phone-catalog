import ProductCard from '../../ProductList/ProductCard/ProductCard';
import useAppContext from '../../../useAppContext';
import './FavoritesList.scss';

const FavoritesList = () => {
  const { favorites, baskets, setFavorites, setBaskets } = useAppContext();

  return (
    <>
      <p className="favorites-list__items--counter">{favorites.length} items</p>
      <div className="favorites-list">
        {favorites.length ? (
          favorites.map(product => (
            <ProductCard
              key={product.itemId}
              product={product}
              setFavorites={setFavorites}
              favorites={favorites}
              baskets={baskets}
              setBaskets={setBaskets}
            />
          ))
        ) : (
          <p className="favorites-list__items--counter--empty">
            No favouri items selected
          </p>
        )}
      </div>
    </>
  );
};

export default FavoritesList;
