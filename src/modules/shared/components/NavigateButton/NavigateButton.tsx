import styles from './NavigateButton.module.scss';
import { NavLink, useParams } from 'react-router-dom';

export const NavigateButton = () => {
  const { category } = useParams();

  return (
    <div className={styles.navigate}>
      <NavLink to="/" className={styles.button}>
        <img src="/img/SliderImg/Home.svg" alt="Home" />
      </NavLink>
      <img src="img/SliderImg/Arrow Right.svg" alt="ArrowRight" />
      <div className={styles.category}>{category}</div>
    </div>
  );
};
