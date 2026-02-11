import useLanguageStore from '../../stores/useLanguageStore';
import styles from './NotFound.module.scss';
import pageNotFound from '../../images/page-not-found.png';

type Props = {
  detailsPage?: boolean;
};

export const NotFound: React.FC<Props> = ({ detailsPage = false }) => {
  const { t } = useLanguageStore();

  return (
    <div className={styles.container}>
      {detailsPage ? (
        <h2 className={styles.title}>{t('product_not_found')}</h2>
      ) : (
        <h2 className={styles.title}>{t('page_not_found')}</h2>
      )}
      <img
        className={styles.img}
        src={pageNotFound}
        alt="favourites is empty"
      />
    </div>
  );
};
