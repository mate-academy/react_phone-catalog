import { Link } from 'react-router-dom';
import s from './ProductCard.module.scss';
import { Product } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

type Props = { product: Product };

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { has, toggle } = useFavorites();
  const { add, items } = useCart();

  const added = items.some(i => i.id === product.id);
  const fav = has(product.id);

  return (
    <article className={s.card}>
      <Link to={`/product/${product.id}`} className={s.link}>
        <div className={s.imageWrap}>
          <img src={product.image} alt={product.name} className={s.image} />
        </div>
      </Link>

      <Link to={`/product/${product.id}`} className={s.title}>
        {product.name}
      </Link>

      <div className={s.row} style={{ justifyContent: 'space-between' }}>
        <div>
          <span className={s.price}>${product.price}</span>
          {product.fullPrice !== product.price && (
            <span className={s.full}>${product.fullPrice}</span>
          )}
        </div>

        <button
          aria-label="Toggle favorite"
          className={s.heart}
          onClick={() => toggle(product.id)}
          style={{ background: fav ? '#fee' : '#fff' }}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>

      <div className={s.row} style={{ marginTop: 8 }}>
        <button
          className={`${s.btn} ${added ? '' : s.btnPrimary}`}
          onClick={() => !added && add(product)}
          disabled={added}
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
};
