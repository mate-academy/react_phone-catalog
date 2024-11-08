import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Greeting.module.scss';

export const Greeting: FC = () => {
  const { t } = useTranslation();

  const greetings = [
    t('contact.greeting.greet_1'),
    t('contact.greeting.greet_2'),
    t('contact.greeting.greet_3'),
    t('contact.greeting.greet_4'),
    t('contact.greeting.greet_5'),
    t('contact.greeting.greet_6'),
  ];

  return (
    <div className={styles.greeting}>
      {greetings.map((greet, index) => (
        <span key={index}>{greet}</span>
      ))}
    </div>
  );
};
