import { useProducts } from 'context';
import { BreadCrumbs, ProductCard, Wrapper } from 'components';
import './Favourites.scss';

export const Favourites = () => {
  const { favourites } = useProducts();

  return (
    <div className="favourites">
      <Wrapper>
        <div className="favourites__path-container">
          <BreadCrumbs />
        </div>

        <h1 className="favourites__title">Favourites</h1>
        <p className="favourites__quantity">{`${favourites.length} items`}</p>

        {favourites && favourites.length > 0 && (
          <div className="favourites__list">
            {favourites.map(fav => (
              <ProductCard
                key={fav.id}
                product={fav}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};
