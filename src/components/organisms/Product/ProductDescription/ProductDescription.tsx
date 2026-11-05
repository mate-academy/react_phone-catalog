import { Typography } from '@/components/atoms';

import type { Description } from '@/shared/types';

import styles from './ProductDescription.module.scss';

export const ProductDescription = ({
  description,
}: {
  description: Description[];
}) => {
  return (
    <div className={styles.description}>
      {description.map(({ title, text }) => {
        return (
          <div
            className={styles.section}
            key={`${title}-${text}`}
          >
            <Typography
              variant="h4"
              className={styles.title}
            >
              {title}
            </Typography>

            <Typography
              variant="bodytext"
              className={styles.text}
            >
              {text}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};
