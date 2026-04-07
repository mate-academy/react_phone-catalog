import './BasketCheckout.scss';

const BasketCheckout = () => {
  return (
    <>
      <div className="basket-checkout">
        <div className="basket-checkout__sum"></div>
        <div className="basket-chekout__counter--items">Total for items</div>
        <button className="basket-checkout__button">Checkout</button>
      </div>
    </>
  );
};

export default BasketCheckout;
