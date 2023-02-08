import { useContext } from 'react';
import { CartAndFavContext } from '../../../context/CartAndFavContext';
import { NavigationButtons } from '../../../helpers/NavigationButtons/NavigationButtons';
import { ProductCard } from '../../../helpers/ProductCard/ProductCard';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  // const favProducts = JSON.parse(localStorage.getItem('favProducts'));
  const { favProducts } = useContext(CartAndFavContext);

  return (
    <div className="favourites">
      <NavigationButtons />
      <h1 className="favourites__title">Favourites</h1>
      <ul className="favourites__list">
        {
          favProducts.map((favProduct) => {
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
