import { useContext } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { GadgetsList } from '../../components/GadgetsList/GadgetsList';
import { FavCartPhonesContext } from '../../contexts/FavCartPhonesContext';

export const FavoritesPage = () => {
  const { phonesInFav } = useContext(FavCartPhonesContext);

  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Favorites" />
        <GadgetsList phones={phonesInFav} />
      </div>
    </main>
  );
};
