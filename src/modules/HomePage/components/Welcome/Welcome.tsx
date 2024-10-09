import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { Picture } from '../../types/types';
import { PicturesSlider } from '../PicturesSlider';
import { translateItem } from '../../../shared/functions/functions';
import styles from './Welcome.module.scss';
import { PicturesSliderSkeleton } from '../PicturesSliderSkeleton';
import { LoadingStatus } from '../../../shared/types/enums';

export const Welcome: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.Loading);
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined,
  );
  const { language, localeTexts } = useLanguage();
  const { homeTitle } = localeTexts;

  const handleReloadClick = () => {
    setLoadingStatus(LoadingStatus.Loading);
  };

  const fetchPictures = useCallback(async () => {
    setResponseStatus(undefined);

    try {
      const response = await fetch('api/banners.json');

      if (!response.ok) {
        setResponseStatus(response.status);
        throw new Error();
      }

      const loadedPictures = await response.json();

      setPictures(translateItem<Picture>(loadedPictures, language));

      if (loadedPictures.length) {
        setLoadingStatus(LoadingStatus.Success);
      } else {
        setLoadingStatus(LoadingStatus.Error);
      }
    } catch {
      setLoadingStatus(LoadingStatus.Error);
    }
  }, [language]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.Loading) {
      fetchPictures();
    }
  }, [fetchPictures, loadingStatus]);

  return (
    <section className={styles.Welcome}>
      <h2 className={styles.Title}>{homeTitle}</h2>
      {loadingStatus === LoadingStatus.Success ? (
        <PicturesSlider pictures={pictures} className={styles.PicturesSlider} />
      ) : (
        <PicturesSliderSkeleton
          loadingStatus={loadingStatus}
          onReloadClick={handleReloadClick}
          responseStatus={responseStatus}
          className={styles.PicturesSlider}
        />
      )}
    </section>
  );
};
