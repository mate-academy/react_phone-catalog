/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { HotPricesProduct } from '../types/HotPricesProducts';
import { getHotPricesProducts } from '../../api/products';
import { DiscountProduct } from '../DiscountProduct/DiscountProduct';
import './Discounts.scss';
import Slider from 'react-slick';

export const Discounts = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<
    HotPricesProduct[]
  >([]);

  useEffect(() => {
    getHotPricesProducts().then(setHotPricesProducts);
  }, []);

  const settings = {
    variableWidth: true,
    infinite: false,
    className: 'discounts__width',
    slideToScroll: 1,
    slideToShow: 1,
  };

  return (
    <div className="discounts">
      <h2 className="discounts__title">Hot prices</h2>
      <div className="discounts__content">
        <Slider {...settings}>
          {hotPricesProducts.map(hotProduct => (
            <DiscountProduct
              discountProduct={hotProduct}
              key={hotProduct.age}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
