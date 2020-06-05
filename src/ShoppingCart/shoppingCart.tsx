import React from 'react';
import { BreadCrumb } from '../MultipurposeComponents/BreadCrumb/breadCrumb';
import { cartGoods } from '../Additional/additional_api';
import { CatalogMaker } from '../MultipurposeComponents/CatalogMaker/catalogMaker';

export const ShoppingCart = () => {
  return (
    <div className="Favourites">
      <BreadCrumb page="Shopping cart" />
      <h1 className="Favourites__title">Shopping cart</h1>
      {
        cartGoods.length !== 1 ? (
          <p className="Favourites__qty">{`${cartGoods.length} items`}</p>
        ) : (
          <p className="Favourites__qty">{`${cartGoods.length} item`}</p>
        )
      }
      <div className="Favourites__list">
        <CatalogMaker gadgets={cartGoods} />
      </div>
    </div>
  );
};
