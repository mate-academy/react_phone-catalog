import { useGlobalState } from '../../hooks/hooks';
import { ProductCard } from '../../components/ProductCard';
import './FavouritesPage.scss';
import '../../styles/container.scss';

export const FavouritesPage = () => {
  const { favourites } = useGlobalState();

  return (
    <div className="favourites">
      <div className="container">
        <div className="favourites__content">
          <div className="favourites__nav"></div>
          <h2 className="favourites__title">Favourites</h2>
          <p className="favourites__count">{`${favourites.length} ${favourites.length === 1 ? 'item' : 'items'}`}</p>
          <div className="favourites__container">
            {favourites.map(product => (
              <div className="favourites__product" key={product.itemId}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
