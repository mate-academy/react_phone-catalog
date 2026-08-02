import classNames from 'classnames';
import styles from './FavButton.module.scss';
import FavoriteIcon from '../../../../assets/icons/Favorites.svg';
export type FavButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    count?: number;
    isActive?: boolean;
};

export const FavButton = ({
    onClick,
    disabled = false,
    count = 0,
    isActive = false,
}: FavButtonProps) => {
    return (
        <button
            className={classNames(styles.favButton, {
                [styles['favButton--active']]: isActive,
            })}
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label="Add to favourites"
            aria-current={isActive ? 'page' : undefined}
        >
            <img
                src={FavoriteIcon}
                alt="Favorite"
                className={styles.favButtonIcon}
            />
            {count > 0 && (
                <span className={styles.favButton__count}>{count}</span>
            )}
        </button>
    );
};
