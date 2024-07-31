import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
import { DropDown } from '../DropDown/DropDown';
import { mapSortCallbacksToSortKey, SORT_KEY } from '../../constants/sortTypes';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination';

type Props = {
  products: Product[];
  productType: string;
};

export const ProductsList: React.FC<Props> = ({
  products: unsortedProducts,
  productType,
}) => {
  const [products, setProducts] = useState(
    [...unsortedProducts].sort(mapSortCallbacksToSortKey[SORT_KEY.AGE]),
  );

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || SORT_KEY.AGE;
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 'All';

  const total = products.length;
  const perPageNum = +perPage;

  const start = page === 1 || perPage === 'All' ? 0 : perPageNum * (+page - 1);
  const end =
    start + perPageNum > total || perPage === 'All'
      ? total
      : start + perPageNum;

  useEffect(() => {
    const sortedProducts = [...unsortedProducts].sort(
      mapSortCallbacksToSortKey[sort],
    );

    setProducts(sortedProducts);
  }, [sort, unsortedProducts]);

  return (
    <>
      <h1 className={styles.productsList__title}>{productType}</h1>
      <p className={classNames(styles.productsList__quantity, 'text-body')}>
        {products.length} models
      </p>
      <div className={styles.productsList__dropdowns}>
        <DropDown />
      </div>

      <div className={styles.productsList__products}>
        {products
          ?.slice(start, end)
          .map(product => <ProductCard key={product.id} product={product} />)}
      </div>

      {perPage !== 'All' && (
        <Pagination total={total} perPage={perPage} currentPage={+page} />
      )}
    </>
  );
};
