import styles from '../styles/categoriesPage.module.scss';
import { AriaNames } from '@shared/types/ButtonProps';
import { Link } from 'react-router-dom';
import { useCategoriesContext } from '../model';

//todo: useEnum mask path;

export const CategoriesContent = () => {
  const { category } = useCategoriesContext();

  return (
    <div className={styles.container}>
      <nav aria-label="breadcrumb">
        <ol className={styles.breadcrumbs}>
          <li>
            <Link
              to="/"
              aria-label={AriaNames.Home}
              className={styles.breadcrumbs__home}
              style={{ backgroundImage: 'url(/src/shared/icons/home.svg)' }}
            />
          </li>
          <li>
            <span className={styles.breadcrumbs__btn}>{category}</span>
          </li>
        </ol>
      </nav>

      <h1 className={styles.h1}>{category}</h1>
    </div>
  );
};
