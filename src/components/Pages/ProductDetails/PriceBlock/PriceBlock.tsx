import React, { useContext } from 'react';
import classNames from 'classnames';
import { CatalogContext } from '../../../../context/CatalogContext';
import { Images } from '../../../../images';
import * as Service from '../../../../utils/service';
import * as Types from '../../../../types';

type Props = {
  selectedProduct: Types.ProductDetails;
};

export const PriceBlock: React.FC<Props> = ({ selectedProduct }) => {
  const { priceDiscount, priceRegular, id } = selectedProduct;
  const {
    favourites,
    cart,
    allProducts,
    addProductToFavoutites,
    addProductToCart,
  } = useContext(CatalogContext);

  const handleAddProductTo = (direction: Types.DirectionAdd) => {
    if (selectedProduct) {
      const productToAdd = Service.getProductByItemId(
        selectedProduct,
        allProducts,
      );

      if (productToAdd) {
        switch (direction) {
          case Types.DirectionAdd.Favourites:
            addProductToFavoutites(productToAdd);
            break;
          case Types.DirectionAdd.Cart:
            addProductToCart({
              id: productToAdd.id,
              quantity: 1,
              product: productToAdd,
            });
        }
      }
    }
  };

  return (
    <div className="paramsBlock__priceBlock">
      <div className="paramsBlock__priceBlock--prices">
        <h2 className="paramsBlock__priceBlock--prices-discount">
          {`$${priceDiscount}`}
        </h2>

        <p className="paramsBlock__priceBlock--prices-regular">
          {`$${priceRegular}`}
        </p>
      </div>

      <div className="paramsBlock__priceBlock--cart-favourite-Block">
        <button
          className={classNames('cart-button', {
            'cart-button__selected': Service.includesItem(cart, id),
          })}
          onClick={() => handleAddProductTo(Types.DirectionAdd.Cart)}
        >
          {Service.includesItem(cart, id) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={classNames(
            'paramsBlock__priceBlock--cart-favourite-Block-favourite button',
            {
              button__selected: Service.includesItem(cart, id),
            },
          )}
          onClick={() => handleAddProductTo(Types.DirectionAdd.Favourites)}
        >
          {Service.includesItem(favourites, id) ? (
            <img src={Images.Heart.Selected} alt="heartSelected" />
          ) : (
            <img src={Images.Heart.Default} alt="heart" />
          )}
        </button>
      </div>
    </div>
  );
};
