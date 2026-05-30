import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import type { ProductListItem } from '../../api/types';
import s from './ProductCard.module.scss';
import { money } from '../../utils/format';
import HeartEmpty from '../../../assets/Favourites (Heart Like).svg';
import HeartFull from '../../../assets/Favourites Filled (Heart Like).svg';

type Props = {
  product: ProductListItem;
  priceMode?: 'discount' | 'full' | 'current';
};

export const ProductCard: React.FC<Props> = ({
  product,
  priceMode = 'full',
}) => {
  const { items, add, remove } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const specs: [string, string][] = [
    ['Screen', product.screen],
    ['Capacity', product.capacity],
    ['RAM', product.ram],
  ];

  const fav = isFavorite(product.itemId);
  const inCart = items.some(i => i.productId === product.itemId);

  const renderPrice = () => {
    const hasDiscount = product.fullPrice > product.price;

    if (priceMode === 'discount' && hasDiscount) {
      return (
        <div className={s.prices}>
          <span className={s.price}>{money(product.price)}</span>
          <span className={s.fullPrice}>{money(product.fullPrice)}</span>
        </div>
      );
    }

    if (priceMode === 'full') {
      return (
        <div className={s.prices}>
          <span className={s.price}>{money(product.fullPrice)}</span>
        </div>
      );
    }

    return (
      <div className={s.prices}>
        <span className={s.price}>{money(product.price)}</span>
      </div>
    );
  };

  return (
    <article className={s.card}>
      <Link to={`/product/${product.itemId}`} className={s.imageWrap}>
        <img src={`/${product.image}`} alt={product.name} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={s.title}>
        {product.name}
      </Link>

      {renderPrice()}

      <div className={s.sep} />

      {specs.length > 0 && (
        <ul className={s.specs}>
          {specs.map(([label, value]) => (
            <li key={label} className={s.specRow}>
              <span className={s.specLabel}>{label}</span>
              <span className={s.specValue}>{String(value)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className={s.actions}>
        <button
          type="button"
          className={`${s.cartBtn} ${inCart ? s.inCart : ''}`}
          onClick={() =>
            inCart ? remove(product.itemId) : add(product.itemId)
          }
          aria-pressed={inCart}
          title={inCart ? 'Remove from cart' : 'Add to cart'}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${s.heartBtn} ${fav ? s.active : ''}`}
          aria-pressed={fav}
          onClick={() => toggle(product.itemId)}
          title={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <img
            src={fav ? HeartFull : HeartEmpty}
            alt=""
            className={s.heartIcon}
            width={16}
            height={16}
            decoding="async"
          />
        </button>
      </div>
    </article>
  );
};
