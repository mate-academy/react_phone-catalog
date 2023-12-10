import './CartItem.scss';

export const CartItem = () => {
  return (
    <div className="CartItem">
      <div className="CardItem__info">
        <div className="CartItem____info-image">
          <img
            src="https://picsum.photos/100/100"
            className="CartItem__info-image-content"
            alt="Product"
          />
        </div>
      </div>
      <div className="CartItem__details">
        <div className="CartItem__details__name">Product</div>
        <div className="CartItem__details__price">Price</div>
        <div className="CartItem__details__quantity">Quantity</div>
        <div className="CartItem__details__subtotal">Subtotal</div>
      </div>
    </div>
  );
};
