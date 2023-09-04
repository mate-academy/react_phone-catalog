import './HomePage.scss';
import {
  BannerSlider,
  Categories,
  ProductsSlider,
  Wrapper,
} from '../../components';
import { useProducts } from '../../context';

export const HomePage = () => {
  const { products } = useProducts();

  return (
    <div className="home">
      <Wrapper>
        <div className="home__banner-container">
          <BannerSlider />
        </div>

        <Categories />

        <div className="home__hot-prices-container">
          <ProductsSlider
            products={products}
            title="hot prices"
          />
        </div>

        <div className="home__brand-new-container">
          <ProductsSlider
            products={products}
            title="brand new models"
          />
        </div>
      </Wrapper>
    </div>
  );
};
