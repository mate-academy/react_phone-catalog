import styles from './styles/productPage.module.scss';
import { Breadcrumbs, loaderTextMap } from '@ui/index';
import { ArrowIcon } from '@shared/icons';
import { Status } from '@features/index';
import { useProductPage } from './model/useProductPage';
import { Slider } from '@widgets/slider';
import { SliderMode } from '@widgets/slider/model';

export const ProductPage = () => {
  const { prod } = useProductPage();

  return (
    <section className={styles.container}>
      <nav aria-label="breadcrumb" className={styles.navigation}>
        {typeof prod !== 'string' ? (
          <Breadcrumbs
            links={[
              {
                name: prod.category,
                to: prod.category,
              },
              {
                name: prod.name,
                to: `/products/${prod.id}`,
              },
            ]}
          />
        ) : (
          prod
        )}
      </nav>
      <button className={styles['return-button']}>
        <ArrowIcon direction="left" />
        Back
      </button>
      <h1 className={styles.h1}>
        {typeof prod === 'string' &&
        (prod === Status.LOADING || prod === Status.ERROR)
          ? loaderTextMap[prod]
          : prod.name}
      </h1>
      <Slider mode={SliderMode.PRODUCT_CARD} data={prod} title={''} />
    </section>
  );
};
