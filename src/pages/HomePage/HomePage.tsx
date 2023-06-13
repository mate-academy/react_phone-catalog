import './HomePage.scss';

import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories/Categories';

type Props = {
  products: Product[],
  addProductToCart: (product: Product) => void,
};

export const HomePage: React.FC<Props> = ({
  products,
  addProductToCart,
}) => {
  return (
    <>
      <section className="page__section home-page">
        <div className="home-page__container">
          <Carousel />

          <div className="home-page__block">
            <ProductsSlider
              title="Hot price"
              products={products}
              addProductToCart={addProductToCart}
            />
          </div>

          <div className="home-page__block categories">
            <Categories
              phonesCount={products.length}
            />
          </div>

          <div className="home-page__block home-page__block--last">
            <ProductsSlider
              title="Brand new models"
              products={products}
              addProductToCart={addProductToCart}
            />
          </div>
        </div>
      </section>
    </>
  );
};
