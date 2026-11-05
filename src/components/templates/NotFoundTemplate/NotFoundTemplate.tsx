import classNames from 'classnames';

import { Typography } from '@/components/atoms';
import { ImageWithFallback } from '@/components/organisms';

import styles from './NotFouindTemplate.module.scss';

type Props = {
  title: string;
  image: string;
  className?: string;
};

export const NotFoundTemplate = ({ title, image, className }: Props) => {
  return (
    <section className={classNames(styles.container, className)}>
      <Typography
        variant="h2"
        className={styles.title}
      >
        {title}
      </Typography>
      <ImageWithFallback
        src={image}
        alt={title}
        className={styles.image}
      />
    </section>
  );
};
