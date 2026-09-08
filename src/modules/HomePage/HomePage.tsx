import { MainSlider } from '../../components/MainSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';
import { Title } from '../../components/Title';
import { HeadingLevel } from '../../types/HeadingLevel';
import { Product } from '../../types/Product';
import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  const products = useAppSelector(state => state.products);
  const years = products.map((product: Product) => product.year);
  const hotPriceProducts = products.filter(
    (product: Product) => product.fullPrice - product.price > 120,
  );
  const latestYear = Math.max(...years);
  const newProducts = products.filter(
    (product: Product) => product.year === latestYear,
  );

  return (
    <>
      <Title hidden>Product Catalog</Title>
      <Title level={HeadingLevel.h2}>Welcome to Nice Gadgets store!</Title>
      <MainSlider />

      {newProducts.length > 0 && (
        <>
          <Title level={HeadingLevel.h2}>Brand new models</Title>
          <ProductsSlider products={newProducts} />
        </>
      )}

      <Categories products={products} />

      {hotPriceProducts.length > 0 && (
        <>
          <Title level={HeadingLevel.h2}>Hot prices</Title>
          <ProductsSlider products={hotPriceProducts} showFullPrice />
        </>
      )}
    </>
  );
};
