import { useContext } from 'react';
import {
  NavigationButtons,
} from '../../../common/NavigationButtons/NavigationButtons';
import { NoProducts } from '../../../common/NoProducts/NoProducts';
import { ProductCard } from '../../../common/ProductCard/ProductCard';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { Product } from '../../../types/types';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  // const favProducts = JSON.parse(localStorage.getItem('favProducts'));
  const { visibleFavProducts } = useContext<any>(CartAndFavContext);

  return (
    <div className="favourites">
      <NavigationButtons />
      <h1 className="favourites__title">Favourites</h1>
      <ul className="favourites__list">
        { visibleFavProducts.length
          ? visibleFavProducts.map((favProduct: Product, index: number) => {
            return (
              <li className="favourites__item" key={favProduct.id}>
                <ProductCard
                  product={favProduct}
                />
              </li>
            );
          })

          : <NoProducts />}
      </ul>
    </div>
  );
};
