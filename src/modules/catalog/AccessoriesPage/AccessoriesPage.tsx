import { useContext } from 'react';
import styles from './AccessoriesPage.module.scss';
import { ProductsStateContext } from '../../../shared/context/ProductsContext';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useCatalogControls } from '../../../shared/hooks/useCatalogControls';
import { getIndexes } from '../../../shared/utils/getIndexes';
import { getSortedProducts } from '../../../shared/utils/getSortedProducts';
import { SortBySelect } from '../../../shared/ui/sortBySelect';
import { ItemsOnPageSelect } from '../../../shared/ui/itemsOnPageSelect';
import { Loader } from '../../../shared/ui/loader';
import { ProductsList } from '../../../shared/ui/productsList';
// eslint-disable-next-line max-len
import { SliderLeftRoundButton } from '../../../shared/ui/buttons/sliderLerfRound';
import { PageButtons } from '../../../shared/ui/pageButtons';
// eslint-disable-next-line max-len
import { SliderRightRoundButton } from '../../../shared/ui/buttons/sliderRightRound';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs';
import { ErrorMessage } from '../../../shared/ui/errorMessage';
import { EmptyArray } from '../../../shared/ui/emptyArray';

export const AccessoriesPage = () => {
  const { products, loading, errorMessage } = useContext(ProductsStateContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const allProducts = products.filter(
    product => product.category === 'accessories',
  );

  const productsQuantity = allProducts.length;

  const {
    currentPage,
    perPage,
    sortOption,
    pages,
    prevDisabled,
    nextDisabled,
    handleLeftButtonClick,
    handleRightButtonClick,
    handlePageChange,
    handleSortOptionChange,
    handlePerPageChange,
  } = useCatalogControls({
    searchParams,
    setSearchParams,
    productsQuantity,
  });

  const { firstIndex, lastIndex } = getIndexes(
    perPage,
    currentPage,
    productsQuantity,
  );

  const currentProducts = getSortedProducts(allProducts, sortOption).slice(
    firstIndex,
    lastIndex,
  );

  return (
    <div className={styles.container}>
      <Breadcrumbs pathname={pathname} />
      <h1 className={styles.title}>Accessories</h1>
      <p className={`body-text ${styles.info}`}>{allProducts.length} models</p>

      {loading && <Loader />}

      {!loading && errorMessage && <ErrorMessage />}

      {!loading && !errorMessage && allProducts.length === 0 && (
        <EmptyArray pathname={pathname} />
      )}

      {!loading && !errorMessage && allProducts.length > 0 && (
        <>
          <div className={styles.specsBlock}>
            <SortBySelect
              value={sortOption}
              onChange={handleSortOptionChange}
            />
            <ItemsOnPageSelect value={perPage} onChange={handlePerPageChange} />
          </div>
          <ProductsList products={currentProducts} />
          <div className={styles.pageButtonsBar}>
            <SliderLeftRoundButton
              onPageChange={handleLeftButtonClick}
              prevDisabled={prevDisabled}
            />
            <PageButtons
              pages={pages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />

            <SliderRightRoundButton
              onPageChange={handleRightButtonClick}
              nextDisabled={nextDisabled}
            />
          </div>
        </>
      )}
    </div>
  );
};
