import { useContext } from 'react';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favList } = useContext(GlobalContext);

  return (
    <div className="favourites">
      <div className="favourites__breadcrumbs">
        <BreadCrumbs page="Favourites" />
      </div>

      <div className="favourites__info">
        <h1 className="favourites__title">Favourites</h1>
        <span className="favourites__counter">
          {favList.length}
          {' '}
          item
          {favList.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="favourites__list">
        {favList.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
