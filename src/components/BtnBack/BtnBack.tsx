import { Link } from 'react-router-dom';
import styles from './BtnBack.module.scss';
import { useTranslation } from 'react-i18next';

const BtnBack = () => {
  const { t } = useTranslation();

  return (
    <Link to=".." className={styles.back}>
      {' '}
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `rotate(180deg)`,
          transformOrigin: 'center center',
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
        ></path>
      </svg>{' '}
      <span className={styles.text}>{t('back')}</span>
    </Link>
  );
};

export default BtnBack;
