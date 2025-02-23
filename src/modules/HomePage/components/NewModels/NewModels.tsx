import React, { useContext, useEffect, useState } from 'react';
import { Article } from '../../../../shared/types/Article';
import { ProductContext } from '../../../../context/ProductContext';
import { Products } from '../../../../shared/types/Products';
import { Carousel } from '../../../../shared/Carousel/Carousel';
import { Loader } from '../../../../shared/Loader';

export const NewModels: React.FC = () => {
  const [newModels, setNewModels] = useState<Article[] | null>(null);
  const checkData = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Phones);

      const filtered = data.filter(
        (el: Article) => el.year === 2022 && el.price > 1000 && el.price < 1200,
      );

      setNewModels(filtered);
    };

    fetchData();
  }, [checkData]);

  return (
    <>
      {newModels ? (
        <Carousel items={newModels} title="Brand new Models" />
      ) : (
        <Loader />
      )}
    </>
  );
};
