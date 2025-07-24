import './Empty.scss';

export const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="cart-icon">
        <div className="bag-icon">
          <div className="bag-handle"></div>
        </div>
      </div>
      <p className="empty-text">Your cart is empty</p>
    </div>
  );
};
