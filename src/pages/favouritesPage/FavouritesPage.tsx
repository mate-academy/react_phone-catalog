/* eslint-disable max-len */
import { ProductItem } from '../../components/ProductItem';
import { PublicPath } from '../../components/PublicPath';

import './FavouritesPage.scss';
import { useData } from '../../helpers/DataContext';
import { useProductStore } from '../../helpers/store';

export const FavouritesPage = () => {
  const { products } = useData();
  const favProductsId = useProductStore((state) => state.favProductsId);

  const favFilteredProducts = products?.filter(p => favProductsId.find(fp => fp === p.phoneId));

  return (
    <div className="favourites">
      <PublicPath linkName="favourites" />
      <div className="phones-page__header">
        <h2 className="text--h1 favourites__header">Favourites</h2>
        {favFilteredProducts && favFilteredProducts?.length > 1
        && <span className="text text--small text--gray">{`${favFilteredProducts.length} models`}</span>}

        <div className="favourites__content">
          {favFilteredProducts && favFilteredProducts?.length > 1
            ? (
              favFilteredProducts.map(p => (
                <ProductItem product={p} />
              ))
            )
            : (
              <h3 className="favourites__subtitle">There are no favorites yet</h3>
            )}
        </div>
      </div>
    </div>
  );
};
