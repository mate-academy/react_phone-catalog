import {
  ButtonBack,
  CartContent,
  Loader,
  Navigation,
} from '../../Components';
// import { Phone } from '../../Type/Phone';
import { useAppSelector } from '../../app/hooks';
// import { checkPhoneId } from '../../helper/checkedSorage';
import './cart.scss';

type Props = {
  isLoading: boolean;
};

export const CartPage: React.FC<Props> = ({ isLoading }) => {
  const cart = useAppSelector(state => state.cart);

  const totalPrice = cart.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return accumulator + (currentProduct.amount * currentProduct.fullPrice);
    }

    return 0;
  }, 0);

  const totalItems = cart.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return accumulator + currentProduct.amount;
    }

    return 0;
  }, 0);

  return (
    <>
      <Navigation />

      {isLoading && <Loader />}

      {!isLoading && (
        <main className="cart">
          <section>
            <div className="cart__title">
              <ButtonBack />

              <h1 className="cart__title--cart">Cart</h1>
            </div>
          </section>

          {cart.length !== 0
            ? (
              <section className="cart__content">
                <div className="cart__content--cards">
                  {cart.map(product => (
                    <CartContent cart={product} key={product.id} />
                  ))}
                </div>
                <div className="cart__outcome">
                  <h1 className="cart__outcome--price">{`$${totalPrice}`}</h1>

                  <p className="cart__outcome--total">
                    {`Total for ${totalItems} items`}
                  </p>

                  <button
                    type="button"
                    className="cart__outcome--checkout"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            )
            : (
              <h1>Your cart is empty</h1>
            )}
        </main>
      )}
    </>
  );
};
