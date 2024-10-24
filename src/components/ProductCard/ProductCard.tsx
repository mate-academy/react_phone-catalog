import classNames from 'classnames';
import style from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { ButtonsAddCardFav } from '../ButtonsAddCardFav';

type Props = {
  product: Product;
};
export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <>
      {product && (
        <div className={classNames(style.container)}>
          <img
            src={product.image}
            alt="product image"
            className={classNames(style.image)}
          />

          <p>{product.name}</p>

          <div className={classNames(style.container_price)}>
            <h3 className={classNames(style.price, style.price_full)}>
              ${product.price}
            </h3>

            {product.discountPrice && (
              <h3 className={classNames(style.price, style.price_discount)}>
                ${product.discountPrice}
              </h3>
            )}
          </div>

          <div className={classNames(style.container_specs)}>
            <div className={style.spec_row}>
              <p className={style.spec_name}>Screen</p>
              <p className={style.spec_param}>{product.screen}</p>
            </div>

            <div className={style.spec_row}>
              <p className={style.spec_name}>Capacity</p>
              <p className={style.spec_param}>{product.capacity}</p>
            </div>

            <div className={style.spec_row}>
              <p className={style.spec_name}>RAM</p>
              <p className={style.spec_param}>{product.ram}</p>
            </div>
          </div>

          <div className={classNames(style.container_bts)}>
            <ButtonsAddCardFav productId={product.itemId} />
          </div>
        </div>
      )}
    </>
  );
};
