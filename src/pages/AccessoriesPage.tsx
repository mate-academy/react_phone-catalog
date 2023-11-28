/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';

export const AccessoriesPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Accessories Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  return <div>Accessories Page</div>;
};
