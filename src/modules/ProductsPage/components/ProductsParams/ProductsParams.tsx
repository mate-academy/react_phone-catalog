import { useEffect, useMemo, useRef } from 'react';
import { Dropdown } from '../../../../components/Dropdown';
import { Loader } from '../../../../components/Loader/Loader';
import {
  PER_PAGE_PARAMS,
  SORT_PARAMS,
  TYPES_NAME_MAP,
  VISIBLE_PAGES,
} from '../../../../config';
import { ProductsList } from '../ProductsList';
import styles from './ProductsParams.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { validateParams } from '../../../../utils/utils';
import { Pagination } from '../../../../components/Pagination';
import { useAppSelector } from '../../../../app/hooks';
import classNames from 'classnames';

export const ProductsParams = () => {
  const { items, loaded } = useAppSelector(state => state.products);
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  const pathnameParts = pathname.split('/').filter(Boolean);
  const type = pathnameParts[pathnameParts.length - 1];

  const [searchParams, setSearchParams] = useSearchParams();

  const productsByType = useMemo(() => {
    return items.filter(product => product.category === type) || [];
  }, [type, items]);

  const validatedParams = useMemo(() => {
    return validateParams(searchParams, productsByType.length);
  }, [searchParams, productsByType.length]);

  useEffect(() => {
    const validatedStr = validatedParams.toString();

    if (validatedStr !== searchParams.toString()) {
      setSearchParams(validatedParams);
    }
  }, [validatedParams, searchParams, setSearchParams]);

  const sortParam = validatedParams.get('sort');
  const perPageParam = validatedParams.get('perPage');
  const pageParam = validatedParams.get('page');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    if (pageParam && +pageParam > 1) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);

        next.set('page', '1');

        return next;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortParam, perPageParam]);

  const preparedProducts = useMemo(() => {
    let sorted = [...productsByType];

    switch (sortParam) {
      case 'age':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'title':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        sorted.sort((a, b) => b.year - a.year);
    }

    if (perPageParam === 'all') {
      return sorted;
    }

    if (
      perPageParam &&
      pageParam &&
      !isNaN(+perPageParam) &&
      +perPageParam > 0
    ) {
      const start = +perPageParam * (+pageParam - 1);
      const end = start + +perPageParam;

      sorted = sorted.slice(start, end);
    }

    return sorted;
  }, [productsByType, sortParam, pageParam, perPageParam]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageParam]);

  const totalPages = useMemo(() => {
    if (!perPageParam || perPageParam === 'all') {
      return 1;
    }

    return Math.ceil(productsByType.length / +perPageParam);
  }, [productsByType.length, perPageParam]);

  const isPaginationVisible =
    perPageParam &&
    pageParam &&
    !isNaN(+perPageParam) &&
    +perPageParam > 0 &&
    preparedProducts.length > 0;

  return (
    <div className={styles.products_params}>
      <h2 className={styles.title}>
        {type === 'phones' ? 'Mobile phones' : TYPES_NAME_MAP[type]}
      </h2>

      <p className={styles.amount}>
        {productsByType.length +
          (productsByType.length === 1 ? ' model' : ' models')}
      </p>

      <div className={styles.params}>
        <div className={styles.param_box}>
          <p className={styles.param}>Sort by</p>
          <Dropdown
            items={SORT_PARAMS}
            defaultValue={SORT_PARAMS.age}
            searchParamsConfig={{ main: 'sort' }}
          />
        </div>

        <div className={classNames(styles.param_box, styles.param_box_right)}>
          <p className={styles.param}>Items on page</p>
          <Dropdown
            items={PER_PAGE_PARAMS}
            defaultValue={PER_PAGE_PARAMS.all}
            searchParamsConfig={{
              main: 'perPage',
              additional: { name: 'page', defaultValue: '1' },
            }}
          />
        </div>
      </div>

      {!loaded ? (
        <Loader />
      ) : (
        <ProductsList products={preparedProducts} productsType={type} />
      )}

      {isPaginationVisible && (
        <Pagination
          totalPages={totalPages}
          visiblePages={VISIBLE_PAGES}
          currentPage={+pageParam}
        />
      )}
    </div>
  );
};
