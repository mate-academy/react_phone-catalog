import { useContext } from 'react';
import { StateContext } from '../../context/ContextReducer';
import './Favorites.scss';
import { Catalog } from '../../componentsApp/Catalog/Catalog';

export const Favorites: React.FC = () => {
  const { favoritesDevice } = useContext(StateContext);

  return (
    <div className="Favorites">
      <div className="Favorites__items">
        <Catalog
          devices={favoritesDevice}
          titleCatalog="Favorites"
          nonCatalog={true}
        />
      </div>
    </div>
  );
};
