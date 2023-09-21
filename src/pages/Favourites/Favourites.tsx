import { useProducts } from 'context';
import { BreadCrumbs, ProductCard, Wrapper } from 'components';
import './Favourites.scss';
import { ProductGrid } from 'components/ProductGrid';

export const Favourites = () => {
  const { favourites } = useProducts();

  return (
    <Wrapper>
      <div className="favourites">
        <div className="favourites__path-container">
          <BreadCrumbs />
        </div>

        <h1 className="favourites__title">Favourites</h1>
        <p className="favourites__quantity">{`${favourites.length} items`}</p>

        <div className="favourites__list">
          {favourites && favourites.length > 0 && (
            <ProductGrid>
              {favourites.map(fav => (
                <ProductCard
                  key={fav.id}
                  product={fav}
                />
              ))}
            </ProductGrid>
          )}
        </div>
      </div>
    </Wrapper>

  );
};
