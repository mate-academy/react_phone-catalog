import classNames from 'classnames';
import { Link } from 'react-router-dom';
import favoriteIcon from '../../../../assets/icons/Favorites.svg';
import favoriteFilledIcon from '../../../../assets/icons/Favorites-Filled.svg';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
    id: string | number;
    detailsPath: string;
    image: string;
    title: string;
    price: number;
    fullPrice?: number;
    screen?: string;
    capacity?: string;
    ram?: string;
    isFavorite?: boolean;
    onFavoriteToggle?: (id: string | number) => void;
    isInCart?: boolean;
    onAddToCart?: (id: string | number) => void;
    hoverEffect?: boolean;
}

export const ProductCard = ({
    id,
    detailsPath,
    image,
    title,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    isFavorite = false,
    onFavoriteToggle,
    isInCart = false,
    onAddToCart,
    hoverEffect = true,
}: ProductCardProps) => {
    const handleFavoriteClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation();
        onFavoriteToggle?.(id);
    };

    const handleAddToCartClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation();
        onAddToCart?.(id);
    };

    return (
        <article
            className={classNames(styles.productCard, {
                [styles['productCard--noHover']]: !hoverEffect,
            })}
        >
            <Link
                to={detailsPath}
                className={styles.productCard__stretchedLink}
                aria-label={title}
            />

            <img
                className={styles.productCard__image}
                src={image}
                alt={title}
            />

            <h3 className={styles.productCard__title}>{title}</h3>

            <div className={styles.productCard__prices}>
                <span className={styles.productCard__price}>${price}</span>
                {fullPrice && (
                    <span className={styles.productCard__fullPrice}>
                        ${fullPrice}
                    </span>
                )}
            </div>

            <div className={styles.productCard__specs}>
                {screen && (
                    <div className={styles.productCard__detail}>
                        <p className={styles.productCard__screen}>Screen</p>
                        <p className={styles.productCard__screenValue}>
                            {screen}
                        </p>
                    </div>
                )}
                {capacity && (
                    <div className={styles.productCard__detail}>
                        <p className={styles.productCard__capacity}>Capacity</p>
                        <p className={styles.productCard__capacityValue}>
                            {capacity}
                        </p>
                    </div>
                )}
                {ram && (
                    <div className={styles.productCard__detail}>
                        <p className={styles.productCard__ram}>RAM</p>
                        <p className={styles.productCard__ramValue}>{ram}</p>
                    </div>
                )}
            </div>
            <div className={styles.productCard__buttonContainer}>
                <button
                    className={`${styles.productCard__button} ${
                        isInCart ? styles['productCard__button--added'] : ''
                    }`}
                    type="button"
                    onClick={handleAddToCartClick}
                    disabled={isInCart}
                >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                    className={styles.productCard__favorite}
                    type="button"
                    onClick={handleFavoriteClick}
                    aria-label={
                        isFavorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                    }
                >
                    <img
                        className={styles.productCard__favoriteIcon}
                        src={isFavorite ? favoriteFilledIcon : favoriteIcon}
                        alt=""
                        aria-hidden="true"
                    />
                </button>
            </div>
        </article>
    );
};
