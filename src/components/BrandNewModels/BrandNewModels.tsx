// src/components/BrandNewModels/BrandNewModels.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './BrandNewModels.module.css';
import { useCart } from '../../pages/ShoppingCart/cartContext';
import { useFavorites } from '../../pages/Favorites/FavoritesContext';
import { useToast } from '../Toast/ToastContext';

export interface BrandNewModelsProps {
  id?: string;
  detailsLink?: string;
  className?: string;
  title?: string;
  titleLevel?: 2 | 3 | 4 | 5 | 6;
  imageSrc?: string;
  imageAlt?: string;
  price?: string;
  specs?: {
    screen?: string;
    capacity?: string;
    ram?: string;
  };
  'data-testid'?: string;
  onButtonClick?: () => void;
  onFavouriteClick?: () => void;
  isFavourite?: boolean;
}

const BrandNewModels: React.FC<BrandNewModelsProps> = ({
  id,
  detailsLink,
  className = '',
  title,
  titleLevel = 3,
  imageSrc,
  imageAlt,
  price = 'R$ 999',
  specs,
  'data-testid': dataTestId = 'brand-new-model',
  onButtonClick,
  onFavouriteClick,
}) => {
  const Tag = `h${titleLevel}` as keyof JSX.IntrinsicElements;
  const imgSrc = imageSrc;
  const linkTo = detailsLink ?? (id ? `/product/${id}` : undefined);

  const { addItem, isInCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();

  const alreadyInCart = id ? isInCart(id) : false;
  const favActive = id ? isFavorite(id) : false;

  const product = {
    id: id ?? '',
    title: title ?? '',
    price,
    imageSrc: imgSrc,
    specs: specs ?? {},
  };

  // 1) Não altera o texto do botão; 2) showToast sempre após addItem
  const handleAddToCart = () => {
    if (!id) {
      return;
    }

    if (alreadyInCart) {
      // opcional: feedback informativo sem alterar texto do botão
      showToast('Item já está no carrinho', 'info');
      {
        return;
      }
    }

    addItem(product);
    showToast('Adicionado ao carrinho!', 'success');

    if (onButtonClick) {
      onButtonClick();
    }
  };

  // showToast tanto ao adicionar quanto ao remover favoritos
  const handleFavouriteClick = () => {
    if (!id) {
      return;
    }

    if (favActive) {
      removeFavorite(id);
      showToast('Removido dos favoritos', 'info');
    } else {
      addFavorite(product);
      showToast('Adicionado a favoritos!', 'success');
    }

    // Notifica o pai se ele passou um handler
    if (typeof onFavouriteClick === 'function') {
      onFavouriteClick();
    }
  };

  const Image = imgSrc ? (
    <img
      src={imgSrc}
      alt={imageAlt ?? title}
      className={styles.img}
      loading="lazy"
      data-testid="brand-image"
    />
  ) : (
    <div className={styles.imgPlaceholder} aria-hidden="true" />
  );

  const Title = (
    <Tag className={styles.title} data-testid={`${dataTestId}-title`}>
      {title}
    </Tag>
  );

  return (
    <article
      className={`${styles.container} ${className}`.trim()}
      role="group"
      aria-label="Brand new model card"
      data-testid={dataTestId}
    >
      {/* imagem */}
      <div className={styles.containerImg} data-testid="brand-image-wrapper">
        {linkTo ? (
          <Link to={linkTo} aria-label={`Ver detalhes de ${title}`}>
            {Image}
          </Link>
        ) : (
          Image
        )}
      </div>

      {/* título */}
      {linkTo ? (
        <Link
          to={linkTo}
          className={styles.titleLink}
          aria-label={`Ver detalhes de ${title}`}
        >
          {Title}
        </Link>
      ) : (
        Title
      )}

      {/* preço */}
      <div
        className={styles.priceContainer}
        data-testid={`${dataTestId}-priceContainer`}
      >
        <p className={styles.price} data-testid={`${dataTestId}-price`}>
          {price}
        </p>
        <p className={styles.priceOff} data-testid={`${dataTestId}-priceOff`}>
          {price}
        </p>
      </div>

      {/* separador */}
      <div className={styles.separator} aria-hidden="true" />

      {/* specs */}
      <div
        className={styles.specRow}
        data-testid={`${dataTestId}-specs-screen`}
      >
        <span className={styles.specLabel}>Screen</span>
        <span className={styles.specValue}>{specs?.screen ?? '—'}</span>
      </div>

      <div
        className={styles.specRow}
        data-testid={`${dataTestId}-specs-capacity`}
      >
        <span className={styles.specLabel}>Capacity</span>
        <span className={styles.specValue}>{specs?.capacity ?? '—'}</span>
      </div>

      <div className={styles.specRow} data-testid={`${dataTestId}-specs-ram`}>
        <span className={styles.specLabel}>RAM</span>
        <span className={styles.specValue}>{specs?.ram ?? '—'}</span>
      </div>

      {/* botões */}
      <div className={styles.buttonRow}>
        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="md"
          className={styles.addButton}
          data-testid={`${dataTestId}-add-button`}
          ariaLabel="Adicionar ao carrinho"
        >
          Adicionar ao carrinho
        </Button>

        <button
          type="button"
          onClick={handleFavouriteClick}
          className={`${styles.favButton} ${favActive ? styles.active : ''}`}
          aria-label={
            favActive ? 'Remove from favourites' : 'Add to favourites'
          }
          aria-pressed={favActive ? 'true' : 'false'}
          data-testid={`${dataTestId}-fav-button`}
        >
          {favActive ? '❤️' : '🤍'}
        </button>
      </div>
    </article>
  );
};

export default BrandNewModels;
export { BrandNewModels };
