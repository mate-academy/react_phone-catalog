import {
  useContext, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from 'src/contexts/ProductContext';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { DetailsContent } from './sections/DetailsContent/DetailsContent';

export const ProductsDetails = () => {
  const { products } = useContext(ProductContext);
  const {
    selectedProductDetails,
  } = useContext(ProductContext);
  const location = useLocation();
  const arrOfLocation = location.pathname.split('/').filter(a => !!a);
  const selectedProductId = arrOfLocation.at(-1);
  const [selectedCapacity, setSelectedCapacity] = useState('capacity');
  const [favourites, setFavourites] = useLocalStorage('favourites', '[]');
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '[]');

  useEffect(() => {
    if (selectedProductDetails) {
      setSelectedCapacity(selectedProductDetails?.capacity);
    }
  }, [selectedProductDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProductDetails]);

  const selectedProductGeneralInfo = products.find(x => {
    return x.itemId === selectedProductId;
  });

  return (
    <>
      {selectedProductGeneralInfo && selectedProductDetails && (
        <DetailsContent
          selectedProductGeneralInfo={selectedProductGeneralInfo}
          selectedCapacity={selectedCapacity}
          setSelectedCapacity={setSelectedCapacity}
          favourites={favourites}
          setFavourites={setFavourites}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />
      )}
    </>
  );
};
