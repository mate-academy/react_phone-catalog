import { Link } from 'react-router-dom';
import { getShopByCategory } from '../../../services/products';
import { getAssetPath } from '../../../utils/assets';
import styles from './CategoryLinks.module.scss';

const categoryImages: Record<string, string> = {
  phones: getAssetPath('img/figma/category-phones.png'),
  tablets: getAssetPath('img/figma/category-tablets.png'),
  accessories: getAssetPath('img/figma/category-accessories.png'),
};

const categoryCounts: Record<string, string> = {
  phones: '95 models',
  tablets: '24 models',
  accessories: '100 models',
};

export const CategoryLinks = () => {
  const categories = getShopByCategory();

  return (
    <section className={styles.categories}>
      {categories.map(item => (
        <Link key={item.category} to={item.path} className={styles.card}>
          <div className={styles.imageWrap}>
            <img src={categoryImages[item.category]} alt="" />
          </div>
          <h3>{item.label}</h3>
          <p>{categoryCounts[item.category]}</p>
        </Link>
      ))}
    </section>
  );
};
