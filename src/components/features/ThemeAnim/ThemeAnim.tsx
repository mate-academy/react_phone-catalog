import classNames from 'classnames';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './ThemeAnim.module.scss';
import { useTheme } from '../../../hooks/useTheme';

type Props = {
  showWrapper: boolean;
};

export const ThemeAnim = ({ showWrapper }: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__active]: showWrapper,
      })}
    >
      <div className={classNames(styles.bg)}>
        <div className={classNames(styles.scene)}>
          <div
            className={classNames(styles.orbit, {
              [styles.orbit__active]: theme === 'dark',
            })}
          >
            <div className={styles.sun}>
              <img
                src={imageUrl('icons/Sun.svg')}
                alt=""
                className={styles.img}
              />
            </div>
            <div className={styles.moon}>
              <img
                src={imageUrl('icons/Moon.svg')}
                alt=""
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.hidden}></div>
        </div>
      </div>
    </div>
  );
};
