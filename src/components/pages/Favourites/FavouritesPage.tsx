import { NavigationButtons } from '../../../helpers/NavigationButtons/NavigationButtons';
import { ProductCard } from '../../../helpers/ProductCard/ProductCard';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const favProducts = JSON.parse(localStorage.getItem('favProducts'));

  console.log(favProducts);

  return (
    <div className="favourites">
      <NavigationButtons />
      <h1 className="favourites__title">Favourites</h1>
      <ul className="favourites__list">
        {
          favProducts.map((favProduct) => {
            return (
							<li className='favourites__item'>
								<ProductCard product={favProduct} />
							</li>
            );
          })
        }
      </ul>
    </div>
  );
};
