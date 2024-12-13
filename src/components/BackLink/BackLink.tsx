import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import arrowLeft from '../../images/icons/arrow_left.svg';
import arrowDark from '../../images/icons/arrow_left_for_dark.svg';
import styles from './BackLink.module.scss';

export const BackLink = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleBack = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.back}>
      <div className={styles.back__arrow}>
        <img
          src={theme === Theme.Light ? arrowLeft : arrowDark}
          alt="arrow"
          className={styles.back__img}
        />
      </div>

      <Link
        to={''}
        className={cn(styles.back__link, {
          [styles['back__link--dark']]: theme === Theme.Dark,
        })}
        onClick={handleBack}
      >
        Back
      </Link>
    </div>
  );
};
