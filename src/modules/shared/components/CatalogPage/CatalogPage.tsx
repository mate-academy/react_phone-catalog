import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import SliderItem from '../SliderItem/SliderItem';
import { Product } from '@/types/Product';
import { useParams, useSearchParams } from 'react-router-dom';
import { CardSkeleton } from '../SliderItem/CardSkeleton';
import styles from './CatalogPage.module.scss';
import CustomSelect from '../CustomSelect/CustomSelect';

type CatalogPageProps = {
  fetchReq: () => Promise<Product[]>;
};

const CatalogPage: React.FC<CatalogPageProps> = ({ fetchReq }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const sort = searchParams.get('sort');
  const limit = searchParams.get('limit');

  useEffect(() => {
    const newTitle = formatTitle(category);
    setLoading(true);
    fetchReq()
      .then(products => {
        if (sort) {
          products = products.sort((a, b) => {
            if (sort === 'age') {
              return b.year - a.year; // Новіші спочатку
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

  let preparedProducts = products;

  if (category) {
    const normalized = category.toLowerCase();
    preparedProducts = products.filter(
      product => product.category.toLowerCase() === normalized,
    );
  }
  const skeletons = Array(8).fill(null);

  const formatTitle = (param: string | undefined): string => {
    // Приклад: "smartphones" -> "Смартфони"
    // Приклад: "laptops" -> "Ноутбуки"
    switch (param) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      // Додайте більше кейсів
      case 'accessories':
        return 'Accessories';
      default:
        // Перетворюємо 'some-category' на 'Some Category'
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
      <PageHeader title={formatTitle(category)} />

      <div className={styles.catalog__modelsCount}>
        {preparedProducts.length} models
      </div>

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
          param="limit"
          label="Items on page"
          arrayOptions={[
            { label: '4', value: 4 },
            { label: '8', value: 8 },
            { label: '16', value: 16 },
            { label: 'All', value: 'all' },
          ]}
        />
      </div>

      <div className={styles.catalog__container}>
        {loading
          ? skeletons.map((_, index) => <CardSkeleton key={index} />)
          : preparedProducts.map(product => (
              <SliderItem key={product.id} item={product} showDiscount={true} />
            ))}
      </div>
    </div>
  );
};

export default CatalogPage;
