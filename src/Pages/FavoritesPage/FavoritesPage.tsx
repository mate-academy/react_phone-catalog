import { useContext } from 'react';
// eslint-disable-next-line max-len
import { FavoritesContext } from '../../contexts/FavoritesContext/FavoritesContext';
import { ModelList } from '../../components/ModelList';
import { PageTop } from '../../components/PageTop';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <>
      <PageTop
        titleText="Favourites"
        titleLevel="1"
        modelsAmount={favorites.length}
        itemsContent="items"
      ></PageTop>
      <ModelList models={favorites} kindOfModel="product"></ModelList>
    </>
  );
};
