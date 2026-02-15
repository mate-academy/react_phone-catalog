import React, { useContext, useEffect, useState } from 'react';
import styles from './Phones.module.scss';
import { Catalog } from '../../shared/Catalog';
import { ProductContext } from '../../context/ProductContext';
import { Products } from '../../shared/types/Products';
import { Article } from '../../shared/types/Article';
import { NavAdress } from '../../shared/NavAdress';
import { useTranslation } from 'react-i18next';

export const Phones: React.FC = () => {
  const checkData = useContext(ProductContext);
  const [phones, setPhones] = useState<Article[] | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkData(Products.Phones);

      setPhones(data);
    };

    fetchData();
  }, [checkData, phones]);

  return (
    <div className={styles.phones}>
      <NavAdress />
      <h1 className={styles.phones__title}>{t('ctl_phones')}</h1>
      <Catalog productName={Products.Phones} products={phones} />
    </div>
  );
};
