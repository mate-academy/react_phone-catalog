import { useContext } from "react";
import { CurrentPath } from "../../components/CurrentPath/CurrentPath";
import { CatalogContext } from "../../CatalogContext";
import { ProductItem } from "../../components/ProductItem/ProductItem";

export const FavouritesPage = () => {
  const { favourites } = useContext(CatalogContext)
  console.log(favourites)
  if (!favourites || favourites.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <section className="favourites first-screen">
      <div className="container">
        <CurrentPath />

        <h1 className="favourites__title main-title">Favourites</h1>

        <p className="favourites__counter">
          {(favourites && favourites.length > 0) && `${favourites.length} items`}
        </p>

        <div className="favourites__flex-container">
          {favourites && favourites.map(item =>
            <ProductItem
              key={item.id}
              product={item}
              section="favourites"
            />
          )}
        </div>
      </div>
    </section>
  )
}
