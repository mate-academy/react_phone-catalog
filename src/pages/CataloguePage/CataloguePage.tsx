import { useParams, useSearchParams } from 'react-router-dom';
import styles from './CataloguePage.module.scss';
import { useEffect, useState } from 'react';
import { SelectForm, Option } from '../../components/SelectForm';
import { Category, ShortProduct } from '../../shared/models';
import { getShortProductsByCategory } from '../../shared/services/products.service';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeleton } from '../../components/Skeletons';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { NotFoundPage } from '../NotFoundPage';

const DEFAULT_SORT = 'age';
const DEFAULT_ITEMS_PER_PAGE = '16';
const DEFAULT_PAGE = '1';

export const CataloguePage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [wasLoadedOnce, setWasLoadedOnce] = useState(false);

  const sortOptions: Option[] = [
    { value: 'age', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];
  const pageOptions: Option[] = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  useEffect(() => {
    const currentSort = searchParams.get('sort') || DEFAULT_SORT;
    const currentItems = searchParams.get('itemsPerPage') || DEFAULT_ITEMS_PER_PAGE;
    const currentPage = searchParams.get('page') || DEFAULT_PAGE;

    setSort(currentSort);
    setItemsPerPage(currentItems);
    setPage(currentPage);

    const updatedParams: Record<string, string> = {};

    if (!searchParams.get('sort')) updatedParams.sort = DEFAULT_SORT;
    if (!searchParams.get('itemsPerPage')) updatedParams.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    if (!searchParams.get('page')) updatedParams.page = DEFAULT_PAGE;

    if (Object.keys(updatedParams).length > 0) {
      setSearchParams((prev: URLSearchParams) => {
        const merged = new URLSearchParams(prev);
        Object.entries(updatedParams).forEach(([key, value]) => {
          merged.set(key, value);
        });
        return merged;
      });
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      if (!category) return;

      setIsLoading(true);
      setHasError(false);
      try {
        const loaded = await getShortProductsByCategory(category as Category);
        setProducts(loaded);
      } catch (error) {
        console.error('Error loading products:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
        setWasLoadedOnce(true);
      }
    };

    loadProducts();
  }, [category]);

  useEffect(() => {
    if (!products.length) return;
    if (itemsPerPage === 'all') return;

    const perPage = parseInt(itemsPerPage, 10);
    const currentPage = parseInt(page, 10);
    const totalPages = Math.ceil(products.length / perPage);

    if (currentPage > totalPages) {
      setPage('1');
      setSearchParams(prev => {
        const updated = new URLSearchParams(prev);
        updated.set('page', '1');
        return updated;
      });
    }
  }, [products, itemsPerPage]);

  useEffect(() => {
    const currentPage = searchParams.get('page');

    if (currentPage) {
      setPage(currentPage);
    }
  }, [searchParams]);

  const getTitle = (): string => {
    switch (category) {
      case 'phones':
        return 'Mobile Phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Catalogue';
    }
  };

  const handleSelectChange = (
    key: 'sort' | 'itemsPerPage' | 'page',
    setter: (val: string) => void,
  ) => {
    return (val: string) => {
      setter(val);
      setSearchParams(prev => {
        const updated = new URLSearchParams(prev);
        updated.set(key, val);
        return updated;
      });
    };
  };

  const paginatedProducts = () => {
    const sorted = getSortedProducts();

    if (itemsPerPage === 'all') return sorted;

    const perPage = parseInt(itemsPerPage, 10);
    const currentPage = parseInt(page, 10);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return sorted.slice(startIndex, endIndex);
  };

  const getSortedProducts = () => {
    const sorted = [...products];

    switch (sort) {
      case 'age':
        return sorted.sort((a, b) => b.year - a.year);

      case 'title':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return sorted.sort((a, b) => a.price - b.price);

      default:
        return sorted;
    }
  };

  const handleItemsPerPageChange = (val: string) => {
    setItemsPerPage(val);
    setPage('1');

    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);

      updated.set('itemsPerPage', val);
      updated.set('page', '1');

      return updated;
    });
  };

  return (
    <div className={`container ${styles.catalogue}`}>
      <Breadcrumbs />
      <h1>{getTitle()}</h1>
      <div className={styles.catalogue__count}>
        {getSortedProducts().length} models
      </div>
      <div className={styles.catalogue__formContainer}>
        <SelectForm
          label="Sort"
          value={sort}
          onChange={handleSelectChange('sort', setSort)}
          options={sortOptions}
        />
        <SelectForm
          label="Items on page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          options={pageOptions}
        />
      </div>

      <div className={styles.catalogue__grid}>
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}

        {!isLoading && hasError && (
          <NotFoundPage
            title="Oops! Something went wrong"
            description="Please, try to reload this page"
            showReload={true}
          />
        )}

        {!isLoading && wasLoadedOnce && !hasError && products.length === 0 && (
          <div className={styles.emptyBlock}>
            <p>There are no {category} yet.</p>
          </div>
        )}

        {!isLoading &&
          !hasError &&
          products.length > 0 &&
          paginatedProducts().map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
      </div>
      {itemsPerPage !== 'all' && (
        <Pagination
          totalItems={products.length}
          currentPage={parseInt(page, 10)}
          itemsPerPage={parseInt(itemsPerPage, 10)}
          onPageChange={newPage => {
            setPage(String(newPage));
            setSearchParams(prev => {
              const updated = new URLSearchParams(prev);
              updated.set('page', String(newPage));
              return updated;
            });
          }}
        />
      )}
    </div>
  );
};
