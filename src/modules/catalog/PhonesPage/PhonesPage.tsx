import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './PhonesPage.module.scss';
import { useContext } from 'react';
import { SortBySelect } from '../../../shared/ui/sortBySelect';
import { ItemsOnPageSelect } from '../../../shared/ui/itemsOnPageSelect';
import { ProductsList } from '../../../shared/ui/productsList';
import { ProductsStateContext } from '../../../shared/context/ProductsContext';
// eslint-disable-next-line max-len
import { SliderLeftRoundButton } from '../../../shared/ui/buttons/sliderLerfRound';
import { getIndexes } from '../../../shared/utils/getIndexes';
// eslint-disable-next-line max-len
import { SliderRightRoundButton } from '../../../shared/ui/buttons/sliderRightRound';
import { PageButtons } from '../../../shared/ui/pageButtons/PageButtons';
import { getSortedProducts } from '../../../shared/utils/getSortedProducts';
import { Loader } from '../../../shared/ui/loader';
import { useCatalogControls } from '../../../shared/hooks/useCatalogControls';
import { Breadcrumbs } from '../../../shared/ui/breadcrumbs/Breadcrumbs';
import { ErrorMessage } from '../../../shared/ui/errorMessage';
import { EmptyArray } from '../../../shared/ui/emptyArray';

export const PhonesPage = () => {
  const { products, loading, errorMessage } = useContext(ProductsStateContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  // залишаємо те, що стосується лише конкретного виду продуктів
  const allProducts = products.filter(product => product.category === 'phones');
  const productsQuantity = allProducts.length;

  // виносимо в хук всі спільні змінні та функції
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
      <h1 className={styles.title}>Mobile Phones</h1>
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
