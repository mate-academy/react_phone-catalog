import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { Picture } from '../../types/types';
import { PicturesSlider } from '../PicturesSlider';
import { translateItem } from '../../../shared/functions/functions';
import styles from './Welcome.module.scss';

export const Welcome: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
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

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  return (
    <section className={styles.Welcome}>
      <h2 className={styles.Title}>{homeTitle}</h2>
      <PicturesSlider pictures={pictures} className={styles.PicturesSlider} />
    </section>
  );
};
