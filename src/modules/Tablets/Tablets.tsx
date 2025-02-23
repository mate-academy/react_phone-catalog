import React, { useContext, useEffect, useState } from 'react';
import styles from './Tablets.module.scss';
import { Catalog } from '../../shared/Catalog';
import { Products } from '../../shared/types/Products';
import { Article } from '../../shared/types/Article';
import { ProductContext } from '../../context/ProductContext';
import { NavAdress } from '../../shared/NavAdress';

export const Tablets: React.FC = () => {
  const checkData = useContext(ProductContext);
  const [tablets, setTablets] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Tablets);

      setTablets(data);
    };

    fetchData();
  }, [checkData, tablets]);

  return (
    <div className={styles.tablets}>
      <NavAdress />
      <h1 className={styles.tablets__title}>Tablets</h1>
      <Catalog productName={Products.Tablets} products={tablets} />
    </div>
  );
};
