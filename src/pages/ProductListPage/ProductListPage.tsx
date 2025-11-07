import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoChevronForward } from 'react-icons/io5';
import Pagination from '../../components/Pagination/Pagination';
// eslint-disable-next-line max-len
import ControlsContainer from '../../components/ControlsContainer/ControlsContainer';
import styles from './ProductListPage.module.scss';
import { Product } from '../../types/Product';
import ProductsList from '../../components/ProductsList';

interface ProductListPageProps {
  category: 'phones' | 'tablets' | 'accessories';
  pageTitle: string;
}

export default function ProductListPage({
  category,
  pageTitle,
}: ProductListPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('age');
  const [itemsPerPage, setItemsPerPage] = useState('8');

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const dataUrl = `${import.meta.env.BASE_URL}api/products.json`;
      const res = await fetch(dataUrl);

      if (!res.ok) {
        throw new Error(`Failed to fetch ${pageTitle.toLowerCase()}`);
      }

      const data: Product[] = await res.json();
      const categoryProducts = data.filter(p => p.category === category);

      setProducts(categoryProducts);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, pageTitle]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  const numItemsPerPage =
    itemsPerPage === 'all' ? sortedProducts.length : parseInt(itemsPerPage, 10);

  const totalPages = Math.ceil(sortedProducts.length / numItemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * numItemsPerPage;
  const endIndex = startIndex + numItemsPerPage;

  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (perPageOption: string) => {
    setItemsPerPage(perPageOption);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Something went wrong. Please try again.</p>
        <button onClick={fetchProducts} className={styles.reloadButton}>
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className={styles.productListPage}>
      <nav className={styles.breadcrumb}>
        <Link to="/">
          <IoHomeOutline className={styles.homeIcon} aria-hidden="true" />
        </Link>
        <IoChevronForward aria-hidden="true" />
        {pageTitle}
      </nav>

      <h1 className={styles.title}>{pageTitle}</h1>
      <p className={styles.count}>{`${products.length} models`}</p>

      <ControlsContainer
        sortBy={sortBy}
        onSortByChange={handleSortChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {visibleProducts.length > 0 ? (
        <ProductsList products={visibleProducts} />
      ) : (
        <p className={styles.noProductsMessage}>
          There are no {pageTitle.toLowerCase()} yet.
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
