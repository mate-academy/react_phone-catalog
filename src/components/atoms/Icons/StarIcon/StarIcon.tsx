import { Icon } from '../Icon';

import starIcon from '@/shared/assets/icons/EmptyStar.svg?no-inline';
import starFilledIcon from '@/shared/assets/icons/FilledStar.svg?no-inline';

import styles from './StarIcon.module.scss';

type Props = {
  filled?: boolean;
};

export const StarIcon = ({ filled = false }: Props) => {
  if (filled) {
    return <Icon icon={starFilledIcon} />;
  }

  return (
    <Icon
      icon={starIcon}
      className={styles.emptyStar}
    />
  );
};
