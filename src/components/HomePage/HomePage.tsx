import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';
import { ImagesSlider } from '../ImagesSlider';

import './HomePage.scss';

enum Categories {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const hotProducts: Product[] = [];
  const brandNewProducts: Product[] = [];
  const phones: Product[] = [];
  const tablets: Product[] = [];
  const accessories: Product[] = [];

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  products.forEach(product => {
    if (product.discount) {
      hotProducts.push(product);
    } else {
      brandNewProducts.push(product);
    }

    switch (product.type) {
      case 'phone':
        phones.push(product);
        break;

      case 'tablet':
        tablets.push(product);
        break;

      case 'accessory':
        accessories.push(product);
        break;

      default:
        break;
    }
  });

  hotProducts.sort((a: Product, b: Product) => {
    return b.price * b.discount - a.price * a.discount;
  });

  brandNewProducts.sort((a: Product, b: Product) => {
    return b.price - a.price;
  });

  const returnProductsCount = (category: Categories) => {
    switch (category) {
      case Categories.Phones:
        return phones.length;

      case Categories.Tablets:
        return tablets.length;

      case Categories.Accessories:
        return accessories.length;

      default:
        return 0;
    }
  };

  return (
    <div className="HomePage">
      <section className="HomePage__section">
        <ImagesSlider />
      </section>

      <section className="HomePage__section">
        <ProductsSlider
          sliderTitle="Hot prices"
          products={hotProducts}
        />
      </section>

      <section className="HomePage__section">
        <h2 className="HomePage__section-title title">Shop by category</h2>

        <div className="HomePage__categories">
          {Object.values(Categories).map(category => (
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
                {category === Categories.Phones ? `Mobile ${category}` : category}
              </h3>

              <span className="HomePage__category-info">
                {`${returnProductsCount(category) || 'No'} models`}
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
