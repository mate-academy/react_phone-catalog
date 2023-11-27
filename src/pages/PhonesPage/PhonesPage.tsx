import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { DropDown } from '../../components/DropDown';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { ProductType } from '../../types/ProductType';
import { Status } from '../../types/Status';
import { SortBy } from '../../types/SortBy';

import './PhonesPage.scss';
import { compareProducts } from '../../utils/compareProducts';

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const phones = useMemo(() => {
    return products
      .filter(product => product.type === ProductType.PHONE);
  }, [products]);

  const sortOptions = [
    { label: 'Newest', value: SortBy.AGE },
    { label: 'Alphabetically', value: SortBy.NAME },
    { label: 'Cheapest', value: SortBy.PRICE },
  ];

  const sortBy = (searchParams.get('sort') as SortBy) || SortBy.AGE;

  const sorted = useMemo(() => {
    return phones
      .sort((product1, product2) => {
        return compareProducts(product1, product2, sortBy);
      });
  }, [phones, sortBy]);

  const visibleProducts = sortBy
    ? sorted
    : phones;

  return (
    <>
      <h1>Mobile phones</h1>

      <DropDown
        options={sortOptions}
        label="Sort by"
        searchParamName="sort"
      />

      {status === Status.LOADING && <Loader />}
      {status === Status.IDLE && <ProductList products={visibleProducts} />}
    </>
  );
};
