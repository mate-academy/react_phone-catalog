import { useContext, useEffect } from 'react';
import { PathBlock } from '../../components/PathBlock';
import { MainContext } from '../../context';
import { ProductsList } from '../../components/ProductsList';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { SelectorsBlock } from '../../components/SelectorsBlock';
import { scrollToTop } from '../../services/scrollToTop';

export const Accessories = () => {
  const {
    setCurrentPage,
    currentPage,
    accessories,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Accessories');
    scrollToTop();
  }, []);

  return (
    <div className="product__page">
      <PathBlock currentPage={currentPage} />
      <h1 className="page__title">{currentPage}</h1>
      <p className="products-range">{`${accessories.length} models`}</p>
      {accessories.length === 0
        ? <NotFoundProducts />
        : (
          <>
            <SelectorsBlock />
            <ProductsList products={accessories} />
          </>
        )}

    </div>
  );
};
