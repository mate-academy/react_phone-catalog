/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';

export const PhonesPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Mobile Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  return <div>Phones Page</div>;
};
