import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import styles from './Banner.module.scss';
import { Slider } from './slider/';

export const Banner: FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.banner}>
      <Title level={2}>{t('title')}</Title>

      <Slider />
    </section>
  );
};
