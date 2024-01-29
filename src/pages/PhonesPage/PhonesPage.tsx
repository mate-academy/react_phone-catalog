/* eslint-disable jsx-a11y/control-has-associated-label */
import './phones-page.scss';
import { useContext, useEffect } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { PathBlock } from '../../components/PathBlock';
import { MainContext } from '../../context';
import { NotFoundProducts } from '../../components/NotFoundProducts';
import { SelectorsBlock } from '../../components/SelectorsBlock';

export const PhonesPage = () => {
  const {
    setCurrentPage,
    currentPage,
    phones,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Phones');
  }, []);

  return (
    <div className="product__page">
      <PathBlock currentPage={currentPage} />
      <h1 className="page__title">Mobile phones</h1>
      <p className="products-range">{`${phones.length} models`}</p>
      {phones.length === 0
        ? <NotFoundProducts />
        : (
          <>
            <SelectorsBlock />
            <ProductsList products={phones} />
          </>
        )}
    </div>
  );
};
