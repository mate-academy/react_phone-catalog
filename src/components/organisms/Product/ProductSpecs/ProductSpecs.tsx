import { Typography } from '@/components/atoms';

import styles from './ProductSpecs.module.scss';

type Props = {
  specs: {
    specName: string;
    specText: string;
  }[];
};

export const ProductSpecs = ({ specs }: Props) => {
  return (
    <article className={styles.specs}>
      {specs.map(({ specName, specText }) => (
        <div
          key={`${specName}-${specText}`}
          className={styles.row}
        >
          <Typography
            variant="bodytext"
            className={styles.specName}
          >
            {specName}
          </Typography>

          <span
            className={styles.specDivider}
            aria-hidden="true"
          />

          <Typography
            variant="bodytext"
            className={styles.specText}
          >
            {specText[0].toUpperCase() + specText.slice(1)}
          </Typography>
        </div>
      ))}
    </article>
  );
};
