/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import {
  getBrandNewProducts, getHotPriceProducts, getProducts, getSuggestedProducts,
} from '../../api/products';
import { Product } from '../../types/Product';
import { SliderList } from '../SliderList';
import { SliderButtons } from '../SliderButtons';
import './ProductSlider.scss';
import { PageSizeContext } from '../../storage/PageSizeContext';

type Props = {
  title: string
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(4);
  const {
    width, isMobileSize, isTabletSize, isLaptopSize, isDesktopSize,
  } = useContext(PageSizeContext);
  const firstProduct = itemIndex * itemsVisible;

  const listToRender = products
    .slice(firstProduct, firstProduct + itemsVisible);

  useEffect(() => {
    let fetch;

    switch (title) {
      case 'Hot prices':
        fetch = getHotPriceProducts;
        break;
      case 'Brand new models':
        fetch = getBrandNewProducts;
        break;
      case 'You may also like':
        fetch = getSuggestedProducts;
        break;
      default:
        fetch = getProducts;
        break;
    }

    fetch()
      .then(setProducts);
  }, [title]);

  useEffect(() => {
    setItemIndex(0);

    if (isMobileSize) {
      setItemsVisible(1);
    } else if (isTabletSize) {
      setItemsVisible(2);
    } else if (isLaptopSize) {
      setItemsVisible(3);
    } else if (isDesktopSize) {
      setItemsVisible(4);
    }
  }, [width]);

  const isLeftDisabled = itemIndex === 0;
  const isRightDisabled = (itemIndex + 1) * itemsVisible >= products.length;
  const prevPage = () => setItemIndex(itemIndex - 1);
  const nextPage = () => setItemIndex(itemIndex + 1);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h1 className="product-slider__title">
          {title}
        </h1>

        <SliderButtons
          isLeftDisabled={isLeftDisabled}
          isRightDisabled={isRightDisabled}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>

      {products.length && (
        <SliderList
          products={listToRender}
        />
      )}
    </div>
  );
};
