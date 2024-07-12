import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { PageContent } from '../../components/PageContent';

export const FavoritePage = () => {
  const { favourites } = useContext(GlobalContext);

  return (
    <PageContent products={favourites} title="Favourites" dropdown={false} />
  );
};
