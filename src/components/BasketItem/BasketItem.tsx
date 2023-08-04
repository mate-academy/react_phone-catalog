import classNames from 'classnames';
import { Product } from '../../type/Product';
import './BasketItem.scss';

type Props = {
  product: Product;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  removeProduct: (item: Product) => void;
};

export const BasketItem: React.FC<Props> = ({
  product, addItem, removeItem, removeProduct,
}) => {
  return (
    <li className="cart__item">
      <button
        className="btn btn__close"
        onClick={() => removeProduct(product)}
        type="button"
        aria-label="btn"
      />

      <div className="product__block-img product__block--border">
        <img src={product.imageUrl} alt="" className="product__img" />
      </div>

      <div className="cart__main-info">
        <div className="cart__name">{product.name}</div>

        <div className="cart__quantity">
          <button
            onClick={() => removeItem(product)}
            className={classNames(
              'btn',
              'btn__minus',
              { disabled: !product.quantity || product.quantity === 1 },
            )}
            disabled={!product.quantity || product.quantity === 1}
            type="button"
            aria-label="btn"
          />

          <div className="cart__count cart__count-item">
            {product.quantity ? product.quantity : 1}
          </div>

          <button
            className="btn btn__plus"
            onClick={() => addItem(product)}
            type="button"
            aria-label="btn"
          />
        </div>
      </div>

      <div className="cart__price">
        {`$${(product.price * (100 - product.discount)) / 100}`}
      </div>
    </li>
  );
};
