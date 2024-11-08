import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import styles from './Order.module.scss';

export const Order: FC = () => {
  const { t } = useTranslation();
  const localTitle = t('home.banner.order.title');
  const localText = t('home.banner.order.text');
  const localOrder = t('home.banner.order.order');
  const localAria = t('home.banner.order.aria');

  return (
    <div className={styles.order}>
      <Title level={3}>
        <span className={styles.gradient}>{localTitle}</span>👌
      </Title>
      <p>{localText}</p>
      <button className={styles.button} type="button" aria-label={localAria}>
        {localOrder}
      </button>
    </div>
  );
};
