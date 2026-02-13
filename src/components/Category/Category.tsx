import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';
import {
  CategoryDates,
  CategorySrc,
  findCategoryDates,
} from '../../types/Categorys';
import { ProductContext } from '../Contexts/ProductsContext';

type Props = {
  src: CategorySrc;
};

export const Category: React.FC<Props> = ({ src }) => {
  const { products } = useContext(ProductContext);

  const [currentCategory, setCurrentCategory] =
    useState<CategoryDates | null>();

  const categoryItemsNum = useMemo(() => {
    if (currentCategory) {
      return products.filter(item => item.category === currentCategory.name)
        .length;
    }

    return 0;
  }, [currentCategory, products]);

  useEffect(() => {
    setCurrentCategory(findCategoryDates(src));
  }, [src]);

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

            <p className="body-text-small grayText">
              {categoryItemsNum} models
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
