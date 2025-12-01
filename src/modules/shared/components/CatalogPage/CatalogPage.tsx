import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import SliderItem from '../SliderItem/SliderItem';
import { Product } from '@/types/Product';
import { useParams, useSearchParams } from 'react-router-dom';
import { CardSkeleton } from '../SliderItem/CardSkeleton';
import styles from './CatalogPage.module.scss';
import CustomSelect from '../CustomSelect/CustomSelect';
import PaginationComponent from '../PaginationComponent/PaginationComponent';

type CatalogPageProps = {
  fetchReq: () => Promise<Product[]>;
};

const CatalogPage: React.FC<CatalogPageProps> = ({ fetchReq }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );
  // const [productsPerPage, setProductsPerPage] = useState<number | 'all'>('all');
  const { category } = useParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
    const newTitle = formatTitle(category);
    setLoading(true);
    fetchReq()
      .then(products => {
        if (sort) {
          products = products.sort((a, b) => {
            if (sort === 'age') {
              return b.year - a.year;
            }
            if (sort === 'title') {
              return a.name.localeCompare(b.name);
            }
            if (sort === 'price') {
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
  }, [category, sort]);
  useEffect(() => {
    if (perPage === 'all') {
      setPage(1);
    }
  }, [perPage]);
  let filteredProducts = products;
  if (perPage === 'all') {
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

  const totalCount = filteredProducts.length; // 👈 важливо: до slice()
  let visibleProducts = filteredProducts;

  if (perPage && perPage !== 'all') {
    const limit = Number(perPage);
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
  console.log(perPage);

  return (
    <div className={styles.catalog}>
      <PageHeader title={formatTitle(category)} />

      <div className={styles.catalog__modelsCount}>{totalCount} models</div>

      <div className={styles.catalog__controls}>
        <CustomSelect
          param="sort"
          label="Sort by"
          arrayOptions={[
            { label: 'Newest', value: 'age' },
            { label: 'Alphabetically', value: 'title' },
            { label: 'Cheapest', value: 'price' },
          ]}
        />

        <CustomSelect
          param="perPage"
          label="Items on page"
          arrayOptions={[
            { label: '4', value: 4 },
            { label: '8', value: 8 },
            { label: '16', value: 16 },
            { label: 'All', value: null },
          ]}
          defaultOption={3}
        />
      </div>

      <div className={styles.catalog__container}>
        {loading
          ? skeletons.map((_, index) => <CardSkeleton key={index} />)
          : visibleProducts.map(product => (
              <SliderItem key={product.id} item={product} showDiscount={true} />
            ))}
      </div>
      {perPage && (
        <PaginationComponent
          totalCount={totalCount}
          perPage={Number(perPage || 0)}
          currentPage={page}
        />
      )}
    </div>
    //TODO: fix catalogpage component(when i choise all items per page, it breaks. also need to fix pages when i set values that cant be)
  );
};

export default CatalogPage;
