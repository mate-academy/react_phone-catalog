import classNames from 'classnames';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './ButtonArrow.module.scss';
import { useTheme } from '../../../hooks/useTheme';

type Props = {
  direction: string;
  disabled?: boolean;
  onClick: () => void;
};

export const ButtonArrow = ({
  direction,
  disabled = false,
  onClick,
}: Props) => {
  const { theme } = useTheme();

  return (
    <button
      type="button"
      className={classNames(styles.button, {
        [styles.button__disabled]: disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src={
          theme === 'dark'
            ? imageUrl('icons/Arrow_white.svg')
            : imageUrl('icons/ArrowRight.svg')
        }
        alt=""
        className={classNames(
          styles.button__icon,
          styles[`button__icon_${direction}`],
        )}
      />
    </button>
  );
};
