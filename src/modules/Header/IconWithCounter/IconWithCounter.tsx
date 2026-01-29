import { IconImageModifiers } from '../../../types/IconStyles';

import cn from 'classnames';
import Icon from '../../shared/Icon';
import styles from './IconWithCounter.module.scss';

interface Props {
  href: string;
  count: number;
  image: IconImageModifiers | IconImageModifiers[];
}

const IconWithCounter: React.FC<Props> = ({ href, count, image }) => {
  const isActiveLink = location.pathname.startsWith('/' + href);

  return (
    <div
      className={cn(styles.counter, {
        [styles.counter_linkActive]: isActiveLink,
      })}
    >
      <Icon href={href} iconStyles={{ icon: 'type_tablet', image }} />
      {count != 0 && <span className={styles.counter__number}>{count}</span>}
    </div>
  );
};

export default IconWithCounter;
