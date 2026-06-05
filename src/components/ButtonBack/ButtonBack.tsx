import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { HTMLAttributes } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

export const ButtonBack = ({ ...Props }: HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  return (
    <div {...Props}>
      <button
        className={styles.button}
        onClick={() => {
          navigate('..');
        }}
      >
        <Icon className={styles.icon} type="arrowRight"></Icon>
        {t('buttonBack')}
      </button>
    </div>
  );
};
