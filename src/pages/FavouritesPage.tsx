/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';

export const FavouritesPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Favourites Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  return <div>Favourites Page</div>;
};
