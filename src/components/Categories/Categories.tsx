import { Product } from '../../types/Product';
import { CategoryCard } from '../CategoryCard';

import styles from './Categories.module.scss';

type Props = {
  products: Product[];
};

const getPublicImagePath = (fileName: string) => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${baseUrl}img/${fileName}`;
};

export const Categories = ({ products }: Props) => {
  const phonesCount = products.filter(product => {
    return product.category === 'phones';
  }).length;

  const tabletsCount = products.filter(product => {
    return product.category === 'tablets';
  }).length;

  const accessoriesCount = products.filter(product => {
    return product.category === 'accessories';
  }).length;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <CategoryCard
          title="Mobile phones"
          count={phonesCount}
          image={getPublicImagePath('category-phones.png')}
          path="/phones"
          imageWrapperClassName={styles.phonesWrapper}
          imageClassName={styles.phonesImage}
        />

        <CategoryCard
          title="Tablets"
          count={tabletsCount}
          image={getPublicImagePath('category-tablets.png')}
          path="/tablets"
          imageWrapperClassName={styles.tabletsWrapper}
          imageClassName={styles.tabletsImage}
        />

        <CategoryCard
          title="Accessories"
          count={accessoriesCount}
          image={getPublicImagePath('category-accessories.png')}
          path="/accessories"
          imageWrapperClassName={styles.accessoriesWrapper}
          imageClassName={styles.accessoriesImage}
        />
      </div>
    </section>
  );
};
