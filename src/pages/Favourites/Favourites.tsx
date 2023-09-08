import { PathDisplay, Wrapper } from '../../components';
import { ProductCard } from '../../components/ProductCard';
import { useProducts } from '../../context';
import './Favourites.scss';

export const Favourites = () => {
  const { favourites } = useProducts();

  return (
    <div className="favourites">
      <Wrapper>
        <div className="favourites__path-container">
          <PathDisplay />
        </div>

        <h1 className="favourites__title">Favourites</h1>
        <p className="favourites__quantity">{`${favourites.length} items`}</p>

        {favourites && favourites.length > 0 && (
          <div className="favourites__list">
            {favourites.map(fav => (
              <ProductCard product={fav} />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};
