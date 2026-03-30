//react-router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

//hooks
import { useEffect, useMemo } from 'react';

//styles
import styles from './Catalog.module.scss';

//components
import { FiltersBar } from '../../components/FiltersBar';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';

//services
import { getSearchWith } from '../../utils/searchHelper';
import { getSortedProducts } from '../../utils/productSortHelper';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useProducts } from '../../hooks/useProducts';

type Props = {
  productsType: string;
};

export const CatalogPage: React.FC<Props> = ({ productsType }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const pageTitle =
    productsType === 'phones' ? `mobile ${productsType}` : productsType;
  const sort = searchParams.get('sort');

  const { data: allProducts = [], isLoading } = useProducts();

  const categoryProducts = useMemo(() => {
    return allProducts.filter(p => p.category === productsType);
  }, [allProducts, productsType]);

  const sortedProducts = useMemo(
    () => getSortedProducts(categoryProducts, sort),
    [categoryProducts, sort],
  );

  const page = Number(searchParams.get('page')) || 1;

  const limit =
    searchParams.get('perPage') === 'all'
      ? sortedProducts.length
      : Number(searchParams.get('perPage')) || 16;

  const start = (page - 1) * limit;

  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(start, start + limit);
  }, [sortedProducts, start, limit]);

  useEffect(() => {
    const params: { sort?: string; page?: string; perPage?: string } = {};

    if (!searchParams.get('sort')) {
      params.sort = 'new';
    }

    if (!searchParams.get('page')) {
      params.page = '1';
    }

    if (!searchParams.get('perPage')) {
      params.perPage = '16';
    }

    if (Object.keys(params).length) {
      navigate(
        { search: getSearchWith(searchParams, params) },
        { replace: true },
      );
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <div className={styles.products}>
      <Breadcrumbs
        currentLoc={productsType}
        className={styles.breadcrumbs}
      ></Breadcrumbs>

      <h1 className={styles.title}>{pageTitle}</h1>

      <p className={styles.listLength}>{`${categoryProducts.length} models`}</p>
      <FiltersBar />

      <div className={styles.visibleProductsList}>
        {visibleProducts.map(product => (
          <ProductCard
            product={product}
            key={product.id}
            className={styles.card}
            onClick={() => navigate(`/${productsType}/${product.id}`)}
          />
        ))}
      </div>

      <Pagination
        totalItems={sortedProducts.length}
        numberOfButtons={4}
        page={page}
        perPage={limit}
      />
    </div>
  );
};
