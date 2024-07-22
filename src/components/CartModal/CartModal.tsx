import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './CartModal.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import gStyles from '../../styles/general.module.scss';

type Props = {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
};

export const CartModal: React.FC<Props> = ({ onAccept, showModal }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.block} utilityClass__modal`}>
      <div className={styles.card}>
        <h4 className={styles.card__title}>
          {t(TRANSLATIONS.cart.modal.title)}
        </h4>
        <p>{t(TRANSLATIONS.cart.modal.subtitle)}</p>

        <div className={gStyles.divider}></div>

        <div className={styles.card__buttons}>
          <button
            type="button"
            className={`${btnStyles.block} ${btnStyles.primary}`}
            onClick={() => {
              onAccept();
              showModal(false);
            }}
            aria-label={t(TRANSLATIONS.cart.modal.button.clear.ariaLabel)}
          >
            {t(TRANSLATIONS.cart.modal.button.clear.text)}
          </button>
          <button
            type="button"
            className={btnStyles.block}
            onClick={() => showModal(false)}
            aria-label={t(TRANSLATIONS.cart.modal.button.cancel.ariaLabel)}
          >
            {t(TRANSLATIONS.cart.modal.button.cancel.text)}
          </button>
        </div>
      </div>
    </div>
  );
};
