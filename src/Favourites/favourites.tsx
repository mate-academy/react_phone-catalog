import React, { useContext, useEffect, useState } from 'react';
import { DFS, FavArray } from '../Additional/additional_api';
import { Phones } from '../Additional/interfaces';
import { BreadCrumb } from '../MultipurposeComponents/BreadCrumb/breadCrumb';
import './favourites.scss';
import { CatalogMaker } from '../MultipurposeComponents/CatalogMaker/catalogMaker';

export const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const dataFromServer = useContext(DFS);

  useEffect(() => {
    dataFromServer
      .then(data => data.filter((el: Phones) => FavArray
        .includes(el.id))).then(data => setFavourites(data));
  }, [dataFromServer]);

  return (
    <div className="Favourites">
      <BreadCrumb page="Favourites" />
      <h1 className="Favourites__title">Favourites</h1>
      {
        favourites.length !== 1 ? (
          <p className="Favourites__qty">{`${favourites.length} items`}</p>
        ) : (
          <p className="Favourites__qty">{`${favourites.length} item`}</p>
        )
      }
      <div className="Favourites__list">
        <CatalogMaker gadgets={favourites} />
      </div>
    </div>
  );
};
