import { IconImageModifiers } from '../../../types/IconStyles';

import cn from 'classnames';
import styles from './IconWithCounter.module.scss';
import Icon from '../../shared/Icon';

interface Props {
  href: string;
  count: number;
  image: IconImageModifiers | IconImageModifiers[];
  mobileMenu?: boolean;
}

const IconWithCounter: React.FC<Props> = ({
  href,
  count,
  image,
  mobileMenu,
}) => {
  const isActiveLink = location.pathname.startsWith('/' + href);

  return (
    <div
      className={cn(styles.counter, {
        [styles.counter_linkActive]: isActiveLink,
      })}
    >
      <Icon
        href={href}
        iconStyles={{
          icon: mobileMenu ? ['width_100', 'type_mobile_menu'] : 'width_100',
          image,
        }}
      />
      {count != 0 && <span className={styles.counter__number}>{count}</span>}
    </div>
  );
};

export default IconWithCounter;
