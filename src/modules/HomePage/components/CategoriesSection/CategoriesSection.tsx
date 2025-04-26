import { resolveImagePath } from 'utils/appImagePath';
import styles from './CategoriesSection.module.scss';
import { CategoryCard } from 'components/CategoryCard';
import { useNavigate } from 'react-router-dom';

export const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <span className={styles.container__title}>Shop by category</span>
      <div className={styles.container__content}>
        <CategoryCard
          onClick={() => navigate('/phones')}
          backgroundColor={' bisque'}
          imgUrl={resolveImagePath('/img/category-phones.png')}
          title={'Mobile phones'}
          description={'95 models'}
        />
        <CategoryCard
          onClick={() => navigate('/tablets')}
          backgroundColor={'#89939A'}
          imgUrl={resolveImagePath('/img/category-tablets.webp')}
          title={'Tablets'}
          description={'24 models'}
          imgTransform={'translate(50px, 40px)'}
        />
        <CategoryCard
          onClick={() => navigate('/accessories')}
          backgroundColor={'pink'}
          imgUrl={resolveImagePath(
            '/img/accessories/apple-watch-se/gold/01.webp',
          )}
          title={'Accessories'}
          description={'100 models'}
          imgTransform={'translate(50px, 40px)'}
        />
      </div>
    </section>
  );
};
