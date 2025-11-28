import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import SliderItem from '../SliderItem/SliderItem';
import { Product } from '@/types/Product';
import { useParams } from 'react-router-dom';
import { CardSkeleton } from '../SliderItem/CardSkeleton';
import styles from './CatalogPage.module.scss';
import CustomSelect from '../CustomSelect/CustomSelect';

type CatalogPageProps = {
  fetchReq: () => Promise<Product[]>;
};

const CatalogPage: React.FC<CatalogPageProps> = ({ fetchReq }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortSelectValue, setSortSelectValue] = useState<string>('');
  const [displayCountSelectValue, setDisplayCountSelectValue] =
    useState<number>(0);
  const { category } = useParams();
  useEffect(() => {
    const newTitle = formatTitle(category);

    // Встановлюємо новий заголовок сторінки

    setLoading(true);
    fetchReq()
      .then(products => {
        setProducts(products);
      })
      .finally(() => {
        document.title = `${newTitle}`;
        setLoading(false);
      });
  }, [category]);

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
          setSelectValue={setSortSelectValue}
          arrayOptions={['Price: Low to High', 'Price: High to Low', 'Newest']}
        />
        <CustomSelect
          setSelectValue={setDisplayCountSelectValue}
          arrayOptions={[8, 16, 32, 64]}
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
