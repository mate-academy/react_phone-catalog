import './HomePage.scss';

import { Product } from '../../types/Product';
import { Carousel } from '../../components/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories/Categories';

type Props = {
  products: Product[],
};

export const HomePage: React.FC<Props> = ({
  products,
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
            />
          </div>
        </div>
      </section>
    </>
  );
};
