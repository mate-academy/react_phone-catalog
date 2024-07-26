import { useContext, useState } from 'react';
import { ActionContext } from '../../shared/Context/ActionContext';
import { ProductContext } from '../../shared/Context/ProductContext';
import { Link } from 'react-router-dom';
import './CartPage.scss';
import { CartItem } from '../../components/CartItem/CartItem';
import { Modal } from '../../components/Modal/Modal';

export const CartPage = () => {
  const { cartProducts } = useContext(ActionContext);
  const { products } = useContext(ProductContext);
  const cartItems = products.filter(p =>
    cartProducts.find(item => item.id === p.id),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalCartPrice = cartProducts.reduce((acc, item) => {
    const itemTotal = item.price * item.count;

    return acc + itemTotal;
  }, 0);

  return (
    <div className="cartPage">
      <div className="cartPage__block">
        <div className="cartPage__navigation">
          <Link to=".." className="cartPage__navigation-link">
            <div className="icon icon--arrow-left"></div>
          </Link>
          <Link to=".." className="cartPage__navigation-link">
            <p className="cartPage__navigation-title">{'Back'}</p>
          </Link>
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="cartPage__top">
              <h1 className="cartPage__top-title">Cart</h1>
            </div>

            <div className="cartPage__content">
              <div className="cartPage__items">
                {cartItems.map(product => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>

              <div className="cartPage__tottal">
                <div className="cartPage__tottal-block">
                  <div>
                    <h2 className="cartPage__tottal-price">{`$${totalCartPrice}`}</h2>
                    <p className="cartPage__tottal-items">
                      {cartItems.length > 0
                        ? `Total for ${cartItems.length} item`
                        : `Total for ${cartItems.length} items`}
                    </p>
                  </div>
                  <div className="cartPage__tottal-line" />
                  <button
                    className="cartPage__tottal-btn"
                    type="button"
                    onClick={openModal}
                  >
                    Checkout
                  </button>
                  {isModalOpen && <Modal closeModal={closeModal} />}
                </div>
              </div>
            </div>
          </>
        )}
        {cartItems.length === 0 && (
          <h1 className="cartPage__message">Cart is empty</h1>
        )}
      </div>
    </div>
  );
};
