import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { NotFoundPage } from '../NotFoundPage';
import { useEffect, useState } from 'react';
import { Product } from '../shared/types/Product';
import { ProductsList } from './ProductsList';
import { Loader } from '../shared/components/Loader';
import Dropdown from '../shared/components/Dropdown/Dropdown';
import { Pagination } from '../shared/components/Pagination';
import { getSearchWith } from '../shared/utils/searchHelper';

const VALID_TYPES = ['phones', 'tablets', 'accessories'] as const;

type Type = (typeof VALID_TYPES)[number];

const sortOptions = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
];

const perPageOptions = [
  { label: 'All', value: 'all' },
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
];

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const ProductsPage = () => {
  const { type } = useParams<{ type?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 'all';

  const navigate = useNavigate();

  const reloadCurrentRoute = () => {
    navigate(0);
  };

  function setSearchWith(params) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleSortChange(value: string) {
    setSearchWith({ sort: value || null });
  }

  function handlePageChange(value: number) {
    setSearchWith({ page: value === 1 ? null : value });
  }

  function handlePerPageChange(value: string) {
    setSearchWith({
      perPage: value === 'all' ? null : Number(value),
      page: null,
    });
  }

  useEffect(() => {
    if (!VALID_TYPES.includes(type as Type)) {
      return;
    }

    setIsLoading(true);

    wait(100)
      .then(() => fetch(`api/products.json`))
      .then(res => res.json())
      .then(data => {
        const filteredProducts = data.filter(
          product => product.category.toLowerCase() === type,
        );

        if (filteredProducts.length) {
          setProducts(filteredProducts);
        } else {
          setErrorMessage(`There are no ${type} yet`);
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [type]);

  if (!VALID_TYPES.includes(type as Type)) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.section}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.link}>
          <img src="img/icons/home.png" alt="Home" className={styles.icon} />
        </Link>
        <img
          src="img/icons/arrow-right.png"
          alt="Breadcrumbs Separator"
          className={styles.icon}
        />
        <p className={styles.breadcrumbText}>{type}</p>
      </div>

      <h1 className={styles.sectionTitle}>{type} page</h1>

      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className={styles.errorMessageBlock}>
          <p className={styles.danger}>{errorMessage}</p>
          <a onClick={reloadCurrentRoute} className={styles.iconLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.iconLinkIcon}
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </a>
        </div>
      ) : (
        <>
          <p className={styles.productsCount}>{products.length} models</p>

          <div className={styles.filters}>
            <Dropdown
              label="Sort by"
              options={sortOptions}
              value={sort}
              onChange={handleSortChange}
            />
            <Dropdown
              style={{ '--dropdown-width': '128px' } as React.CSSProperties}
              label="Items on page"
              options={perPageOptions}
              value={perPage}
              onChange={handlePerPageChange}
            />
          </div>
          <ProductsList products={products} />

          {perPage !== 'all' && (
            <Pagination
              total={products.length}
              perPage={Number(perPage)}
              currentPage={Number(page)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
