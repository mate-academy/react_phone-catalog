import styles from './SliderButton.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string;
};

export const SliderButton = ({ path }: Props) => {
  return (
    <div className={styles.container}>
      <NavLink to={path} className={styles.nav}>
        <button className={styles.nav__button}>Order Now</button>
      </NavLink>
    </div>
  );
};