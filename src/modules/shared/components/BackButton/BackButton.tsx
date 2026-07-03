/* eslint-disable max-len */

//#region imports
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import styles from './BackButton.module.scss';
//#endregion

export const BackButton = () => {
  const { t } = useTranslation('cart');
  const navigate = useNavigate();

  return (
    <button
      className={styles.backButton}
      onClick={() => {
        navigate(-1);
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arrowIcon}
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4708 3.52861C10.2104 3.26826 9.78829 3.26826 9.52794 3.52861L5.52794 7.52861C5.26759 7.78896 5.26759 8.21107 5.52794 8.47141L9.52794 12.4714C9.78829 12.7318 10.2104 12.7318 10.4708 12.4714C10.7311 12.2111 10.7311 11.789 10.4708 11.5286L6.94216 8.00001L10.4708 4.47141C10.7311 4.21107 10.7311 3.78896 10.4708 3.52861Z"
        />
      </svg>

      {capitalizeFirstWord(t('back'))}
    </button>
  );
};
