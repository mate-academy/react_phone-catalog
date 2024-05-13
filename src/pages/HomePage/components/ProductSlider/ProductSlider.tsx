import { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../../types/Product';
import { ProductCategories } from '../../../../types/ProductCategories';
import { getProductsByCategory } from '../../../../helpers/getProducts';
import './ProductSlider.scss';

type Props = {
  hasDiscount?: boolean;
};

export const ProductSlider: React.FC<Props> = ({ hasDiscount = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const currentProduct = products[activeSlide];
  const nextProduct = activeSlide < 7 ? products[activeSlide + 1] : products[0];

  useEffect(() => {
    getProductsByCategory(ProductCategories.Products).then(
      (productsFromApi: Product[]) => {
        let finalProducts = productsFromApi.reverse().slice(0, 8);

        if (hasDiscount) {
          finalProducts = finalProducts.map((product: Product) => {
            return {
              ...product,
              oldPrice: Math.ceil(product.price * 1.2),
            };
          });
        }

        setProducts(finalProducts);
      },
    );
  }, [hasDiscount]);

  return (
    products.length > 0 && (
      <div className="product-slider">
        <div className="slider-top product-slider__top">
          <h2 className="slider-top__title">
            {hasDiscount ? 'Hot prices' : 'Brand new models'}
          </h2>
          <nav className="slider-top__nav">
            <button
              className="arrow-button"
              onClick={() =>
                setActiveSlide((currentSlide: number) => {
                  return currentSlide > 0 ? currentSlide - 1 : 7;
                })
              }
            >
              <img src="./icons/arrow-left.svg" alt="left arrow icon" />
            </button>
            <button
              className="arrow-button"
              onClick={() =>
                setActiveSlide((currentSlide: number) => {
                  return currentSlide < 7 ? currentSlide + 1 : 0;
                })
              }
            >
              <img src="./icons/arrow-right.svg" alt="right arrow icon" />
            </button>
          </nav>
        </div>
        <div className="cards product-slider__cards">
          <span className="cards__container">
            <ProductCard hasDiscount={hasDiscount} product={currentProduct} />
          </span>
          <span className="cards__container">
            <ProductCard hasDiscount={hasDiscount} product={nextProduct} />
          </span>
        </div>
      </div>
    )
  );
};
