import { useMemo } from 'react';
import { CategoryCard } from '../../../shared/components/categoryCard';

import styles from './SectionCategory.module.scss';
import { Products } from '../../../../types/Products';

type Props = {
  products: Products[];
};

export const SectionCategory: React.FC<Props> = ({ products }) => {
  const productQuantity = useMemo(() => {
    const result: { [key: string]: number } = {};

    products.forEach(p => {
      if (!Object.hasOwn(result, p.category)) {
        result[p.category] = 1;

        return;
      }

      result[p.category]++;
    });

    return result;
  }, [products]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <CategoryCard
        to={'/phones'}
        cardName={'Mobile phones'}
        imgSrc={'img/category-img/category-phones.webp'}
        countModels={productQuantity.phones}
        color={'phones'}
      />
      <CategoryCard
        to={'/tablets'}
        cardName={'Tablets'}
        imgSrc={'img/category-img/category-tablets-new.png'}
        countModels={productQuantity.tablets}
        color={'tablets'}
      />
      <CategoryCard
        to={'/accessories'}
        cardName={'Accessories'}
        imgSrc={'img/category-img/category-accessories-new.png'}
        countModels={productQuantity.accessories}
        color={'accessories'}
      />
    </section>
  );
};
