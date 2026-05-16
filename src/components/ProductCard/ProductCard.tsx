import { Link } from 'react-router-dom';
import { useCard } from '../../context/CardContext';
import { useLikeProducts } from '../../context/LikeCard';
import { Product } from '../../types/Product';
import style from './ProductCard.module.scss';

type Props = {
  product: Product;
  priceMode?: 'full' | 'discount';
};

export const ProductCard: React.FC<Props> = ({ product, priceMode }) => {
  const { but, has } = useLikeProducts();
  const { add, item } = useCard();

  const realId = product.itemId || String(product.id);

  const productAdded = item.some(ind => ind.id === realId);
  const likePlus = has(realId);

  const imageSrc = product.image || product.images?.[0];
  const priceAll =
    priceMode === 'discount'
      ? product.price || product.priceDiscount
      : product.fullPrice || product.priceRegular;

  const normalizedProduct = { ...product, id: realId };

  return (
    <article className={style.card}>
      <Link to={`/product/${realId}`} className={style.link}>
        <img src={imageSrc} alt={product.name} className={style.wrapImg} />
      </Link>

      <Link to={`/product/${realId}`} className={style.title}>
        {product.name}
      </Link>

      <div>
        <div className={style.price}>
          <p className={style.currentPrice}>${priceAll}</p>

          {priceMode === 'discount' && (
            <p className={style.oldPrice}>${product.fullPrice}</p>
          )}
        </div>
        <div className={style.top}>
          <p className={style.paragraph}>
            Screen <span className={style.span}>{product.screen}</span>
          </p>
          <p className={style.paragraph}>
            Capacity <span className={style.span}>{product.capacity}</span>
          </p>
          <p className={style.paragraph}>
            RAM <span className={style.span}>{product.ram}</span>
          </p>
        </div>
      </div>

      <div className={style.button}>
        <button
          className={`${style.leftBut} ${productAdded ? style.leftButActive : ''}`}
          onClick={() => !productAdded && add(normalizedProduct)}
          disabled={productAdded}
        >
          {productAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          aria-label="like product"
          className={`${style.rightBut} ${likePlus ? style.rightButActive : ''}`}
          onClick={() => but(realId)}
        >
          {likePlus ? (
            <img
              src="./img/buttons/hover_heart_button.svg"
              alt="button hover heart"
            />
          ) : (
            <img
              src="./img/buttons/empty_heart_button.svg"
              alt="button empty heart"
            />
          )}
        </button>
      </div>
    </article>
  );
};
