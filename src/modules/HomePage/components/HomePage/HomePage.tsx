import { useCallback, useEffect, useState } from 'react';
import { PicturesSlider } from '../PicturesSlider';
import styles from './HomePage.module.scss';
import { Picture } from '../../types/types';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { translateItem } from '../../../shared/functions/functions';

export const HomePage: React.FC = () => {
  const { language, localeTexts } = useLanguage();
  const { homeTitle } = localeTexts;
  const [pictures, setPictures] = useState<Picture[]>([]);

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

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <main className={styles.HomePage}>
      <h1 className={styles.HiddenTitle}>Product Catalog</h1>
      <h2 className={styles.Title}>{homeTitle}</h2>
      <PicturesSlider pictures={pictures} className={styles.PicturesSlider} />
    </main>
  );
};
