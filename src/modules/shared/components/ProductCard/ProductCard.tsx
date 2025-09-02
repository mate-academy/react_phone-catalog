import { Product } from '../../../../api/types';
import scss from './ProductCard.module.scss';
import { ButtonFav } from '../ButtonFav/ButtonFav';
import { ButtonCart } from '../ButtonCart/ButtonCart';
import { Specs } from './Specs';
import { Price } from './Price';

interface Props {
  product: Product;
  hasDiscount: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, hasDiscount }) => {
  const discount = hasDiscount ? product.price : null;

  return (
    <article className={scss.productCard}>
      <img
        src={product.image}
        className={scss.productCard__image}
        alt={product.name}
        loading="lazy"
      ></img>
      <h3 className={scss.productCard__name}>{product.name}</h3>
      <Price normal={product.fullPrice} discount={discount} />
      <div className={scss.productCard__divider}></div>
      <Specs product={product} />
      <div className={scss.productCard__buttons}>
        <ButtonCart productId={product.id} />
        <ButtonFav productId={product.id} />
      </div>
    </article>
  );
};
