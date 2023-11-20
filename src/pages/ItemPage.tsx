/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import { appContext } from '../Contexts/AppContext';
import { Loader } from '../Components/Loader';

import { scrollToTop } from '../utils/scrollToTop';
import { ItemCard } from './ItemCard';

export const ItemPage = () => {
  const { itemId } = useParams();
  const { currentItem, setCurrentItem } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItem = async () => {
    setCurrentItem(null);
    setIsLoading(true);

    try {
      const data = await api.getInfo.phone(itemId);

      setCurrentItem(data);
    } catch {
      setCurrentItem(null);
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
      {isLoading || !currentItem ? (
        <Loader />
      ) : (
        <ItemCard currentItem={currentItem} />
      )}
    </>
  );
};
