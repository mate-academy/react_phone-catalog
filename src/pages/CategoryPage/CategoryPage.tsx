import styles from './CategoryPage.module.scss';
import { Pagination } from '../../components/Pagination';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CategoriesType } from '../../types/CategoriesType';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Loader } from '../../components/Loader';
import { ErrorComponent } from '../../components/ErrorComponent';
import { Dropdown } from '../../components/Dropdown';
import { typedMenuItems } from '../../types/ItemsOnPageType';
import { SortBy } from '../../types/SortBy';

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

interface CategoryPageProps {
  category: CategoriesType | null;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const categoryInfo = CATEGORY_DATA[category || 'phones'];
  const {
    products,
    handleSetProducts,
    isLoading,
    error,
    perPage,
    handleSetPerPage,
    sortBy,
    handleSetSortBy,
  } = useContext(AppContext)!;

  const sortByArray = Object.values(SortBy);

  useEffect(() => {
    if (category) {
      handleSetProducts(category);
    }
  }, [category, handleSetProducts]);

  const categoryProducts =
    products?.filter(product => product.category === category) || [];

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className={`${styles.page} container`}>
      <Breadcrumbs />

      <h1 className={styles.page__title}>{categoryInfo.title}</h1>

      <p className={styles.page__subTitle}>{categoryProducts?.length} models</p>

      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.page__catalog}>
          <div className={styles.page__sortContainer}>
            <div className={styles.page__sortBy}>
              <Dropdown
                label="Sort by"
                menuItems={sortByArray}
                activeItem={sortBy}
                onClick={handleSetSortBy}
              />
            </div>

            <div className={styles.page__itemsOnPage}>
              <Dropdown
                label="Items on page"
                menuItems={typedMenuItems}
                activeItem={perPage}
                onClick={handleSetPerPage}
              />
            </div>
          </div>

          <Pagination />
        </section>
      )}
    </div>
  );
};
