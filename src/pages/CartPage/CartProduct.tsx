import './CartPage.scss';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../api/fetchClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartActions from '../../features/cartSlicer';
import * as priceActions from '../../features/productPriceSlicer';

type CartItem = Product & { quantity: number };

type Props = {
  product: CartItem;
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  const {
    image, name, price, id, quantity,
  } = product;

  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector((state) => state.cartProducts.items);

  const isProductId = cartProducts.find(
    (selectedProduct) => selectedProduct.id === id,
  );

  const handleAddProduct = (productId: string) => {
    if (isProductId) {
      dispatch(cartActions.increaseQuantity(productId));
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (isProductId) {
      dispatch(cartActions.decreaseQuantity(productId));
    }
  };

  const handleDeleteProduct = (newProduct: Product) => {
    if (isProductId) {
      dispatch(priceActions.deleteProductPrice({ quantity: 1 }));

      dispatch(cartActions.deleteCartProducts(newProduct.id));
    }
  };

  return (
    <div className="cart-page__list">
      <div className="list-item">
        <div className="list-item__left-container">
          <button
            type="button"
            aria-label="close"
            className="list-item__button-delete cart__close"
            onClick={() => handleDeleteProduct(product)}
          >
            <div className="icon icon-cross" />
          </button>

          <div className="list-item__photo">
            <img
              className="list-item__photo_img"
              src={`${BASE_URL}/${image}`}
              alt={image}
            />
          </div>

          <h1 className="cart__name">{`${name}`}</h1>
        </div>

        <div className="list-item__right-container">
          <div className="list-item__counter">
            <button
              type="button"
              aria-label="remove"
              className="list-item__counter_button"
              onClick={() => handleRemoveProduct(id)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <div className="list-item__counter_amount">{quantity}</div>
            <button
              type="button"
              aria-label="add"
              className="list-item__counter_button"
              onClick={() => handleAddProduct(id)}
            >
              +
            </button>
          </div>
          <h1 className="list-item__price">{`$${price}`}</h1>
        </div>
      </div>
    </div>
  );
};
