import { CategorySrc } from '../../types/Categorys';
import { Category } from '../Category';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const categoryLinks: CategorySrc[] = ['/phones', '/tablets', '/accessories'];

  return (
    <div className={styles.categorys}>
      {categoryLinks.map(link => (
        <div className={styles.category} key={link}>
          <Category src={link} />
        </div>
      ))}
    </div>
  );
};
