import React, { useContext, useEffect, useState } from 'react';
import { Article } from '../../../../shared/types/Article';
import { ProductContext } from '../../../../context/ProductContext';
import { Products } from '../../../../shared/types/Products';
import { Carousel } from '../../../../shared/Carousel/Carousel';
import { Loader } from '../../../../shared/Loader';
import { useTranslation } from 'react-i18next';

export const NewModels: React.FC = () => {
  const [newModels, setNewModels] = useState<Article[] | null>(null);
  const checkData = useContext(ProductContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Phones);

      const filtered = data.filter(
        (el: Article) => el.year === 2022 && el.capacity === '512GB',
      );

      setNewModels(filtered);
    };

    fetchData();
  }, [checkData]);

  return (
    <>
      {newModels ? (
        <Carousel items={newModels} title={t('home_newModels')} />
      ) : (
        <Loader />
      )}
    </>
  );
};
