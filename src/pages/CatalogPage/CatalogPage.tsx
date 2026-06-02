import { useEffect, useMemo, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { Category } from './Category';
import { Dropdown } from './components/Dropdown';
import { ArrowIcon } from '../../components/icons/Arrow';
import { catalogConfig, CatalogType } from '../../utils/catalogConfig';
import { loadProducts } from '../../api/getData';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import classNames from 'classnames';
import { getVisibleProducts } from '../../utils/getVisibleProducts';
import { Path } from '../../components/Path';
import { useSearchParams } from 'react-router-dom';

type Props = {
  category: CatalogType;
};

export const CatalogPage = ({ category }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sortBy = searchParams.get('sort') || 'newest';
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || '16';
  const config = catalogConfig[category];

  useEffect(() => {
    const loadingData = async () => {
      setIsLoading(true);
      try {
        const data = await loadProducts(config.apiCatalog);

        setProducts(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadingData();
  }, [config.apiCatalog]);

  const categoryProducts = useMemo(
    () => products.filter(product => product.category === config.category),
    [products, config.category],
  );

  const updateParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (
        (key === 'page' && value === '1') ||
        (key === 'perPage' && value === 'all')
      ) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  const handlePrev = () => updateParams({ page: String(currentPage - 1) });
  const handleNext = () => updateParams({ page: String(currentPage + 1) });

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.ceil(categoryProducts.length / Number(perPage));
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  const visibleProducts = useMemo(() => {
    return getVisibleProducts({
      products,
      sortBy,
      perPage,
      category: config.category,
      page: currentPage,
    });
  }, [products, sortBy, perPage, config.category, currentPage]);

  const sortOptions = [
    { id: 1, label: 'Newest', value: 'newest' },
    { id: 2, label: 'Alphabetically', value: 'alphabetically' },
    { id: 3, label: 'Cheapest', value: 'price-asc' },
    { id: 4, label: 'Most expensive', value: 'price-desc' },
  ];

  const perPageOptions = [
    { id: 1, label: '4', value: 4 },
    { id: 2, label: '8', value: 8 },
    { id: 3, label: '16', value: 16 },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Path category={category} />
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.modelsCount}>{`${config.count} models`}</p>

          <div className={styles.filter}>
            <Dropdown
              label="Sort by"
              options={sortOptions}
              defaultValue="Newest"
              onChange={value =>
                updateParams({ sort: String(value), page: '1' })
              }
            />

            <Dropdown
              label="Items on page"
              options={perPageOptions}
              defaultValue={Number('16')}
              onChange={value =>
                updateParams({ perPage: String(value), page: '1' })
              }
            />
          </div>
        </div>

        <div className={styles.content}>
          <Category products={visibleProducts} />
        </div>

        <div className={styles.swipper}>
          <button
            className={`${styles.slider} ${styles.left}`}
            aria-label="Previous slide"
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            <ArrowIcon direction="left" />
          </button>
          {[...pages].map(page => (
            <button
              className={classNames(styles.pageNumber, {
                [styles.active]: currentPage === page,
              })}
              onClick={() => updateParams({ page: String(page) })}
              key={page}
            >
              {page}
            </button>
          ))}
          <button
            className={`${styles.slider} ${styles.right}`}
            aria-label="Next slide"
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
