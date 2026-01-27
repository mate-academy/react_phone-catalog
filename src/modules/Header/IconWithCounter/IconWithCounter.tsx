import { IconImageModifiers } from '../../../types/IconStyles';
import Icon from '../../shared/Icon';
import styles from './IconWithCounter.module.scss';

interface Props {
  href: string;
  count: number;
  image: IconImageModifiers | IconImageModifiers[];
}

const IconWithCounter: React.FC<Props> = ({ href, count, image }) => (
  <div className={styles.counter}>
    <Icon href={href} iconStyles={{ icon: 'type_tablet', image }} />
    {count != 0 && <span className={styles.counter_number}>{count}</span>}
  </div>
);

export default IconWithCounter;
