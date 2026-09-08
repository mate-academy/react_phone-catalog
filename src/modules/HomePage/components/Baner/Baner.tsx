import React from 'react';
import styles from './Baner.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  item: {
    id: number;
    img: string;
    title: string;
  };
};

const Baner: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.baner}>
      <div className={styles.baner__left}>
        <h2 className={styles.baner__title}>
          Now avilable <br /> in out store!
        </h2>
        <p className={styles.baner__text}>Be the first</p>

        <Link to="" className={styles.baner__btn}>
          Order now
        </Link>
      </div>
      <div className={styles.baner__right}>
        <h3 className={styles.baner__subtitle}>{item.title}</h3>
        <p className={styles.baner__text}>Pro Beyond.</p>
        <div className={styles.baner__img}>
          <img src={item.img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Baner;
