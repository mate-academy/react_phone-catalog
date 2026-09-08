import React, { useEffect, useMemo } from 'react';
import styles from './Accessories.module.scss';
import '../../styles/App.scss';
import Dropdowns from '../Dropdowns';
import NavLinks from '../NavLinks';
import MainTitle from '../MainTitle';
import Products from '../Products';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Product } from '../../types/products';
import { fetchAccessories } from '../../store/slices/accessoriesSlice';
import { useSearchParams } from 'react-router-dom';
import Loader from '../Loader';
import ErrorLoader from '../ErrorLoader';
import ProductNotFound from '../ProductsNotFound';

const Accessories: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: '4',
    sortOption: 'Newest',
    currentPage: '1',
  });

  const productsRef = React.useRef<HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { accessories, accessoriesLength, loading, error } = useSelector(
    (state: RootState) => state.accessories,
  );

  const pageSize = searchParams.get('pageSize') || '4';
  const sortOption = searchParams.get('sortOption') || 'Newest';
  const currentPage = Number(searchParams.get('currentPage'));

  useEffect(() => {
    dispatch(fetchAccessories());
  }, [dispatch]);

  function sortProducts(products: Product[], sortBy: string) {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          return b.year - a.year;

        case 'Name: A to Z':
          return a.name.localeCompare(b.name);

        case 'Name: Z to A':
          return b.name.localeCompare(a.name);

        case 'Price: Low to High':
          return a.price - b.price;

        case 'Price: High to Low':
          return b.price - a.price;

        default:
          return 0;
      }
    });
  }

  function handleGetSortOption(option: string) {
    if (option) {
      setSearchParams(prevParams => {
        prevParams.set('sortOption', option);
        prevParams.set('currentPage', '1');

        return prevParams;
      });
    }
  }

  function handleGetPageSize(option: string) {
    if (option) {
      setSearchParams(prevParams => {
        prevParams.set('pageSize', option);
        prevParams.set('currentPage', '1');

        return prevParams;
      });
    }
  }

  const sortedProducts = useMemo(() => {
    return sortProducts(accessories, sortOption);
  }, [accessories, sortOption]);

  function handleSetCurrentPage(page: number) {
    setSearchParams(prevParams => {
      prevParams.set('currentPage', page.toString());

      return prevParams;
    });

    if (page !== currentPage) {
      productsRef.current?.scrollIntoView({ behavior: 'instant' });
    }
  }

  return (
    <section
      ref={productsRef}
      className={`${styles.accessories} page__wrapper-center`}
    >
      {loading && !error && <Loader />}

      {error && !loading && <ErrorLoader />}

      {!loading && !error && (
        <>
          <div className={styles.accessories__top}>
            <NavLinks text="Accessories" notActive={true} />
            <div className={styles['accessories__title-wrapper']}>
              <MainTitle>Accessories</MainTitle>
              <p className={styles['accessories__models-count']}>
                {accessoriesLength} models
              </p>
            </div>

            <div className={styles.accessories__dropdowns}>
              <div className={styles['accessories__dropdown-sort']}>
                <Dropdowns
                  title="Sort by"
                  options={[
                    'Newest',
                    'Name: A to Z',
                    'Name: Z to A',
                    'Price: Low to High',
                    'Price: High to Low',
                  ]}
                  onGetOption={handleGetSortOption}
                  currentOption={sortOption}
                />
              </div>
              <div className={styles['accessories__dropdown-pages']}>
                <Dropdowns
                  title="Items on page"
                  options={['4', '8', '16', 'All']}
                  onGetOption={handleGetPageSize}
                  currentOption={pageSize}
                />
              </div>
            </div>
          </div>

          {accessoriesLength > 0 && (
            <Products
              products={sortedProducts}
              pageSize={pageSize}
              currentPage={currentPage}
              onSetCurrentPage={handleSetCurrentPage}
            />
          )}

          {accessoriesLength === 0 && <ProductNotFound />}
        </>
      )}
    </section>
  );
};

export default Accessories;
