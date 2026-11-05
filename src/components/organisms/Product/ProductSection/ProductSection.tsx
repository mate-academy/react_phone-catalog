import classNames from 'classnames';

import { Typography } from '@/components/atoms';

import styles from './ProductSection.module.scss';

type Props = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

export const ProductSection = ({ title, className, children }: Props) => {
  return (
    <section className={classNames(styles.section, className)}>
      <Typography
        variant="h3"
        className={styles.title}
      >
        {title}
      </Typography>

      <span className={styles.line} />

      {children}
    </section>
  );
};
