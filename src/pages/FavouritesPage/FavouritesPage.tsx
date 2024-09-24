import { useContext } from 'react';
import { CurrentPath } from '../../components/CurrentPath/CurrentPath';
import { CatalogContext } from '../../CatalogContext';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { ProductItem } from '../../components/ProductItem/ProductItem';

export const FavouritesPage = () => {
  const { favourites } = useContext(CatalogContext);
  const favForShow: Phone[] | Tablet[] | Accessory[] = [...favourites];

  return (
    <section className="favourites first-screen">
      <div className="container">
        <CurrentPath />

        <h1 className="favourites__title main-title">Favourites</h1>

        <p className="favourites__counter">
          {favourites && favourites.length > 0 && `${favourites.length} items`}
          {favourites.length === 0 && `Empty`}
        </p>

        <div className="favourites__flex-container">
          {favForShow &&
            favForShow.length !== 0 &&
            favForShow.map(item => (
              <ProductItem key={item.id} product={item} section="favourites" />
            ))}
        </div>
      </div>
    </section>
  );
};
