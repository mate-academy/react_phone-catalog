import styles from './styles/categoriesPage.module.scss';
import { Dropdown, CataloguePagination } from './ui';
import { useCatalogue, filter, pPage } from './model';
import { Breadcrumbs } from '@ui/index';
import { Catalogue } from '@widgets/index';
import { Category } from '@shared/types';
import { UILoadStatus } from '@features/useUILoader';

type Props = {
  category: Category;
};

export const CategoriesPage = ({ category }: Props) => {
  const links = {
    name: category,
    to: category,
  };
  const { products, set, currentOrder, currentPerPage, length } = useCatalogue({
    category,
  });

  return (
    <main className={styles.container}>
      <nav aria-label="breadcrumb" className={styles.navigation}>
        <Breadcrumbs links={[links]} />
      </nav>

      <h1 className={styles.h1}>{category}</h1>
      <span className={styles.models}>
        {length === UILoadStatus.LOADING
          ? UILoadStatus.LOADING
          : `${length} models`}
      </span>
      <div className={styles.wrapper}>
        <Dropdown data={filter} setFilter={set.order} active={currentOrder} />
        <Dropdown data={pPage} setFilter={set.amount} active={currentPerPage} />
      </div>
      <Catalogue
        data={products}
        category={category}
        currentPerPage={currentPerPage}
      />
      {typeof products === 'object' && products.pages > 1 && (
        <CataloguePagination
          pages={products.pages}
          currentPage={products.currentPage}
          setPage={set.page}
        />
      )}
    </main>
  );
};
