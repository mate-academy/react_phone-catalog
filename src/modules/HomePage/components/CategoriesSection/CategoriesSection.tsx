import styles from './CategoriesSection.module.scss';
import { CategoryCard } from 'components/CategoryCard';

export const CategoriesSection = () => {
  return (
    <section className={styles.container}>
      <span className={styles.container__title}>Shop by category</span>
      <div className={styles.container__content}>
        <CategoryCard
          backgroundColor={' bisque'}
          imgUrl="/img/category-phones.png"
          title={'Mobile phones'}
          description={'95 models'}
        />
        <CategoryCard
          backgroundColor={'#89939A'}
          imgUrl="/img/category-tablets.webp"
          title={'Tablets'}
          description={'24 models'}
          imgTransform={'translate(50px, 40px)'}
        />
        <CategoryCard
          backgroundColor={'pink'}
          imgUrl="/img/accessories/apple-watch-se/gold/01.webp"
          title={'Accessories'}
          description={'100 models'}
          imgTransform={'translate(50px, 40px)'}
        />
      </div>
    </section>
  );
};
