import './CartPage.scss';
import { Product } from '../../types/product';
import { BASE_URL } from '../../utils/fetchClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartActions from '../features/CartSlicer';
import * as priceActions from '../features/ProductPrice';

type CartItem = Product & { quantity: number };

type Props = {
  product: CartItem;
};

export const CartProduct: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    id,
    quantity,
  } = product;

  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector(state => state.cartProducts.items);

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
    <div>
      <div className="cart__product">
        <button
          type="button"
          aria-label="close"
          className="cart__close"
          onClick={() => handleDeleteProduct(product)}
        />
        <img className="cart__phone-img" src={`${BASE_URL}/${image}`} alt={image} />
        <h1 className="cart__name">
          {`${name}`}
        </h1>
        <div className="cart__button-container">
          <button
            type="button"
            aria-label="remove"
            className="cart__button-remove"
            onClick={() => handleRemoveProduct(id)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <div className="cart__total">
            {quantity}
          </div>
          <button
            type="button"
            aria-label="add"
            className="cart__button-add"
            onClick={() => handleAddProduct(id)}
          >
            +
          </button>
        </div>
        <h1 className="cart__price">{`$${price}`}</h1>
      </div>
    </div>
  );
};
