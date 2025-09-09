import { Category } from '@shared/api';
import styles from './styles/categoriesPage.module.scss';
import { Dropdown, CataloguePagination } from './ui';
import { useCatalogue, filter, pPage } from './model';
import { useProdCard } from '@features/index';
import { ProductCard } from '@entities/prodCard';
import { Breadcrumbs } from '@ui/index';

type Props = {
  category: Exclude<Category, Category.ALL>;
};

export const CategoriesPage = ({ category }: Props) => {
  const links = {
    name: category as string,
    to: category as string,
  };
  const { data, set, currentOrder, currentPerPage, pages, currentPage } =
    useCatalogue({
      category,
    });
  const { isIn, stateHandlers } = useProdCard();

  return (
    <section className={styles.container}>
      <nav aria-label="breadcrumb" className={styles.navigation}>
        <Breadcrumbs links={[links]} />
      </nav>

      <h1 className={styles.h1}>{category}</h1>
      <span className={styles.models}>{data.length}</span>
      <div className={styles.wrapper}>
        <Dropdown data={filter} setFilter={set.order} active={currentOrder} />
        <Dropdown data={pPage} setFilter={set.amount} active={currentPerPage} />
      </div>
      <ul className={styles.catalogue}>
        {data.items &&
          data.items.length !== 0 &&
          data.items.map(el => (
            <ProductCard
              key={el.key}
              product={el}
              isIn={isIn}
              stateHandlers={stateHandlers}
            />
          ))}
      </ul>
      {pages.current > 1 && (
        <CataloguePagination
          pages={pages.current}
          currentPage={currentPage.current}
          setPage={set.page}
        />
      )}
    </section>
  );
};
