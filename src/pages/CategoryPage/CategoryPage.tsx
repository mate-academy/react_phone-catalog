import { useParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';
import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const CATEGORY_DATA: Record<string, { title: string; link: string }> = {
  phones: {
    title: 'Mobile Phones',
    link: 'Phones',
  },
  tablets: {
    title: 'Tablets',
    link: 'Tablets',
  },
  accessories: {
    title: 'Accessories',
    link: 'Accessories',
  },
};

export const CategoryPage = () => {
  const { category } = useParams();
  const categoryInfo = CATEGORY_DATA[category || 'phones'];

  return (
    <div className={`${styles.page} container`}>
      <Breadcrumbs />

      <h1 className={styles.page__title}>{categoryInfo.title}</h1>

      <p className={styles.page__subTitle}>95 models</p>

      <Catalog isSortingAvailable={true} />
    </div>
  );
};
