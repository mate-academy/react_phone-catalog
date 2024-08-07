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
  const phonesCount = products.filter(
    (product: Product) => product.category === 'phones',
  ).length;
  const tabletsCount = products.filter(
    (product: Product) => product.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    (product: Product) => product.category === 'accessories',
  ).length;
  const categoriesData = {
    phones: phonesCount,
    tablets: tabletsCount,
    accessories: accessoriesCount,
  };

  return (
    <>
      <Title hidden>Product Catalog</Title>
      <Title level={HeadingLevel.h2}>Welcome to Nice Gadgets store!</Title>
      <MainSlider />
      {newProducts.length && (
        <>
          <Title level={HeadingLevel.h2}>Brand new models</Title>
          <ProductsSlider products={newProducts} />
        </>
      )}
      <Categories data={categoriesData} />
      {hotPriceProducts.length && (
        <>
          <Title level={HeadingLevel.h2}>Hot prices</Title>
          <ProductsSlider products={hotPriceProducts} showFullPrice />
        </>
      )}
    </>
  );
};
