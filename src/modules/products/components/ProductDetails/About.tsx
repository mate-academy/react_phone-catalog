import { useTranslation } from 'react-i18next';

import { Line } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

import styles from './About.module.scss';

interface Description {
  title: string;
  text: string[];
}

interface Props {
  description: Description[];
  className?: string;
}

export const About = ({ description, className }: Props) => {
  const { t } = useTranslation();

  return (
    <section className={cn(styles.about, className)}>
      <div>
        <h3 className={styles.section__title}>{t('about')}</h3>
        <Line />
      </div>
      {description.map(item => (
        <article key={item.title} className={styles.about__item}>
          <h4 className={styles.about__subtitle}>{item.title}</h4>
          <p className={styles.about__text}>{item.text}</p>
        </article>
      ))}
    </section>
  );
};
