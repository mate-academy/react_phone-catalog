import { Catalog } from '../shared/Catalog/Catalog';
import { useContext } from 'react';
import { ProductContext } from '../shared/Context/Context';

export const Favourites = () => {
  const { favourite } = useContext(ProductContext);

  return (
    <main className="main">
      <div className="catalog">
        <div className="container">
          <Catalog title={'Favourites'} productsByCategory={favourite} />
        </div>
      </div>
    </main>
  );
};
