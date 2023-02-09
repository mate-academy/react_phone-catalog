import { useContext } from 'react';
import {
  NavigationButtons,
} from '../../../common/NavigationButtons/NavigationButtons';
import { ProductCard } from '../../../common/ProductCard/ProductCard';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { Product } from '../../../types/types';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  // const favProducts = JSON.parse(localStorage.getItem('favProducts'));
  const { favProducts } = useContext<any>(CartAndFavContext);

  return (
    <div className="favourites">
      <NavigationButtons />
      <h1 className="favourites__title">Favourites</h1>
      <ul className="favourites__list">
        {
          favProducts.map((favProduct: Product) => {
            return (
              <li className="favourites__item" key={favProduct.id}>
                <ProductCard product={favProduct} />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
