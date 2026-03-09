//react-router
import { useNavigate, useSearchParams } from 'react-router-dom';

//hooks
import { useEffect, useMemo, useState } from 'react';

//styles
import styles from './Catalog.module.scss';

//types
import { ProductDetailed } from '../../types/product';

//components
import { FiltersBar } from '../../components/FiltersBar';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/Loader';

//services
import { getProductsByType } from '../../services/api';
import { getSearchWith } from '../../utils/searchHelper';
import { getSortedProducts } from '../../utils/productSortHelper';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  productsType: string;
};

export const CatalogPage: React.FC<Props> = ({ productsType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductDetailed[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  const pageTitle =
    productsType === 'phones' ? `mobile ${productsType}` : productsType;
  const sort = searchParams.get('sort');

  const sortedProducts = useMemo(
    () => getSortedProducts(products, sort),
    [products, sort],
  );

  const page = Number(searchParams.get('page')) || 1;

  const limit =
    searchParams.get('perPage') === 'all'
      ? sortedProducts.length
      : Number(searchParams.get('perPage')) || 16;

  const start = (page - 1) * limit;
  const visibleProducts = sortedProducts.slice(start, start + limit);

  useEffect(() => {
    async function loadProducts() {
      try {
        scrollToTop();
        setIsLoading(true);
        const data = await getProductsByType(productsType);

        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [productsType]);

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

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <>
      {!isLoading && (
        <div className={styles.products}>
          {/* <div className={styles.pages}>Comming soon</div> */}
          <Breadcrumbs
            currentLoc={productsType}
            className={styles.breadcrumbs}
          ></Breadcrumbs>

          <h1 className={styles.title}>{pageTitle}</h1>

          <p className={styles.listLength}>{`${products.length} models`}</p>
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
      )}
    </>
  );
};
