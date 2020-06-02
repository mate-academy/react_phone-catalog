import React from 'react';
import { FavGoods } from '../Additional/additional_api';
import { BreadCrumb } from '../MultipurposeComponents/BreadCrumb/breadCrumb';
import './favourites.scss';
import { CatalogMaker } from '../MultipurposeComponents/CatalogMaker/catalogMaker';

export const Favourites = () => {
  return (
    <div className="Favourites">
      <BreadCrumb page="Favourites" />
      <h1 className="Favourites__title">Favourites</h1>
      {
        FavGoods.length !== 1 ? (
          <p className="Favourites__qty">{`${FavGoods.length} items`}</p>
        ) : (
          <p className="Favourites__qty">{`${FavGoods.length} item`}</p>
        )
      }
      <div className="Favourites__list">
        <CatalogMaker gadgets={FavGoods} />
      </div>
    </div>
  );
};
