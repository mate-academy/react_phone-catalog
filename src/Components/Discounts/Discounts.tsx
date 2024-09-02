/* eslint-disable @typescript-eslint/indent */
import { useContext, useEffect } from 'react';
import { getHotPricesProducts } from '../../api/products';
import { DiscountProduct } from '../DiscountProduct/DiscountProduct';
import './Discounts.scss';
import Slider from 'react-slick';
import { CatalogContext } from '../CatalogProvider';

export const Discounts = () => {
  const { hotPricesProducts, setHotPricesProducts } =
    useContext(CatalogContext);

  useEffect(() => {
    getHotPricesProducts().then(setHotPricesProducts);
  }, [setHotPricesProducts]);

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
