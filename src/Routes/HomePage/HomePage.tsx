import { Banner } from '../../components/HomePage/Banner/Banner';
import { ShopCategories } from '../../components/HomePage/ShopCategories/ShopCategories';
import { ProductCardSlider } from '../../components/ProductCardSlider/ProductCardSlider';
import { useProducts } from '../../contexts/productsContext';
import { getBrandNewProducts, getHotPriceProducts } from '../../helpers/filters';
import './HomePage.scss';

const HomePage = () => {
  const { products } = useProducts();

  return (
    <div className="home-page">
      <Banner />
      <section className="home-page__section">
        <ProductCardSlider
          title="Hot prices"
          products={getHotPriceProducts(products.phones)}
        />
      </section>

      <section className="home-page__section">
        <ShopCategories />
      </section>

      <section className="home-page__section">
        <ProductCardSlider
          title="Brand new models"
          products={getBrandNewProducts(products.phones)}
        />
      </section>
    </div>
  );
};

export default HomePage;
