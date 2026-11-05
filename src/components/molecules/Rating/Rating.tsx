import classNames from 'classnames';

import { StarIcon } from '@/components/atoms';

import type { Rate } from '@/shared/types';

import styles from './Rating.module.scss';

type Props = {
  rate: Rate;
  onChange?: (rate: Rate) => void;
  className?: string;
};

export const Rating = ({ rate, onChange, className }: Props) => {
  return (
    <div
      className={classNames(styles.container, className, {
        [styles.interactive]: Boolean(onChange),
      })}
      role={onChange ? 'group' : undefined}
      aria-label={onChange ? 'Product rating' : undefined}
    >
      {([1, 2, 3, 4, 5] as const).map((value) =>
        onChange ?
          <button
            key={value}
            type="button"
            className={styles.starButton}
            onClick={() => onChange(value)}
            aria-label={`${value} out of 5 stars`}
            aria-pressed={rate === value}
          >
            <StarIcon filled={value <= rate} />
          </button>
        : <StarIcon
            key={value}
            filled={value <= rate}
          />,
      )}
    </div>
  );
};
