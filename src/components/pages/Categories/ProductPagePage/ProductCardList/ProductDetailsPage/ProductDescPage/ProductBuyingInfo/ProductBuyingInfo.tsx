/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import './ProductBuyingInfo.scss';
import { useContext, useEffect } from 'react';
import { Button } from '../../../../../../../../common/Button/Button';
import {
  LongButton,
} from '../../../../../../../../common/LongButton/LongButton';
import {
  ProductAvaliableColors,
} from './ProductAvaliableColors/ProductAvaliableColors';
import { ProductCapacity } from './ProductCapacity/ProductCapacity';
import {
  DetailedProductContext,
} from '../../../../../../../../context/DetailedProductContext';
import {
  CartAndFavContext,
} from '../../../../../../../../context/CartAndFavContext';
import { Product } from '../../../../../../../../types/types';

export const ProductBuyingInfo = ({ products, singleProduct }:any) => {
  const {
    cartProducts, favProducts,
    setIsAddedToCart, isAddedToCart,
    setIsAddedToFav, isAddedToFav,
  } = useContext<any>(CartAndFavContext);

  const {
    detailedProduct,
  } = useContext<any>(DetailedProductContext);

  useEffect(() => {
    setIsAddedToCart(false);
    cartProducts.map((one: Product) => {
      if (one.phoneId === detailedProduct.id) {
        return setIsAddedToCart(true);
      }
    });
  }, [detailedProduct, cartProducts]);

  useEffect(() => {
    setIsAddedToFav(false);

    favProducts.map((one: Product) => {
      if (one.phoneId === detailedProduct.id) {
        setIsAddedToFav(true);
      }
    });
  }, [detailedProduct, favProducts]);

  return (
    <div className="buying-info">
      <div className="buying-info__details">
        <ProductAvaliableColors
          products={products}
        />
        <ProductCapacity
          products={products}
        />
        <div className="buying-info__price">
          <h1 className="product__price">
            $
            {detailedProduct.priceDiscount}
          </h1>
          <h2 className="product__old-price">
            $
            {detailedProduct.priceRegular}
          </h2>
        </div>
        <div className="buying-info__buttons">
          <LongButton
            text={isAddedToCart ? 'Added to cart' : 'Add to cart'}
            className={isAddedToCart && 'selected'}
            product={singleProduct}
            products={products}
          />
          <Button
            image={isAddedToFav
              ? '/icons/Favourites Filled (Heart Like).svg'
              : '/icons/Favourites.svg'}
            title="favourites"
            products={products}
          />
        </div>
        <div className="buying-info__tech-details body12">
          <div className="buying-info__keys">
            <p className="buying-info__key">Screen</p>
            <p className="buying-info__key">Resolution</p>
            <p className="buying-info__key">Processor</p>
            <p className="buying-info__key">RAM</p>
          </div>
          <div className="buying-info__values">
            <p className="buying-info__value">{detailedProduct.screen}</p>
            <p className="buying-info__value">{detailedProduct.resolution}</p>
            <p className="buying-info__value">{detailedProduct.processor}</p>
            <p className="buying-info__value">{detailedProduct.ram}</p>
          </div>
        </div>
      </div>
      <p className="product-id body12">
        {detailedProduct.id}
      </p>
    </div>
  );
};
