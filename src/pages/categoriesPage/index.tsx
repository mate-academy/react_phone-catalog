import { BaseProduct, Category } from '@shared/types/APITypes';
import styles from './styles/categoriesPage.module.scss';
import { AriaNames } from '@shared/types/ButtonProps';
import { Link } from 'react-router-dom';
import { DropdownList } from './ui/filterDropdown/index';
import { useCategories } from './model/useCatFilter';
import { ProductCard } from '@entities/prodCard';
import { CataloguePagination } from './ui/pagination';

type Props = {
  category: Category;
};

//todo: useEnum mask path;

export const CategoriesPage = ({ category }: Props) => {
  const {
    visibleItems,
    setFilter,
    setAmount,
    setPage,
    totalPages,
    currentPage,
  } = useCategories({ category });

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
      <DropdownList setFilter={setFilter} setAmount={setAmount} />
      <main className={styles.catalogue}>
        {visibleItems.map((item: BaseProduct) => (
          <ProductCard key={item.id} product={item} />
        ))}
        <CataloguePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </main>
    </div>
  );
};
