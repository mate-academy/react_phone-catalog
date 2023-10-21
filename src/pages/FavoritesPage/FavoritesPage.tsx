import { useContext } from 'react';
import { FavouritesContext } from '../../contexts/FavouritesContext';
import { PageContent } from '../../components/PageContent';

export const FavoritesPage: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <PageContent
      title="Favourites"
      products={favourites}
    />
  );
};
