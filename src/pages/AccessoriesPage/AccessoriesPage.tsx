import { useContext, useEffect, useMemo } from 'react';
import { PathBlock } from '../../components/PathBlock';
import { MainContext } from '../../context';
import { ProductsList } from '../../components/ProductsList';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { SelectorsBlock } from '../../components/SelectorsBlock';
import { scrollToTop } from '../../helpers/scrollToTop';

export const Accessories = () => {
  const {
    setCurrentPage,
    currentPage,
    accessories,
    queryValue,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Accessories');
    scrollToTop();
  }, []);

  const filteredProducts = useMemo(() => {
    return accessories.filter(({ name }) => {
      return name.toLowerCase().includes(queryValue.toLowerCase());
    });
  }, [accessories, queryValue]);

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
            <ProductsList products={filteredProducts} />
          </>
        )}

    </div>
  );
};
