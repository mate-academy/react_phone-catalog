import React, { useEffect, useState } from 'react';
import styles from './ProductsCategory.module.scss';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProducts } from '../../store/slices/productsSlice';
import { setSelectedProduct } from '../../store/slices/selectedProductSlice';
import { Product } from '../../types/product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ProductsCategoryType = 'phones' | 'tablets' | 'accessories';

interface ProductsCategoryProps {
  type: ProductsCategoryType;
}

const ProductsCategory: React.FC<ProductsCategoryProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => state.product.products);

  const [, setSearchParams] = useSearchParams();

  // const pageParam = searchParams.get('page');
  // const perPageParam = searchParams.get('perPage');

  // States for sorting and items per page
  const [sortBy, setSortBy] = useState<string>('newest');
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [coptyTotalPages, setCopyTotalPages] = useState<number | number[]>(0);

  useEffect(() => {
    dispatch(fetchProducts(type));
  }, [dispatch, type]);

  useEffect(() => {
    if (product[type]?.length) {
      setTotalPages(Math.ceil(product[type].length / itemsPerPage));
    }

    setSearchParams(prevParams => {
      prevParams.set('page', page.toString());
      prevParams.set('perPage', itemsPerPage.toString());

      return prevParams;
    });
  }, [itemsPerPage, product, type, page, setSearchParams]);

  useEffect(() => {
    setSearchParams(prevParams => {
      prevParams.set('sortBy', sortBy);

      return prevParams;
    });
  }, [sortBy, setSearchParams]);

  const handleProductClick = (item: Product) => {
    dispatch(setSelectedProduct(item));
    navigate(`/${type}/${item.id}`);
  };

  useEffect(() => {
    const maxVisiblePages = 5;
    const half = Math.floor(maxVisiblePages / 2);
    let start = 1;
    let end = totalPages;

    if (totalPages > maxVisiblePages) {
      if (page <= half) {
        start = 1;
        end = maxVisiblePages;
      } else if (page >= totalPages - half) {
        start = totalPages - maxVisiblePages + 1;
        end = totalPages;
      } else {
        start = page - half;
        end = page + half;
      }
    }

    const pagesArray = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );

    setCopyTotalPages(pagesArray);
  }, [page, totalPages]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(() => {
      const newItemsPerPage = Number(event.target.value);

      setPage(1);

      return newItemsPerPage;
    });
    setTotalPages(
      Math.ceil(product[type]?.length / Number(event.target.value)),
    );
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const sortedProducts = () => {
    if (product[type]) {
      switch (sortBy) {
        case 'newest':
          return [...product[type]].sort((a, b) => b.id.localeCompare(a.id));
        case 'alphabetically':
          return [...product[type]].sort((a, b) =>
            a.name.localeCompare(b.name),
          );
        case 'alphabeticallyDESC':
          return [...product[type]].sort((a, b) =>
            b.name.localeCompare(a.name),
          );
        case 'expensive':
          return [...product[type]].sort(
            (a, b) => b.priceRegular - a.priceRegular,
          );
        case 'cheapest':
          return [...product[type]].sort(
            (a, b) => a.priceRegular - b.priceRegular,
          );
        default:
          return product[type];
      }
    }
  };

  return (
    <div className={styles.productsCategory}>
      <div className={styles.productsCategory__header}>
        <Breadcrumb type={type} />

        <h1 className={styles.productsCategory__title}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>

        <p className={styles.productsCategory__model}>
          {product[type]?.length || 0} Models
        </p>

        <div className={styles.productsCategory__sorting}>
          <div className={styles['productsCategory__sorting-sortBy']}>
            <label
              htmlFor="sortBy"
              className={styles['productsCategory__sorting-sortBy-text']}
            >
              Sort By
            </label>
            <select
              id="sortBy"
              className={styles['productsCategory__sorting-sortBy-select']}
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="alphabeticallyDESC">Alphabetically (DESC)</option>
              <option value="expensive">Expensive first</option>
              <option value="cheapest">Cheapest first</option>
            </select>
          </div>

          <div className={styles['productsCategory__sorting-itemsOnPage']}>
            <label
              htmlFor="itemsPerPage"
              className={styles['productsCategory__sorting-itemsOnPage-text']}
            >
              Items on page
            </label>
            <select
              id="itemsPerPage"
              className={styles['productsCategory__sorting-itemsOnPage-select']}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="24">24</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.productsCategory__products}>
        {sortedProducts()
          ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onClick={() => handleProductClick(item)}
            />
          ))}
      </div>
      <div className={styles.productsCategory__pagination}>
        <div className={styles.productsCategory__leftArrow}>
          <ArrowBackIosNewIcon />
        </div>
        <div className={styles.productsCategory__paginationButtons}>
          {Array.isArray(coptyTotalPages) &&
            coptyTotalPages.map(pageNum => (
              <button
                key={pageNum}
                className={`${styles.productsCategory__paginationButton} ${
                  page === pageNum
                    ? styles['productsCategory__paginationButton-active']
                    : ''
                }`}
                onClick={() => changePage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
        </div>
        <div className={styles.productsCategory__rightArrow}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default ProductsCategory;
