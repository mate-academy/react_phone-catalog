// eslint-disable-next-line max-len
import { ProductsCarousel } from '../../../../shared/components/ProductsCarousel/ProductsCarousel';
import { Product } from '../../../../types/Product';

type Props = {
  productsList: Product[];
};

export const HotPricesBlock: React.FC<Props> = ({ productsList }) => {
  const hotPriceProducts = productsList
    .sort(
      (item1, item2) =>
        item2.fullPrice / item2.price - item1.fullPrice / item1.price,
    )
    .slice(0, 30)
    .sort((item1, item2) => item2.category.localeCompare(item1.category));

  return (
    <ProductsCarousel
      sectionTitle="Hot prices"
      products={hotPriceProducts}
      isDiscountRequired={true}
    />
  );
};
