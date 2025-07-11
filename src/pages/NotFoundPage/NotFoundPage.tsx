import { useEffect } from 'react';
import styles from './NotFound.module.scss';
import bug_phone from '../../assets/icons/bug_phone.svg';
import { Link } from 'react-router-dom';

// MODIFIED CODE FROM CODEPEN.IO!!
// https://codepen.io/aido179-1471800764/pen/jZJjpo

interface Props {
  title?: string;
  description?: string;
  showReload?: boolean;
}

export const NotFoundPage = ({
  title = '0 results found',
  description = "Sorry! We couldn't find any results.",
  showReload = false,
}: Props) => {
  useEffect(() => {
    const bounce = document.querySelector(`.${styles.bounce}`) as HTMLElement;
    if (bounce) {
      bounce.style.backgroundImage = `url(${bug_phone})`;
    }
  }, []);

  const reload = (): void => {
    window.location.reload();
  };

  return (
    <div className={styles.emptyIconContainer}>
      <div className={styles.animationContainer}>
        <div className={styles.bounce}></div>
        <div className={styles.pebble1}></div>
        <div className={styles.pebble2}></div>
        <div className={styles.pebble3}></div>
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.btnBlock}>
        <Link to="/" className={styles.btn}>
          Home
        </Link>
        {showReload && (
          <button onClick={reload} className={styles.btn}>
            Reload
          </button>
        )}
      </div>
    </div>
  );
};
