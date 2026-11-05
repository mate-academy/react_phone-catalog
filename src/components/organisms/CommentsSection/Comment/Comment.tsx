import classNames from 'classnames';

import { Typography } from '@/components/atoms';
import { Rating } from '@/components/molecules';

import styles from './Comment.module.scss';

type Props = {
  className?: string;
  name?: string;
  date?: string;
  specs?: string;
  text?: string;
  rate?: 0 | 1 | 2 | 3 | 4 | 5;
};

export const Comment = ({
  className,
  name = 'Peter Marker',
  date = '11.09.2001',
  specs = 'Color: Blue. Memory: 256GB',
  text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quam, in, a corrupti accusantium tempora temporibus odio consequatur eaque sint suscipit. Voluptates quis nam qui numquam ipsum. Asperiores, animi sit!',
  rate = 5,
}: Props) => {
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.info}>
        <Typography
          variant="h4"
          className={styles.name}
        >
          {name}
        </Typography>

        <Typography
          variant="smalltext"
          className={styles.date}
        >
          {date}
        </Typography>
      </div>

      <Typography
        variant="smalltext"
        className={styles.specs}
      >
        {specs}
      </Typography>

      <Typography
        variant="bodytext"
        className={styles.commentText}
      >
        {text}
      </Typography>

      <Rating
        rate={rate}
        className={styles.rating}
      />
    </div>
  );
};
