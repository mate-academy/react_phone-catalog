import { NavLink } from 'react-router-dom';
import styles from './IconTrail.module.scss';

type IconTrailProps = {
  name: string;
  choseProduct: string | null;
};
export const IconTrail = ({ name, choseProduct }: IconTrailProps) => {
  return (
    <section className={styles.trail}>
      <NavLink to="/">
        <img src="./icons/Home.svg" alt="home" />
      </NavLink>

      <img src="./icons/ChevronArrowRight.svg" alt="home" />

      <p>{name}</p>

      {choseProduct !== null && (
        <>
          <img src="./icons/ChevronArrowRight.svg" alt="home" />
          <p>{choseProduct}</p>
        </>
      )}
    </section>
  );
};
