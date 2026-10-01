import { Icon, IconName } from '../Icon/Icon';
import styles from './IconWithBadge.module.scss';

type Props = {
  name: IconName;
  count?: number;
};

export const IconWithBadge = ({ name, count = 0 }: Props) => {
  return (
    <span className={styles.wrapper}>
      <Icon name={name} />
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </span>
  );
};
