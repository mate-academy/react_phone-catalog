import { Category } from '@shared/api';
import styles from './styles/categoriesPage.module.scss';
import { Dropdown, CataloguePagination, CatalogueGrid } from './ui';
import { useCatalogue, filter, pPage } from './model';
import { Breadcrumbs } from '@ui/index';
import { LoadingStates } from '@features/index';

type Props = {
  category: Category;
};

export const CategoriesPage = ({ category }: Props) => {
  const links = {
    name: category as string,
    to: category as string,
  };
  const { data, set, currentOrder, currentPerPage, length } = useCatalogue({
    category,
  });

  return (
    <section className={styles.container}>
      <nav aria-label="breadcrumb" className={styles.navigation}>
        <Breadcrumbs links={[links]} />
      </nav>

      <h1 className={styles.h1}>{category}</h1>
      <span className={styles.models}>
        {length === LoadingStates.LOADING
          ? LoadingStates.LOADING
          : `${length} models`}
      </span>
      <div className={styles.wrapper}>
        <Dropdown data={filter} setFilter={set.order} active={currentOrder} />
        <Dropdown data={pPage} setFilter={set.amount} active={currentPerPage} />
      </div>
      <CatalogueGrid data={data} category={category} />
      {typeof data === 'object' && data.pages > 1 && (
        <CataloguePagination
          pages={data.pages}
          currentPage={data.currentPage}
          setPage={set.page}
        />
      )}
    </section>
  );
};
