/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';

export const TabletsPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Tablets Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  return <div>Tablets Page</div>;
};
