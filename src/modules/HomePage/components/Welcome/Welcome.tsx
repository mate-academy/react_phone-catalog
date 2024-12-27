// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { Picture } from '../../types/types';
import { PicturesSliderSkeleton } from '../PicturesSliderSkeleton';
import { PicturesSlider } from '../PicturesSlider';
import styles from './Welcome.module.scss';
import { LoadingStatus } from '../../../shared/types/enums';
import { useDataLoader } from '../../../shared/hooks/useDataLoader';
import { bannersFile } from '../../../shared/consts/apiFiles';

export const Welcome: React.FC = () => {
  const [pictures, loadingStatus, responseStatus, reload] =
    useDataLoader<Picture>(bannersFile);
  const { homeTitle } = useLanguage().localeTexts;

  const handleReloadClick = () => {
    reload();
  };

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
