import s from './Aside.module.scss';
import { Link } from '@/atoms';
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
      className={cn(s.aside, { [s.asideOpen]: isOpen })}
      aria-hidden={!isOpen}
    >
      <div className={s.aside__menu}>
        <div className={s.aside__link}>
          <Link to="/" onClick={onNavigate}>
            Home
          </Link>
        </div>
        <div className={s.aside__link}>
          <Link to="/phones" onClick={onNavigate}>
            Phones
          </Link>
        </div>
        <div className={s.aside__link}>
          <Link to="/tablets" onClick={onNavigate}>
            Tablets
          </Link>
        </div>
        <div className={s.aside__link}>
          <Link to="/accessories" onClick={onNavigate}>
            Accessories
          </Link>
        </div>
      </div>

      <div className={s.control}>
        <RouterLink
          to="/liked"
          className={cn(s.control__button, s.response__b)}
          onClick={onNavigate}
        >
          <HeartIcon className={s.control__icon} />
        </RouterLink>
        <RouterLink
          to="/shopping_bag"
          className={cn(s.control__button, s.response__b)}
          onClick={onNavigate}
        >
          <BagIcon className={s.control__icon} />
        </RouterLink>
      </div>
    </aside>
  );
};

export default Aside;
