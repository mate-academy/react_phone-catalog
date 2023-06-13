import { Carousel } from '../../components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Category } from '../../components/Category';
import { SortBy, sortProducts } from '../../helpers/fuctions/sortProducts';
import { Product } from '../../helpers/types/Product';

type Props = {
  products: Product[] | null;
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const topAmount = 20;
  const hotProducts = sortProducts(products, SortBy.Discount);
  const newestProducts = sortProducts(products, SortBy.Expensive);
  const productsAmounts = {
    phonesAmount: products?.filter(pr => pr.category === 'phones').length || 0,
    tabletsAmount: products?.filter(
      pr => pr.category === 'tablets',
    ).length || 0,
    accessoriesAmount: products?.filter(
      pr => pr.category === 'accessories',
    ).length || 0,
  };

  return (
    <section className="App__home-page home-page">
      <div className="home-page__container _container">
        <Carousel />

        <ProductsSlider
          title={`Hot prices — TOP ${topAmount}`}
          products={hotProducts}
          topAmount={topAmount}
        />

        <Category
          productsAmounts={productsAmounts}
        />

        <ProductsSlider
          title={`Brand new models — TOP ${topAmount}`}
          products={newestProducts}
          topAmount={topAmount}
        />
      </div>
    </section>
  );
};
