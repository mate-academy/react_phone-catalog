import './HomePage.scss';
import { useContext } from 'react';
import { GlobalContext } from '../../store';
import { Carousel } from '../../components/Carousel';
import { Loader } from '../../components/Loader/Loader';
import { ProductSlider } from '../../components/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';

export const HomePage = () => {
  const { products, isLoading } = useContext(GlobalContext);

  const productsByDiscount = getHotPriceProducts(products);
  const productsByAge = getBrandNewProducts(products);

  return (
    <div className="home-page__container">
      {isLoading ? <Loader /> : (
        <>
          <Carousel />

          <section className="section-prices">
            <ProductSlider title="Hot prices" products={productsByDiscount} />
          </section>

          <ShopByCategory />

          <ProductSlider products={productsByAge} title="Brand new models" />
        </>
      )}
    </div>
  );
};
