import { Product } from 'types/ProductInfo';
import CardItem from 'components/CardItem/CardItem';
import { useMyContext } from 'components/Contexts/Contexts';
import { Loader } from 'components/Loader/Loader';
import styles from './ProductList.module.scss';
import NotFound from 'components/NotFound/NotFound';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Pagination from 'components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  fetchProducts: () => Promise<Product[]>;
  text: string;
};

const currentPageDefault = 1;
const perPageDefault = 16;

const ProductsList: React.FC<Props> = ({ title, fetchProducts, text }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoading, setIsLoading, isError, setIsError } = useMyContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || currentPageDefault;
  const perPage = (() => {
    const value = searchParams.get('perPage');
    return value === 'all' ? 'all' : Number(value) || perPageDefault;
  })();
  const sortType =
    (searchParams.get('sort') as 'Newest' | 'Alphabetically' | 'Cheapest') ||
    'Newest';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setIsError(true);
        console.error(`Error fetching ${title}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [fetchProducts, setIsLoading, setIsError, title]);

  const handleSortChange = (
    newSort: 'Newest' | 'Alphabetically' | 'Cheapest',
  ) => {
    const newParams = new URLSearchParams();
    newParams.set('sort', newSort);
    newParams.set('page', '1');
    newParams.set('perPage', String(perPage));
    setSearchParams(newParams);
  };

  const handlePerPageChange = (newPerPage: number | 'all') => {
    const newParams = new URLSearchParams();
    newParams.set('sort', sortType);
    newParams.set('page', '1');
    newParams.set('perPage', String(newPerPage));
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams();
    newParams.set('sort', sortType);
    newParams.set('page', String(newPage));
    newParams.set('perPage', String(perPage));
    setSearchParams(newParams);
  };

  const sorted = [...products].sort((a, b) => {
    switch (sortType) {
      case 'Alphabetically':
        return a.name.localeCompare(b.name);
      case 'Cheapest':
        return a.priceRegular - b.priceRegular;
      case 'Newest':
      default:
        return 0;
    }
  });

  const total = sorted.length;
  const startIndex =
    perPage === 'all' ? 0 : (currentPage - 1) * (perPage as number);
  const endIndex = perPage === 'all' ? total : startIndex + (perPage as number);
  const paginated = sorted.slice(startIndex, endIndex);

  if (isLoading) return <Loader />;
  if (isError) return <NotFound />;

  if (!isLoading && products.length === 0) {
    return (
      <div className={styles.container}>
        <Breadcrumbs text={text} />
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.quantity}>No products found</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container} key={title}>
      <Breadcrumbs text={text} />

      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.quantity}>
          {products.length} {products.length === 1 ? 'model' : 'models'}
        </p>
      </div>

      <div className={styles.mini_container}>
        <div className={styles.sort}>
          <label htmlFor="sort_type" className={styles.sort_by}>
            Sort by
          </label>
          <select
            id="sort_type"
            className={styles.sort_select}
            value={sortType}
            onChange={e => handleSortChange(e.target.value as any)}
          >
            <option value="Newest">Newest</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="Cheapest">Cheapest</option>
          </select>
        </div>

        <div className={styles.sort}>
          <label htmlFor="items_per_page" className={styles.sort_by}>
            items on page
          </label>
          <select
            id="items_per_page"
            className={`${styles.sort_select} ${styles.item}`}
            value={typeof perPage === 'number' ? perPage.toString() : 'all'}
            onChange={e => {
              const value = e.target.value;
              const newPerPage = value === 'all' ? 'all' : Number(value);
              handlePerPageChange(newPerPage);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className={styles.content}>
        {paginated.map(product => (
          <div className={styles.cardWrapper} key={product.id}>
            <CardItem product={product} />
          </div>
        ))}
      </div>

      {perPage !== 'all' && (
        <Pagination
          total={total}
          perPage={perPage as number}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductsList;
