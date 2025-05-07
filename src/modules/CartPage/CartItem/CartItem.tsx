import classNames from 'classnames';
import { Product } from '../../../types/Product';
import style from './CartItem.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  count: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onClear: (id: string) => void;
};
export const CartItem: React.FC<Props> = ({
  product,
  count,
  onIncrease = () => {},
  onDecrease = () => {},
  onClear = () => {},
}) => {
  return (
    <div className={style.cartItem_container}>
      {product && (
        <>
          <div className={style.top}>
            <div
              className={classNames(
                style.icon_container,
                style.icon_container_close,
              )}
              onClick={() => onClear(product.itemId)}
            >
              <div className={classNames(style.icon, style.icon_close)} />
            </div>

            <div className={style.container_image}>
              <img
                src={product.image}
                alt="phone-image"
                className={style.image}
              />
            </div>

            <Link
              to={`/${product.category}/${product.itemId}`}
              className={style.name}
            >
              {product.name}
            </Link>
          </div>

          <div className={style.bottom}>
            <div className={style.counter_container}>
              <div
                className={classNames(style.icon_container, {
                  [style.icon_container_disabled]: count <= 1,
                })}
                onClick={() => onDecrease(product.itemId)}
              >
                <div
                  className={classNames(style.icon, style.icon_minus, {
                    [style.icon_minus_disabled]: count <= 1,
                  })}
                />
              </div>

              <p className={style.count_text}>{count}</p>

              <div
                className={classNames(style.icon_container)}
                onClick={() => onIncrease(product.itemId)}
              >
                <div className={classNames(style.icon, style.icon_plus)} />
              </div>
            </div>

            <h3 className={style.price}>${product.price}</h3>
          </div>
        </>
      )}
    </div>
  );
};
