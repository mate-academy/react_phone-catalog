import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import SliderItem from '../SliderItem/SliderItem';
import { Product } from '@/types/Product';
import { useParams, useSearchParams } from 'react-router-dom';
import { CardSkeleton } from '../SliderItem/CardSkeleton';
import styles from './CatalogPage.module.scss';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import { getProducts } from '@/api/api';
import { perPageOptions, sortOptions } from '../utils/constants/constants';

const CatalogPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState<string | null>(
    searchParams.get('sort') || '',
  );

  const [perPageOption, setPerPageOption] = useState<string | null>(
    searchParams.get('perPage') || '',
  );
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  const { category } = useParams();

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
    const newTitle = formatTitle(category);
    setLoading(true);
    getProducts()
      .then(products => {
        if (sortOption) {
          products = products.sort((a, b) => {
            if (sortOption === 'age') {
              return b.year - a.year;
            }
            if (sortOption === 'title') {
              return a.name.localeCompare(b.name);
            }
            if (sortOption === 'price') {
              return a.price - b.price;
            }
            return 0;
          });
        }
        setProducts(products);
      })
      .finally(() => {
        document.title = `${newTitle}`;
        setLoading(false);
      });
  }, [category, sortOption]);

  const handleSortChange = (value: string | null) => {
    setSortOption(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    // при зміні сорту краще скидати на першу сторінку
    params.set('page', '1');
    setPage(1);

    setSearchParams(params);
  };

  const handlePerPageChange = (value: string | null) => {
    setPerPageOption(value);

    const params = new URLSearchParams(searchParams);

    if (value && value !== 'all') {
      params.set('perPage', value);
      params.set('page', '1');
      setPage(1);
    } else {
      // якщо "all" — показуємо все, прибираємо perPage і page з URL
      params.delete('perPage');
      params.delete('page');
      setPage(1);
    }

    setSearchParams(params);
  };
  let filteredProducts = products;
  if (perPageOption === 'all') {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    setSearchParams(params);
  }

  if (category) {
    const normalized = category.toLowerCase();
    filteredProducts = products.filter(
      product => product.category.toLowerCase() === normalized,
    );
  }

  const totalCount = filteredProducts.length;
  let visibleProducts = filteredProducts;

  if (perPageOption && perPageOption !== 'all') {
    const limit = Number(perPageOption);
    const start = (page - 1) * limit;
    visibleProducts = filteredProducts.slice(start, start + limit);
  }
  const skeletons = Array(8).fill(null);

  const formatTitle = (param: string | undefined): string => {
    // Приклад: "smartphones" -> "Смартфони"
    switch (param) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return param
          ? param
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          : '';
    }
  };

  return (
    <div className={styles.catalog}>
      <PageHeader title={formatTitle(category)} variant="catalogPage" />

      <div className={styles.catalog__modelsCount}>{totalCount} models</div>

      <div className={styles.catalog__controls}>
        <CustomSelect
          label='Sort by'
          options={sortOptions}
          onChange={handleSortChange}
          value={sortOption}
        />

        <CustomSelect
          label='Items per page'
          value={perPageOption}
          onChange={handlePerPageChange}
          options={perPageOptions}
        />
      </div>

      <div
        className={`${styles.catalog__container} ${
          perPageOption
            ? styles.catalog__container_hasPagination
            : styles.catalog__container_noPagination
        }`}
      >
        {loading
          ? skeletons.map((_, index) => <CardSkeleton key={index} />)
          : visibleProducts.map(product => (
              <SliderItem key={product.id} item={product} showDiscount={true} />
            ))}
      </div>
      {perPageOption && (
        <PaginationComponent
          totalCount={totalCount}
          perPage={Number(perPageOption || 0)}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default CatalogPage;
