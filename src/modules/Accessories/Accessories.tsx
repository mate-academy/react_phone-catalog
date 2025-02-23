import React, { useContext, useEffect, useState } from 'react';
import styles from './Accessories.module.scss';
import { Catalog } from '../../shared/Catalog';
import { Products } from '../../shared/types/Products';
import { ProductContext } from '../../context/ProductContext';
import { Article } from '../../shared/types/Article';
import { NavAdress } from '../../shared/NavAdress';

export const Accessories: React.FC = () => {
  const checkData = useContext(ProductContext);
  const [accessories, setAccessories] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Accessories);

      setAccessories(data);
    };

    fetchData();
  }, [checkData, accessories]);

  return (
    <div className={styles.accessories}>
      <NavAdress />
      <h1 className={styles.accessories__title}>Accessories</h1>
      <Catalog productName={Products.Accessories} products={accessories} />
    </div>
  );
};
