import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './ProductsListError.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import gStyles from '../../styles/general.module.scss';

type Props = {
  reload: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductsListError: React.FC<Props> = ({ reload }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.block}>
      <h2 className={gStyles.sectionTitle}>
        {t(TRANSLATIONS.products.list.error.title)}
      </h2>
      <div className={styles.reload}>
        <button
          type="button"
          className={`${btnStyles.block} ${btnStyles.primary}`}
          onClick={() => reload(true)}
          aria-label={t(TRANSLATIONS.products.list.error.button.ariaLabel)}
        >
          {t(TRANSLATIONS.products.list.error.button.text)}
        </button>
      </div>
    </section>
  );
};
