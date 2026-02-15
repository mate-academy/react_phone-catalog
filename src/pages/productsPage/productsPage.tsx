import styles from './productsPage.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { usePaginationWithScroll } from '../../hooks/usePaginationWithScroll';
import { BackBtn } from '../../components/backBtn';
import { Loader } from '../../components/loader';
import { BreadCrumbs } from '../../components/breadCrumbs';
import { Title } from '../../components/title';
import { ProductQuantity } from '../../components/productQuantity';
import { Dropdown } from '../../components/dropdown';
import { ProductCard } from '../../components/productCard';
import { Pagination } from '../../components/pagination';
/* eslint-disable-next-line */

type Props = {
  category: string;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const location = useLocation();

  const arrLocation = useMemo(() => {
    return location.pathname.split('/').filter(Boolean);
  }, [location.pathname]);

  const { setCategory, filteredProductsCategory, isLoading, errorMessage } =
    useContext(ProductContext);

  useEffect(() => {
    setCategory(category);
  }, [setCategory, category]);

  const optionsSort = ['Newest', 'Alphabetically', 'Cheapest'];
  const optionsQuantity = ['All', '4', '8', '16'];
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get('sort') || optionsSort[0];
  const initialQuantity = searchParams.get('quantity') || optionsQuantity[0];

  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedQuantity, setSelectedQuantity] = useState(initialQuantity);
  const productQuantity = filteredProductsCategory.length;
  const filteredProduct = useMemo(() => {
    return [...filteredProductsCategory].sort((a, b) => {
      switch (selectedSort) {
        case 'Newest':
          return b.year - a.year;
        case 'Alphabetically':
          return a.name.localeCompare(b.name);
        case 'Cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [filteredProductsCategory, selectedSort]);

  const itemsPerPage =
    selectedQuantity === 'All'
      ? filteredProduct.length || 1
      : Number(selectedQuantity);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    containerRef,
    goPrev,
    goNext,
    scrollToPage,
  } = usePaginationWithScroll(filteredProduct, itemsPerPage);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('sort', value);
      params.set('page', '1');

      return params;
    });
  };

  const handleQuantityChange = (value: string) => {
    setSelectedQuantity(value);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('quantity', value);
      params.set('page', '1');

      return params;
    });
  };

  if (errorMessage) {
    return (
      <div className={styles.productNotFound}>
        <BackBtn to="/" />
        <h1 className={styles.errorMessage}>{errorMessage}</h1>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.phonesPage}>
      <BreadCrumbs location={arrLocation} />
      <Title title={category} marginBottom />
      <div className={styles.container}>
        <ProductQuantity quantity={productQuantity} />
        <div className={styles.filterBlock}>
          <Dropdown
            options={optionsSort}
            sortBy
            onSelect={handleSortChange}
            selected={selectedSort}
          />
          <Dropdown
            options={optionsQuantity}
            onSelect={handleQuantityChange}
            selected={selectedQuantity}
          />
        </div>
        <ProductCard product={paginatedItems} catalog />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            handlePageChange={scrollToPage}
            currentPage={currentPage}
            containerRef={containerRef}
            goPrev={goPrev}
            goNext={goNext}
          />
        )}
      </div>
    </div>
  );
};
