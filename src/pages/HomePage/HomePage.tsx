import { Link } from 'react-router-dom';
import { Carousel } from '../../components/Carousel';
import { Slider } from '../../components/Slider';
import { getBrandNewProduct } from '../../helpers/getBrandNewProducts';
import { getHotPriceProduct } from '../../helpers/getHotPriceProducts';
import { Product } from '../../types/Product';
import './HomePage.scss';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const phones = products.filter(product => product.type === 'phone');
  const tablets = products.filter(product => product.type === 'tablet');
  const accessories = products.filter(product => product.type === 'accessory');
  const hotPriceProducts = getHotPriceProduct(products);
  const newProducts = getBrandNewProduct(products);

  return (
    <div className="HomePage">
      <section className="HomePage__section">
        <Slider />
      </section>

      <section className="HomePage__section">
        <Carousel
          title="Hot prices"
          products={hotPriceProducts}
        />
      </section>

      <h1>Shop by category</h1>
      <br />
      <br />
      <section className="HomePage__section HomePage__category">
        <div>
          <Link to="/phones">
            <div
              className="HomePage__category-img-container color-option--pink"
            >
              <img
                src="img/category/phones.png"
                alt="phones"
                className="HomePage__category-img"
              />
            </div>
          </Link>
          <h3>Mobile phones</h3>
          <span className="text text--light">
            {`${phones.length} models`}
          </span>
        </div>
        <div>
          <Link to="/tablets">
            <div
              className="
                HomePage__category-img-container color-option--light-grey
              "
            >
              <img
                src="img/category/tablets.png"
                alt="tablets"
                className="HomePage__category-img"
              />
            </div>
          </Link>
          <h3>Tablets</h3>
          <span className="text text--light">
            {`${tablets.length} models`}
          </span>
        </div>
        <div>
          <Link to="/accessories">
            <div
              className="HomePage__category-img-container color-option--purple"
            >
              <img
                src="img/category/accessories.png"
                alt="accessories"
                className="HomePage__category-img"
              />
            </div>
          </Link>
          <h3>Accessories</h3>
          <span className="text text--light">
            {`${accessories.length} models`}
          </span>
        </div>
      </section>

      <section className="HomePage__section">
        <Carousel
          title="Brand new models"
          products={newProducts}
        />
      </section>
    </div>
  );
};
