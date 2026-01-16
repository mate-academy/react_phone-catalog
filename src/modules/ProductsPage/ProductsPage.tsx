import { Link, useParams, useSearchParams } from 'react-router-dom';
import styles from './ProductsPage.module.scss';
import { NotFoundPage } from '../NotFoundPage';
import { useEffect, useState } from 'react';
import { Product } from '../shared/types/Product';
import { ProductsList } from './ProductsList';
import { Loader } from '../shared/components/Loader';
import Dropdown from '../shared/components/Dropdown/Dropdown';
import { Pagination } from '../shared/components/Pagination';
import { getSearchWith } from '../shared/utils/searchHelper';
import { checkResponse, wait } from '../shared/utils/apiHelper';
import ErrorMessage from '../shared/components/ErrorMessage/ErrorMessage';
import { STATUS, Status } from '../shared/utils/status';
import { NotFoundError, ServerError } from '../shared/utils/errorTypes';
import { NotFoundProduct } from '../NotFoundProduct';

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

export const ProductsPage = () => {
  const { type } = useParams<{ type?: string }>();
  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 'all';

  function setSearchWith(params) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleSortChange(value: string) {
    setSearchWith({ sort: value || null });
  }

  function handlePageChange(value: number) {
    setSearchWith({ page: value === 1 ? null : value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePerPageChange(value: string) {
    setSearchWith({
      perPage: value === 'all' ? null : Number(value),
      page: null,
    });
  }

  useEffect(() => {
    if (!VALID_TYPES.includes(type as Type)) {
      setStatus(STATUS.NOT_FOUND_PAGE);

      return;
    }

    const load = async () => {
      try {
        setStatus(STATUS.LOADING);
        setErrorMessage('');

        await wait(500);

        const productsRes = checkResponse(await fetch('api/products.json'));
        const productsFromServer: Product[] = await productsRes.json();

        const filteredProducts = productsFromServer.filter(
          product => product.category.toLowerCase() === type,
        );

        if (!filteredProducts.length) {
          throw new NotFoundError('Product not found');
        }

        setProducts(filteredProducts);
        setStatus(STATUS.SUCCESS);
      } catch (err) {
        if (err instanceof NotFoundError) {
          setStatus(STATUS.NOT_FOUND_PRODUCT);
        } else if (err instanceof ServerError) {
          setErrorMessage(`Server error (${err.status})`);
          setStatus(STATUS.ERROR);
        } else {
          setErrorMessage('Something went wrong');
          setStatus(STATUS.ERROR);
        }
      }
    };

    load();
  }, [type]);

  switch (status) {
    case STATUS.LOADING:
      return <Loader />;

    case STATUS.NOT_FOUND_PAGE:
      return <NotFoundPage />;

    case STATUS.NOT_FOUND_PRODUCT:
      return <NotFoundProduct />;

    case STATUS.ERROR:
      return <ErrorMessage errorMessage={errorMessage} />;

    case STATUS.SUCCESS:
      return (
        <div className={styles.section}>
          <div className={styles.breadcrumbs}>
            <Link to="/" className={styles.link}>
              <img
                src="img/icons/home.png"
                alt="Home"
                className={styles.icon}
              />
            </Link>
            <img
              src="img/icons/arrow-right.png"
              alt="Breadcrumbs Separator"
              className={styles.icon}
            />
            <p className={styles.breadcrumbText}>{type}</p>
          </div>

          <h1 className={styles.sectionTitle}>{type} page</h1>

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
        </div>
      );

    default:
      return null;
  }
};
