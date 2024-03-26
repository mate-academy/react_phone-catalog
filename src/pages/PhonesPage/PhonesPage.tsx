/* eslint-disable jsx-a11y/control-has-associated-label */
import './phones-page.scss';
import { useContext, useEffect, useMemo } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { PathBlock } from '../../components/PathBlock';
import { MainContext } from '../../context';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { SelectorsBlock } from '../../components/SelectorsBlock';
import { scrollToTop } from '../../helpers/scrollToTop';

export const PhonesPage = () => {
  const {
    setCurrentPage,
    currentPage,
    phones,
    queryValue,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Phones');
    scrollToTop();
  }, []);

  const filteredProducts = useMemo(() => {
    return phones.filter(({ name }) => {
      return name.toLowerCase().includes(queryValue.toLowerCase());
    });
  }, [phones, queryValue]);

  return (
    <div className="product__page">
      <PathBlock currentPage={currentPage} />
      <h1 className="page__title">Mobile phones</h1>
      <p className="products-range">{`${filteredProducts.length} models`}</p>
      {filteredProducts.length === 0
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
