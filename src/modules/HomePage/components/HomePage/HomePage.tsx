import { useCallback, useEffect, useState } from 'react';
import { PicturesSlider } from '../PicturesSlider';
import styles from './HomePage.module.scss';
import { Picture } from '../../types/types';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { translateItem } from '../../../shared/functions/functions';
import { BrandNew } from '../BrandNew';
import { Product } from '../../../shared/types/types';

export const HomePage: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { language, localeTexts } = useLanguage();
  const { homeTitle } = localeTexts;

  const fetchPictures = useCallback(async () => {
    try {
      const response = await fetch('api/banners.json');

      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }

      const loadedPictures = await response.json();

      setPictures(translateItem<Picture>(loadedPictures, language));
    } catch (error) {
      throw error;
    }
  }, [language]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('api/products.json');

      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }

      const loadedProducts = await response.json();

      setProducts(loadedProducts);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchPictures();
    fetchProducts();
  }, [fetchPictures]);

  return (
    <main className={styles.HomePage}>
      <h1 className={styles.HiddenTitle}>Product Catalog</h1>
      <h2 className={styles.Title}>{homeTitle}</h2>
      <PicturesSlider pictures={pictures} className={styles.PicturesSlider} />
      <BrandNew product={products[0]} />
    </main>
  );
};
