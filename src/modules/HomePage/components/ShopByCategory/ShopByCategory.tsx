import { categoriesList } from '../../constants/categories';
import { CategoryItem } from './CategoryItem/CategoryItem';

import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <div className={styles.categories}>
      <h2>Shop by category</h2>

      <div className={styles.categoriesContent}>
        {
          categoriesList.map((item) => (
            <CategoryItem key={item.category} category={item} />
          ))
        }
      </div>
    </div>
  )
}
