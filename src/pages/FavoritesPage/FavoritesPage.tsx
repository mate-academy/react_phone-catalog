import React, {useContext} from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import './FavoritesPage.scss';
import {MyContext} from '../../App'

export const FavoritesPage = () => {

  const {favorites} = useContext(MyContext);
  return (
    <div className="PhonesPage">
      <h1 className="PhonesPage__h1">Favorites</h1>
      <Catalog
        products={favorites}
      />
    </div>
  )
}
