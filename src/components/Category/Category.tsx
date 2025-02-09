import { useEffect, useState } from 'react';
import styles from './Category.module.scss';
import { getCategoryItems } from '../../utils/FetchClient';
import { Link } from 'react-router-dom';
import {
  CategoryDates,
  CategorySrc,
  findCategoryDates,
} from '../../types/Categorys';

type Props = {
  src: CategorySrc;
};

export const Category: React.FC<Props> = ({ src }) => {
  const [currentCategory, setCurrentCategory] =
    useState<CategoryDates | null>();
  const [itemsNum, setItemsNum] = useState(0);

  useEffect(() => {
    setCurrentCategory(findCategoryDates(src));

    getCategoryItems(src)
      .then(items => setItemsNum(items.length))
      .catch(error => {
        throw error;
      });
  }, []);

  return (
    <div className="categoryBoard">
      {currentCategory && (
        <div className={styles.category}>
          <Link
            to={src}
            className={`${styles.photoContainer} ${styles[`${currentCategory.name}Container`]}`}
          >
            <div
              className={`${styles.photo} ${styles.phonesPhoto} ${styles[`${currentCategory.name}Photo`]}`}
            />
          </Link>

          <div className={styles.categoryDescription}>
            <Link to={src}>
              <h3>{currentCategory.pageName}</h3>
            </Link>

            <p className="body-text-small grayText">{itemsNum} models</p>
          </div>
        </div>
      )}
    </div>
  );
};
