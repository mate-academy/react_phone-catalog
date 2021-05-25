import React, { useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import { ProductCard } from '../ProductCard';
import { getHotPriceProducts, getBrandNewProducts, getSuggestedProducts } from '../../api/getProducts';
import { Product, Slider } from '../../helpers/types';
import { PRODUCTS_PER_SLIDER_PAGE } from '../../helpers/variables';
import './ProductsSlider.scss';

export const ProductsSlider: React.FC<Slider> = ({ sliderType }) => {
  const [products, setProducts] = useState([]);
  const [activeProductsPage, setActiveProductsPage] = useState(1);
  const productsPerPage = PRODUCTS_PER_SLIDER_PAGE;

  const getVisibleProducts = useMemo(() => {
    const indexOfLastProduct = activeProductsPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const visibleProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return visibleProducts;
  }, [products, activeProductsPage, productsPerPage]);

  const chooseNextPage = () => {
    setActiveProductsPage((prevState) => prevState + 1);
  };

  const choosePreviousPage = () => {
    setActiveProductsPage((prevState) => prevState - 1);
  };

  useEffect(() => {
    switch (sliderType) {
      case 'Hot Prices':
        getHotPriceProducts()
          .then(setProducts);
        break;

      case 'Brand New Models':
        getBrandNewProducts()
          .then(setProducts);
        break;

      default:
        getSuggestedProducts()
          .then(setProducts);
        break;
    }
  }, [sliderType]);

  return (
    <div className="ProductsSlider Page-ProductsSlider">
      <div className="ProductsSlider-TitleRow">
        <h1 className="ProductsSlider-Title">{sliderType}</h1>
        <div className="ProductsSlider-SwitchArrows">
          <button
            type="button"
            name="Left-button"
            onClick={choosePreviousPage}
            disabled={activeProductsPage === 1}
            className={classnames(
              'ProductsSlider-SwitchArrow',
              { 'ProductsSlider-SwitchArrow_inactive': activeProductsPage === 1 },
            )}
          >
            <img
              src={activeProductsPage === 1
                ? './img/icons/arrow-left-inactive.svg'
                : './img/icons/arrow-left-active.svg'}
              alt="arrow-left"
            />
          </button>

          <button
            type="button"
            onClick={chooseNextPage}
            disabled={Math.ceil(products.length / productsPerPage) === activeProductsPage}
            className={classnames(
              'ProductsSlider-SwitchArrow',
              { 'ProductsSlider-SwitchArrow_inactive': Math.ceil(products.length / productsPerPage) === activeProductsPage },
            )}
          >
            <img
              src={Math.ceil(products.length / productsPerPage) === activeProductsPage
                ? './img/icons/arrow-right-inactive.svg'
                : './img/icons/arrow-right-active.svg'}
              alt="arrow-right"
            />
          </button>
        </div>
      </div>
      <div className="ProductsSlider-ProductCards">
        {getVisibleProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </div>
  );
};
