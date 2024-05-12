// import newPhonesFromApi from '../../../../../public/api/phones.json';
import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../types/Product';
import { getProducts } from '../../../../helpers/getProducts';
import './ProductSlider.scss';

export const ProductSlider: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((productsFromApi: Product[]) =>
      setProducts(productsFromApi),
    );
  }, []);

  // // eslint-disable-next-line no-console
  // console.log(products[0]);

  // const parsedPhones: Product[] = JSON.parse(newPhones);

  return (
    products.length > 0 && (
      <section className="product-slider">
        <div className="slider-top product-slider__top">
          <h2 className="slider-top__title">Brand new models</h2>
          <nav className="slider-top__nav">
            <button className="arrow-button">
              <img src="./icons/arrow-left.svg" alt="left arrow icon" />
            </button>
            <button className="arrow-button">
              <img src="./icons/arrow-right.svg" alt="right arrow icon" />
            </button>
          </nav>
        </div>
        <div className="product-slider__cards">
          <ProductCard product={products[0]} />
        </div>
      </section>
    )
  );
};
