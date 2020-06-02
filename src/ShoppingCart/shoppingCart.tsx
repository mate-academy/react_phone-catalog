import React from 'react';
import { BreadCrumb } from '../MultipurposeComponents/BreadCrumb/breadCrumb';
import { CartGoods } from '../Additional/additional_api';
import { CatalogMaker } from '../MultipurposeComponents/CatalogMaker/catalogMaker';

export const ShoppingCart = () => {
  return (
    <div className="Favourites">
      <BreadCrumb page="Shopping cart" />
      <h1 className="Favourites__title">Shopping cart</h1>
      {
        CartGoods.length !== 1 ? (
          <p className="Favourites__qty">{`${CartGoods.length} items`}</p>
        ) : (
          <p className="Favourites__qty">{`${CartGoods.length} item`}</p>
        )
      }
      <div className="Favourites__list">
        <CatalogMaker gadgets={CartGoods} />
      </div>
    </div>
  );
};
