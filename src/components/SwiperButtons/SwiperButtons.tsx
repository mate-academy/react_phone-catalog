import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './SwiperButtons.module.scss';

type Props = {
  isSwiper: boolean;
  transform: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  maxOffset: number;
};

export const SwiperButtons: React.FC<Props> = ({
  transform,
  handlePrevClick,
  handleNextClick,
  maxOffset,
  isSwiper,
}) => {
  const { theme } = useTheme();

  return isSwiper ? (
    <>
      <button
        className={classNames(styles.swiperButtons__button, styles['swiperButtons__button--prev'], {
          [styles['swiperButtons__button--lightTheme']]: theme === 'light',
          [styles['swiperButtons__button--prev-lightTheme']]: theme === 'light',
        })}
        disabled={transform === 0}
      ></button>

      <button
        className={classNames(styles.swiperButtons__button, styles['swiperButtons__button--next'], {
          [styles['swiperButtons__button--lightTheme']]: theme === 'light',
          [styles['swiperButtons__button--next-lightTheme']]: theme === 'light',
        })}
        disabled={transform === maxOffset}
      ></button>
    </>
  ) : (
    <div className={styles.swiperButtons}>
      <button
        className={classNames(styles.swiperButtons__button, styles['swiperButtons__button--prev'], {
          [styles['swiperButtons__button--lightTheme']]: theme === 'light',
          [styles['swiperButtons__button--prev-lightTheme']]: theme === 'light',
        })}
        onClick={handlePrevClick}
        disabled={transform === 0}
      ></button>

      <button
        className={classNames(styles.swiperButtons__button, styles['swiperButtons__button--next'], {
          [styles['swiperButtons__button--lightTheme']]: theme === 'light',
          [styles['swiperButtons__button--next-lightTheme']]: theme === 'light',
        })}
        onClick={handleNextClick}
        disabled={transform === maxOffset}
      ></button>
    </div>
  );
};
