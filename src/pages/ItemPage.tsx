/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import { appContext } from '../Contexts/AppContext';
import { Loader } from '../Components/Loader';

import { scrollToTop } from '../utils/scrollToTop';
import { ItemCard } from './ItemCard';
import { ProductType } from '../Types/ProductType';

export const ItemPage = () => {
  const { itemId } = useParams();
  const { currentItem, setCurrentItem } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null,
  );

  const fetchItem = async () => {
    setCurrentItem(null);
    setCurrentProduct(null);
    setIsLoading(true);

    try {
      const data = await api.getInfo.phone(itemId);
      const product = await api.getNewPhoneById(itemId);

      setCurrentItem(data);
      setCurrentProduct(product);
    } catch {
      setCurrentItem(null);
      setCurrentProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToTop();

    fetchItem();
  }, [itemId]);

  return (
    <>
      {isLoading || !currentItem || !currentProduct ? (
        <Loader />
      ) : (
        <ItemCard currentItem={currentItem} currentProdct={currentProduct} />
      )}
    </>
  );
};
