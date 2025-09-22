import styles from './styles/productPage.module.scss';
import { Breadcrumbs, loaderTextMap } from '@ui/index';
import { ArrowIcon } from '@shared/icons';
import { Status } from '@features/index';
import { useProductPage } from './model/useProductPage';
import { Product } from '@shared/types';

export const ProductPage = () => {
  const item = useProductPage();

  return (
    <section className={styles.container}>
      <nav aria-label="breadcrumb" className={styles.navigation}>
        {typeof item !== 'string' ? (
          <Breadcrumbs
            links={[
              {
                name: item.category,
                to: item.category,
              },
              {
                name: item.name,
                to: `/products/${item.id}`,
              },
            ]}
          />
        ) : (
          item
        )}
      </nav>
      <button className={styles['return-button']}>
        <ArrowIcon direction="left" />
        Back
      </button>
      <h1 className={styles.h1}>
        {typeof item === 'string' &&
        (item === Status.LOADING || item === Status.ERROR)
          ? loaderTextMap[item]
          : (item as Product).name}
      </h1>
    </section>
  );
};
