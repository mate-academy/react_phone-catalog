/* eslint-disable max-len */
import './favoritesPage.scss';
import homeLogo from '../../images/catalog/home-logo.png';
import sliderRight from '../../images/catalog/slider-right.png';
import { useFavorites } from '../../components/favoritesContext/favoritesContext';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { mapToProductListItem } from '../../function/mapToProductListItem';
import { ProductListItem } from '../../types/product';
import noItens from '../../images/homepage/no-item-favorites.png';
import { ProductCard } from '../../components/productCard';
import { NavLink } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const allProducts: ProductListItem[] = [
    ...phones.map((p, i) =>
      mapToProductListItem({ ...p, category: 'phones' }, i),
    ),
    ...tablets.map((p, i) =>
      mapToProductListItem({ ...p, category: 'tablets' }, i + phones.length),
    ),
    ...accessories.map((p, i) =>
      mapToProductListItem(
        { ...p, category: 'accessories' },
        i + phones.length + tablets.length,
      ),
    ),
  ];

  const favoriteProducts = allProducts.filter(product =>
    favorites.includes(product.itemId),
  );

  return (
    <div className="container">
      <div className="favorites">
        <div className="favorites__top">
          <NavLink to="/">
            <img
              src={homeLogo}
              alt="Logo Home"
              className="favorites__top--logoHome"
            />
          </NavLink>
          <img
            src={sliderRight}
            alt="Seta"
            className="favorites__top--sliderRight"
          />
          <p className="favorites__top--name">Favourites</p>
        </div>
        <div className="favorites__title">
          <h1 className="h1">Favourites</h1>
          <p className="bodyText">
            {favoriteProducts.length}{' '}
            {favoriteProducts.length === 1 ? 'model' : 'models'}
          </p>
        </div>
      </div>
      {favoriteProducts.length > 0 ? (
        <div className="favorites__carousel">
          {favoriteProducts.map(product => (
            <ProductCard
              product={product}
              key={product.itemId}
              isFullPrice={true}
            />
          ))}
        </div>
      ) : (
        <div className="favorites__noFound">
          <img className="favorites__img" src={noItens} alt="no item" />
          <div className="favorites__text">
            <p className="h1">No Items Yet</p>
            <p className="h4">
              When you find an item you like, click Add to Favorites to see it
              here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
