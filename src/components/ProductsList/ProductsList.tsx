import React, { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../../utils/serviceData';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { useTranslation } from 'react-i18next';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
};

export const ProductsList: React.FC<Props> = ({ type }) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || '1';

  const loadData = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const data = await getProducts();

      let filtered = data.filter(product => product.category === type);

      switch (sort) {
        case 'title':
          filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'price':
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;

        case 'age':
        default:
          filtered = [...filtered].sort((a, b) => b.year - a.year);
      }

      setProducts(filtered);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [type, sort]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  let visibleProducts = products;
  const isPaginationEnabled = perPage !== 'all';
  const limit = isPaginationEnabled ? Number(perPage) : products.length;

  if (isPaginationEnabled) {
    const start = (+currentPage - 1) * limit;
    const end = start + limit;

    visibleProducts = products.slice(start, end);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  if (!products) {
    return (
      <h1 className="no-product-yet">
        {t('there-are-no')} {type} {t('yet')}
      </h1>
    );
  }

  return (
    <div className="products-list-container">
      <div className="products-list">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isPaginationEnabled && (
        <Pagination
          total={products.length}
          perPage={limit}
          currentPage={+currentPage}
        />
      )}
    </div>
  );
};
