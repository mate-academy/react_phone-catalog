import cn from 'classnames';

import styles from './FavouriteButton.module.scss';

type Props = {
  children: React.ReactNode;
  handleClick?: () => void;
  className?: string;
  isLarge: boolean;
};

export const FavouriteButton: React.FC<Props> = ({
  children,
  handleClick = () => {},
  className = '',
  isLarge,
}) => {
  return (
    <button
      className={cn(styles.FavouriteButton, styles[className], {
        [styles.Large]: isLarge,
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
