import './HomePage.scss';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ImagesSlider } from '../../components/ImagesSlider';
import { Category } from '../../types/Category';
import { getCategoryName } from '../../helpers/funcs';
import { ProductsContext } from '../../contexts/ProductsContext';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const { products } = useContext(ProductsContext);

  const hotPriceProducts = [...products]
    .sort((a: Product, b: Product) => {
      return (b.fullPrice - b.price) - (a.fullPrice - a.price);
    });

  const brandNewProducts = [...products]
    .sort((a: Product, b: Product) => {
      return b.price - a.price;
    });

  const categoryProductsCount = {
    [Category.Phones]: 0,
    [Category.Tablets]: 0,
    [Category.Accessories]: 0,
  };

  products.forEach(product => {
    switch (product.category) {
      case Category.Phones:
        categoryProductsCount[Category.Phones] += 1;
        break;
      case Category.Tablets:
        categoryProductsCount[Category.Tablets] += 1;
        break;
      case Category.Accessories:
        categoryProductsCount[Category.Accessories] += 1;
        break;
      default:
        break;
    }
  });

  return (
    <div className="HomePage">
      <section className="HomePage__section">
        <ImagesSlider />
      </section>

      <section className="HomePage__section">
        <ProductsSlider
          sliderTitle="Hot prices"
          products={hotPriceProducts}
        />
      </section>

      <section className="HomePage__section">
        <h2 className="HomePage__section-title title">Shop by category</h2>

        <div className="HomePage__categories">
          {Object.values(Category)
            .map(category => (
              <Link
                to={`${category}`}
                className="HomePage__category"
                key={category}
                data-cy="categoryLinksContainer"
              >
                <div className="HomePage__category-image-wrapper">
                  <div className={`HomePage__category-image HomePage__category-image--${category}`} />
                </div>

                <h3 className="HomePage__category-title">
                  {getCategoryName(category)}
                </h3>

                <span className="HomePage__category-info">
                  {`${categoryProductsCount[category] || 'No'} models`}
                </span>
              </Link>
            ))}
        </div>
      </section>

      <ProductsSlider
        sliderTitle="Brand new models"
        products={brandNewProducts}
      />
    </div>
  );
};
