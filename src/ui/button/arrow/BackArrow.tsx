import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Icons } from '@ui/index';

import styles from './BackArrow.module.scss';

export const BackArrow: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const localTitle = t('back.title');
  const localAria = t('back.aria');
  const localSub = t('back.sub');

  return (
    <button
      type="button"
      className={styles.back}
      onClick={() => navigate(-1)}
      title={localSub}
      aria-label={localAria}
    >
      <Icons.ArrowLeftIcon />
      <span>{localTitle}</span>
    </button>
  );
};
