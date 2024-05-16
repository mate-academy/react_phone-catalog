import { Link } from 'react-router-dom';
import './FavouritePage.scss';
import { ProductCard } from '../../components/ProductCard';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

export const FavouritePage = () => {
  const { favouriteProducts } = useContext(StoreContext);

  return (
    <div className="favourite-page">
      <div className="history-path">
        <Link to="/">
          <div className="history-path__icon history-path__icon--home" />
        </Link>
        <div className="history-path__icon history-path__icon--arrow" />
        <Link to="favouritea" className="history-path__page-name">
          Favourites
        </Link>
      </div>

      <h1 className="favourite-title">Favourites</h1>

      <div className="favourite-amount">{`${favouriteProducts.length} models`}</div>

      {!!!favouriteProducts.length ? (
        <div className="favourite-page--is-empty" />
      ) : (
        <div className="products-cards">
          {favouriteProducts.map(product => (
            <ProductCard key={product.id} isDiscount product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
