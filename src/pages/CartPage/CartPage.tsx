import classNames from 'classnames';

import { useProducts } from '../../comonents/ProductContext';
import { Cart } from '../../comonents/Cart';
import { getFilteredCarts } from '../../helpers/utils/getFilteredCart';
import { Product } from '../../type/Product';
import { getTotalPrice } from '../../helpers/utils/getTotalPrice';
import { BackButton } from '../../comonents/BackButton';

import './CartPage.scss';

export const CartPage = () => {
  const { setCarts, isMessage, setIsMessage } = useProducts();
  const { carts } = useProducts();
  const filteredCarts = getFilteredCarts(carts);
  const totalPrice = getTotalPrice(carts);
  // const [isMessage, setIsMessage] = useState(false);

  const handleCartAction = (
    id: string, action: 'add' | 'delete' | 'deleteAll',
  ) => {
    let updatedCarts: Product[] = [...carts];
    let cartToAdd: Product | undefined;
    let itemIndex: number | undefined;

    switch (action) {
      case 'add':
        cartToAdd = carts.find(cart => cart.id === id);
        if (cartToAdd) {
          updatedCarts.push(cartToAdd);
        }

        break;

      case 'delete':
        itemIndex = updatedCarts.findIndex(cartItem => cartItem.id === id);
        if (itemIndex !== -1) {
          updatedCarts.splice(itemIndex, 1);
        }

        break;

      case 'deleteAll':
        updatedCarts = updatedCarts.filter(cart => cart.id !== id);
        break;

      default:
        break;
    }

    setCarts(updatedCarts);
  };

  const handleButtonClick = () => {
    setIsMessage(true);

    setTimeout(() => {
      setIsMessage(false);
    }, 1000);
  };

  return (
    <section className="carts">
      <BackButton />

      <h1 className="carts__title">
        {carts.length === 0 ? (
          'Your cart is empty'
        ) : (
          'Cart'
        )}
      </h1>

      {carts.length > 0 && (
        <div className="carts__main-container">
          <div className="carts__container">
            {filteredCarts.map(cart => (
              <Cart
                cart={cart}
                handleCartAction={handleCartAction}
                key={cart.id}
              />
            ))}
          </div>

          <div data-cy="productQauntity" className="carts__qauntity">
            <div className="carts__total-price-container">
              <h2 className="text text--h1">
                {`$${totalPrice}`}
              </h2>
              <p className="text text--gray">
                {carts.length > 1 ? (
                  `Total for ${carts.length} items`
                ) : (
                  'Price for 1 item'
                )}
              </p>
            </div>

            <button
              type="button"
              className="carts__button"
              onClick={handleButtonClick}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {isMessage && (
        <div className={classNames(
          'carts__notification',
          { 'carts__notification--active': isMessage },
        )}
        >
          We are sorry, but this feature is not implemented yet
        </div>
      )}
    </section>
  );
};
