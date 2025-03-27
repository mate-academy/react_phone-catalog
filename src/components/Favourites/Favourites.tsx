import React, { useEffect, useState } from 'react';
import styles from './Favourites.module.scss';
import '../../styles/App.scss';
import NavLinks from '../NavLinks';
import MainTitle from '../MainTitle';
import Products from '../Products';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import ProductNotFound from '../ProductsNotFound';
import Loader from '../Loader';
import { loadFavouritesAsync } from '../../store/slices/favouritesSlice';

const Favourites: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { favourites, favouritesLength, loading, error } = useSelector(
    (state: RootState) => state.favourites,
  );
  const dispatch = useDispatch<AppDispatch>();

  const productsRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    dispatch(loadFavouritesAsync());
  }, [dispatch]);

  function handleSetCurrentPage(page: number) {
    setCurrentPage(page);

    if (page !== currentPage) {
      productsRef.current?.scrollIntoView({ behavior: 'instant' });
    }
  }

  return (
    <section
      ref={productsRef}
      className={`page__wrapper-center ${styles.favourites}`}
    >
      {loading && !error && <Loader />}

      {error && !loading && <ProductNotFound />}

      {!error && !loading && (
        <>
          <div className={styles.favourites__top}>
            <NavLinks text="Favourites" notActive={true} />
            <div className={styles['favourites__title-wrapper']}>
              <MainTitle>Favourites</MainTitle>
              <p className={styles['favourites__models-count']}>
                {favourites.length} items
              </p>
            </div>
          </div>

          {favouritesLength === 0 ? (
            <ProductNotFound />
          ) : (
            <Products
              products={favourites}
              currentPage={currentPage}
              onSetCurrentPage={handleSetCurrentPage}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Favourites;
