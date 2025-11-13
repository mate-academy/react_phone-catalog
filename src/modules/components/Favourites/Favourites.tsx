import React, { useContext } from 'react';
import './Favourites.scss';
import { MainHeader } from '../../shared/components/MainHeader';
import { FavesContext } from '../../shared/context/FavesContext';
import { ProductListContext } from '../../shared/context/ProductListContext';
import { CardItem } from '../../shared/components/CardItem';
import { getCartList } from '../../shared/servises/getCartList';
import { TranslationContext } from '../../../i18next/shared';

export const Favourites: React.FC = () => {
  const pageTitleList = useContext(TranslationContext).navList;
  const { favourites } = useContext(FavesContext);
  const { productList } = useContext(ProductListContext);

  const title = pageTitleList.filter(
    titleItem => titleItem.link === 'favourites',
  )[0].title;

  const favouriteList = getCartList(favourites, productList);

  return (
    <div className="favourites">
      <div className="favourites__container">
        <MainHeader pageTitle={title} productAmount={favourites.length} />
        <div className="favourites__productList">
          {favouriteList.map(product => (
            <CardItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
