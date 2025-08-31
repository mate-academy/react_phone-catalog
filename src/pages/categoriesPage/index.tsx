import { Category } from '@shared/api';
import styles from './styles/categoriesPage.module.scss';
import { Breadcrumbs, Dropdown } from './ui';
import { filter, perPage } from './model/dropdownConfig';
import { useCatalogue } from './model';
import { useProdCard } from '@entities/prodCard/model/useProdCard';
import { ProductCard } from '@entities/prodCard';
type Props = {
  category: Category;
};

export const CategoriesPage = ({ category }: Props) => {
  const links = {
    name: category as string,
    to: category as string,
  };
  const { items } = useCatalogue(category);
  const { isIn, stateHandlers } = useProdCard();
  const models = '1488';

  return (
    <section className={styles.container}>
      <nav aria-label="breadcrumb" className={styles.navigation}>
        <Breadcrumbs links={[links]} />
      </nav>

      <h1 className={styles.h1}>{category}</h1>
      <span className={styles.models}>{models}</span>
      <div className={styles.wrapper}>
        <Dropdown data={filter} />
        <Dropdown data={perPage} />
      </div>
      <div className={styles.catalogue}>
        {items &&
          items.map(el => (
            <ProductCard
              key={el.key}
              product={el}
              isIn={isIn}
              stateHandlers={stateHandlers}
            />
          ))}
      </div>
    </section>
  );
};
