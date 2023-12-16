import { ProductsSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { Banner } from '../components/Banner';
import { useMyContext } from '../context/context';

export const HomePage = () => {
  const { products } = useMyContext();

  return (
    <div className="home">
      <Banner />

      <ProductsSlider
        products={products}
        title="Hot prices"
      />

      <div className="home__header">
        <h1 className="home__header--title">Shop by category</h1>
        <ShopByCategory />
      </div>

      <ProductsSlider
        products={products}
        title="Brand new models"
      />

    </div>
  );
};
