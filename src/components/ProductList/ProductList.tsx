import { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Card from '../Card/Card';
import CatalogueOptions from '../CatalogueOptions/CatalogueOptions';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import styles from './style.module.scss';

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

type SortOption = 'age' | 'title' | 'price';

const ProductList = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = location.pathname.slice(1);

  const sortBy = (searchParams.get('sort') as SortOption) || 'age';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPageParam = searchParams.get('perPage');
  const itemsPerPage =
    itemsPerPageParam === 'all' ? Infinity : Number(itemsPerPageParam) || 16;

  useEffect(() => {
    const hasParams = searchParams.toString().length > 0;

    if (!hasParams) {
      const defaultParams = new URLSearchParams();

      defaultParams.set('sort', 'age');
      defaultParams.set('page', '1');
      defaultParams.set('perPage', '16');
      setSearchParams(defaultParams, { replace: true });
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`${import.meta.env.BASE_URL}api/products.json`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const allProducts: Product[] = await response.json();

        const filteredProducts = allProducts.filter(
          product => product.category === category,
        );

        setProducts(filteredProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'age':
        return sorted.sort((a, b) => b.year - a.year);
      case 'title':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const updateSearchParams = (
    updates: Record<string, string | number | null>,
  ) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);
  };

  const handleSortChange = (newSort: SortOption) => {
    updateSearchParams({
      sort: newSort,
      page: 1,
    });
  };

  const handleItemsPerPageChange = (newValue: number | string) => {
    updateSearchParams({
      perPage: newValue,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({
      page: page,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.reloadButton}
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.emptyTitle}>
          There are no {categoryName.toLowerCase()} yet
        </h2>
      </div>
    );
  }

  const effectiveItemsPerPage =
    itemsPerPage === Infinity ? sortedProducts.length : itemsPerPage;
  const totalPages = Math.ceil(sortedProducts.length / effectiveItemsPerPage);
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div>
      <CatalogueOptions
        totalProducts={sortedProducts.length}
        sortBy={sortBy}
        itemsPerPage={
          itemsPerPage === Infinity ? sortedProducts.length : itemsPerPage
        }
        onSortChange={handleSortChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <div className={styles.catalogue}>
        {currentProducts.map(product => (
          <Card
            key={product.id}
            product={product}
            extraClassName="catalogueCard"
            showDiscount={true}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;