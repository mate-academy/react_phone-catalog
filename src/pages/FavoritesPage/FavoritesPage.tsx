import React, {useContext} from 'react';
import { Catalog } from '../../components/Catalog/Catalog';
import './FavoritesPage.scss';
import {MyContext} from '../../App'
import { Breadcrumbs} from '../../components/Breadcrumbs/Breadcrumbs';

export const FavoritesPage = () => {

  const {favorites} = useContext(MyContext);
  return (
    <div className="PhonesPage">
      <Breadcrumbs />
      <h1 className="PhonesPage__h1">Favorites</h1>
      <Catalog
        products={favorites}
      />
    </div>
  )
}
