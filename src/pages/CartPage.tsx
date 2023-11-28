/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';

export const CartPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Cart Page');
    setIsHeaderSearchVisible(false);
    setIsMenuOpen(false);
  }, []);

  return <div>Cart Page</div>;
};
