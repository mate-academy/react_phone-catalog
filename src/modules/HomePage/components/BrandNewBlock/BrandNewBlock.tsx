import styles from './BrandNewBlock.module.scss';
// eslint-disable-next-line max-len
import { ProductsCarousel } from '../../../../shared/components/ProductsCarousel/ProductsCarousel';
import { Product } from '../../../../types/Product';

type Props = {
  productsList: Product[];
};

export const BrandNewBlock: React.FC<Props> = ({ productsList }) => {
  const sortedByNewModelsList = productsList.sort(
    (item1, item2) => item2.year - item1.year,
  );

  const lastYear = sortedByNewModelsList[0].year;

  const brandNewList = productsList
    .filter(item => item.year === lastYear)
    .sort((item1, item2) => item2.price - item1.price);

  return (
    <section className={styles.brandNewBlock}>
      <ProductsCarousel
        sectionTitle="Brand new models"
        products={brandNewList}
        isDiscountRequired={false}
      />
    </section>
  );
};
