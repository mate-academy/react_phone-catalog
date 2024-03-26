import { useContext, useEffect, useMemo } from 'react';
import { PathBlock } from '../../components/PathBlock';
import { ProductsList } from '../../components/ProductsList';
import { MainContext } from '../../context';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { SelectorsBlock } from '../../components/SelectorsBlock';
import { scrollToTop } from '../../helpers/scrollToTop';

export const Tablets = () => {
  const {
    setCurrentPage,
    currentPage,
    tablets,
    queryValue,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Tablets');
    scrollToTop();
  }, []);

  const filteredProducts = useMemo(() => {
    return tablets.filter(({ name }) => {
      return name.toLowerCase().includes(queryValue.toLowerCase());
    });
  }, [tablets, queryValue]);

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
            <ProductsList products={filteredProducts} />
          </>
        )}
    </div>
  );
};
