import { useContext, useMemo } from 'react';
import './FavoritesPage.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { ProductsList } from '../../components/ProductsList';
import { NaviLine } from '../../components/NaviLine';

export const FavoritesPage = () => {
  const { allProducts, favorites } = useContext(GlobalContext);

  const favoritesProducts = useMemo(
    () => allProducts.filter(p => favorites.includes(p.itemId)),
    [allProducts, favorites]);

  return (
    <div className="fav__page">
      <div className="container">
        <div className="fav__content">
          <NaviLine category='favorites'/>

          <div className="fav__title-wrap">
            <h1 className="fav__title">Favourites</h1>
            <span className="fav__desc">
              {favorites.length
                ? `${favorites.length} items`
                : 'no items in favorites yet'
              }
            </span>
          </div>

          <div className="fav__products-list">

            {!favorites.length
              ? (<div className="fav__message">Your favorites list is empty</div>)
              : (
                <ProductsList
                  products={favoritesProducts}
                />
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
}
