import { useContext, useEffect } from 'react';
import { PathBlock } from '../../components/PathBlock';
import { ProductsList } from '../../components/ProductsList';
import { MainContext } from '../../context';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { SelectorsBlock } from '../../components/SelectorsBlock';

export const Tablets = () => {
  const {
    setCurrentPage,
    currentPage,
    tablets,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Tablets');
  }, []);

  return (
    <div className="product__page">
      <PathBlock currentPage={currentPage} />
      <h1 className="page__title">{currentPage}</h1>
      <p className="products-range">{`${tablets.length} models`}</p>
      {tablets.length === 0
        ? <NotFoundProducts />
        : (
          <>
            <SelectorsBlock />
            <ProductsList products={tablets} />
          </>
        )}

    </div>
  );
};
