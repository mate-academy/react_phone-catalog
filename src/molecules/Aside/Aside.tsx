import styles from './Aside.module.scss';
import Link from '@/atoms/Link';
import HeartIcon from '@/assets/icons/heart.svg?react';
import BagIcon from '@/assets/icons/shoping_bag.svg?react';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Props = {
  isOpen?: boolean;
  onNavigate?: () => void;
};

const Aside = ({ isOpen = false, onNavigate }: Props) => {
  return (
    <aside
      id="mobile-menu"
      className={cn(styles.aside, { [styles.asideOpen]: isOpen })}
      aria-hidden={!isOpen}
    >
      <div className={styles.aside__menu}>
        <div className={styles.aside__link}>
          <Link to="/" onClick={onNavigate}>
            Home
          </Link>
        </div>
        <div className={styles.aside__link}>
          <Link to="/phones" onClick={onNavigate}>
            Phones
          </Link>
        </div>
        <div className={styles.aside__link}>
          <Link to="/tablets" onClick={onNavigate}>
            Tablets
          </Link>
        </div>
        <div className={styles.aside__link}>
          <Link to="/accessories" onClick={onNavigate}>
            Accessories
          </Link>
        </div>
      </div>

      <div className={styles.control}>
        <RouterLink
          to="/liked"
          className={cn(styles.control__button, styles.response__b)}
          onClick={onNavigate}
        >
          <HeartIcon className={styles.control__icon} />
        </RouterLink>
        <RouterLink
          to="/shopping_bag"
          className={cn(styles.control__button, styles.response__b)}
          onClick={onNavigate}
        >
          <BagIcon className={styles.control__icon} />
        </RouterLink>
      </div>
    </aside>
  );
};

export default Aside;
