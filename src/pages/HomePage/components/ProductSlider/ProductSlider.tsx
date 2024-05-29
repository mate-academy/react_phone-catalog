import { useEffect, useState } from 'react';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../../types/ProductCard';
import { ProductCategories } from '../../../../types/ProductCategories';
import './ProductSlider.scss';
import '../../../../styles/main.scss';
import { getProducts } from '../../../../helpers/getProducts';
import { filterRandomProducts } from '../../../../helpers/filterRandomProducts';

type Props = {
  title: string;
  hasDiscount?: boolean;
  hasNewestProducts?: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  title,
  hasDiscount = false,
  hasNewestProducts = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const currentProduct = products[activeSlide];
  const nextProduct = activeSlide < 7 ? products[activeSlide + 1] : products[0];
  const lastProduct = activeSlide < 6 ? products[activeSlide + 2] : products[0];

  useEffect(() => {
    getProducts(ProductCategories.Phones).then((productsFromApi: Product[]) => {
      let finalProducts: Product[] = [];

      // Assign random products by default
      finalProducts = filterRandomProducts(productsFromApi);

      if (hasNewestProducts) {
        // finalProducts = filterRandomProducts(productsFromApi.slice(0, 50));
        finalProducts = productsFromApi
          .sort((prod1: Product, prod2: Product) => prod2.year - prod1.year)
          .slice(0, 20)
          .sort((prod1: Product, prod2: Product) => prod2.price - prod1.price)
          .slice(0, 8);
      }

      if (hasDiscount) {
        // Sort from biggest discount to smallest (in $)
        finalProducts = finalProducts.sort(
          (a: Product, b: Product) =>
            b.fullPrice - b.price - (a.fullPrice - a.price),
        );
      }

      setProducts(finalProducts);
    });
  }, [hasDiscount, hasNewestProducts]);

  return (
    products.length > 0 && (
      <div className="product-slider">
        <div className="slider-top product-slider__top">
          <h2 className="slider-top__title">{title}</h2>
          <nav className="slider-top__nav">
            <button
              className="arrow-button"
              disabled={activeSlide === 0}
              onClick={() =>
                setActiveSlide((currentSlide: number) => {
                  return currentSlide > 0 ? currentSlide - 1 : 7;
                })
              }
            >
              <img
                src={
                  activeSlide === 0
                    ? './icons/arrow-left-disabled.svg'
                    : './icons/arrow-left.svg'
                }
                alt="left arrow icon"
              />
            </button>
            <button
              className="arrow-button"
              disabled={activeSlide === 7}
              onClick={() =>
                setActiveSlide((currentSlide: number) => {
                  return currentSlide < 7 ? currentSlide + 1 : 0;
                })
              }
            >
              <img
                src={
                  activeSlide === 7
                    ? './icons/arrow-right-disabled.svg'
                    : './icons/arrow-right.svg'
                }
                alt="right arrow icon"
              />
            </button>
          </nav>
        </div>
        <div className="cards product-slider__cards">
          <span className="cards__container">
            <ProductCard hasDiscount={hasDiscount} product={currentProduct} />
          </span>
          {activeSlide < 7 && (
            <span className="cards__container">
              <ProductCard hasDiscount={hasDiscount} product={nextProduct} />
            </span>
          )}
          {activeSlide < 6 && (
            <span className="cards__container">
              <ProductCard hasDiscount={hasDiscount} product={lastProduct} />
            </span>
          )}
        </div>
      </div>
    )
  );
};
