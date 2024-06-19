import cn from 'classnames';

import styles from './FavouriteButton.module.scss';

type Props = {
  children: React.ReactNode;
  size?: string;
  handleClick?: () => void;
};

export const FavouriteButton: React.FC<Props> = ({
  children,
  handleClick = () => {},
  size,
}) => {
  return (
    <button
      className={cn(styles.FavouriteButton, {
        [styles.Large]: size === 'large',
      })}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
