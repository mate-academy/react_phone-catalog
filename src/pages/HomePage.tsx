import { Carousel } from '../components/Carousel';
import { Category } from '../components/Category';
import { ProductsSlider } from '../components/ProductsSlider';
import { SortBy, sortProducts } from '../helpers/sortProduct';
import { Product } from '../types/Product';

type Props = {
  products: Product[] | null,
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const hotProducts = sortProducts(products, SortBy.Discount);
  const topAmount = 20;
  const productsAmounts = {
    phonesAmount: products?.filter(pr => pr.category === 'phones').length || 0,
    tabletsAmount: products?.filter(
      pr => pr.category === 'tablets',
    ).length || 0,
    accessoriesAmount: products?.filter(
      pr => pr.category === 'accessories',
    ).length || 0,
  };
  const newestProducts = sortProducts(products, SortBy.Age);

  return (
    <section className="App__home-page home-page">
      <div className="home-page__container">
        <Carousel />
        <ProductsSlider
          products={hotProducts}
          topAmount={topAmount}
          title="Hot prices"
        />
        <Category productsAmounts={productsAmounts} />
        <ProductsSlider
          title="Brand new models"
          products={newestProducts}
          topAmount={topAmount}
        />
      </div>
    </section>
  );
};
