import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import styles from './RightsPage.module.scss';

const arrayRights = [...Array(7)];

export const RightsPage: FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.rightsPage}>
      <Title level={1}>{t('rights.userRights')}</Title>

      {arrayRights.map((_, index) => (
        <article key={index + 1}>
          <Title level={3}>{t(`rights.titles.title${index + 1}`)}</Title>
          <p>{t(`rights.content.text${index + 1}`)}</p>
        </article>
      ))}
    </section>
  );
};
