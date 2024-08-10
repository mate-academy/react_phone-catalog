import { useContext } from "react"
import { Map } from "../../components/Map"
import { FavouritesContext } from "../../contexts/favouritesContext"
import { Products } from "../../components/Products";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Errors } from "../../types/Errors";
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div className="favorites">
      <div className="container">
        <Map />

        <h1 className="favorites__title">Favorites</h1>
        <p className="favorites__count">
          {favourites.length === 1
            ? '1 item'
            : `${favourites.length} items`
          }
        </p>

        {favourites.length ? (
          <Products products={favourites} catalog />
        ) : (
          <ErrorMessage message={Errors.EmptyFavourites} />
        )}
      </div>
    </div>
  )
}
