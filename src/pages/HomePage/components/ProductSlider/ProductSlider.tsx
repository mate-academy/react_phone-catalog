import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../../types/ProductCard';
import { ProductCategories } from '../../../../types/ProductCategories';
import { getProducts } from '../../../../helpers/getProducts';
import { filterRandomProducts } from '../../../../helpers/filterRandomProducts';
import './ProductSlider.scss';
import '../../../../styles/main.scss';

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
  const secondProduct =
    activeSlide < 7 ? products[activeSlide + 1] : products[0];
  const thirdProduct =
    activeSlide < 6 ? products[activeSlide + 2] : products[0];
  const fourthProduct =
    activeSlide < 5 ? products[activeSlide + 3] : products[0];

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

  const moveToPreviousCard = () =>
    setActiveSlide((currentSlide: number) => {
      return currentSlide > 0 ? currentSlide - 1 : 7;
    });

  const moveToNextCard = () =>
    setActiveSlide((currentSlide: number) => {
      return currentSlide < 8 ? currentSlide + 1 : 1;
    });

  return (
    products.length > 0 && (
      <div className="product-slider">
        <div className="slider-top product-slider__top">
          <h2 className="slider-top__title">{title}</h2>
          <nav className="slider-top__nav">
            <button
              className={classNames('arrow-button', {
                'arrow-button--active': activeSlide !== 0,
              })}
              disabled={activeSlide === 0}
              onClick={moveToPreviousCard}
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
              className={classNames('arrow-button', {
                'arrow-button--active': activeSlide !== 7,
              })}
              disabled={activeSlide === 7}
              onClick={moveToNextCard}
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
              <ProductCard hasDiscount={hasDiscount} product={secondProduct} />
            </span>
          )}
          {activeSlide < 6 && (
            <span className="cards__container">
              <ProductCard hasDiscount={hasDiscount} product={thirdProduct} />
            </span>
          )}
          {activeSlide < 5 && (
            <span className="cards__container">
              <ProductCard hasDiscount={hasDiscount} product={fourthProduct} />
            </span>
          )}
        </div>
      </div>
    )
  );
};
