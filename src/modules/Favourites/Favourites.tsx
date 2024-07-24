import { useContext } from 'react';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductCards } from '../shared/components/ProductCards';
import { StateContext } from '../utils/GlobalStateProvider';

import './Favourites.scss';
import { NoProducts } from '../shared/components/NoProducts';

export const Favourites = () => {
  const { likedItems } = useContext(StateContext);

  return (
    <>
      <main className="favourites">
        {likedItems.length > 0 ? (
          <>
            <div className="favourites__breadcrumbs">
              <Breadcrumbs />
            </div>
            <div className="favourites__info">
              <h1 className="favourites__title">Favourites</h1>
              <p>{likedItems.length} items</p>
            </div>

            <ProductCards productsOnPage={likedItems} />
          </>
        ) : (
          <NoProducts title="No liked products yet!" />
        )}
      </main>
    </>
  );
};
