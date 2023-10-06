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
      return accumulator + (currentProduct.amount * currentProduct.price);
    }

    return 0;
  }, 0);

  return (
    <>
      <Navigation />

      {isLoading && <Loader />}

      {!isLoading && (
        <main className="shopping">
          <section>
            <div className="shopping__title">
              <ButtonBack />

              <h1 className="shopping__title--cart">Cart</h1>
            </div>
          </section>

          {cart.length !== 0
            ? (
              <section className="shopping__content">
                <div className="shopping__content--carts">
                  {cart.map(product => (
                    <CartContent product={product} key={product.id} />
                  ))}
                </div>
                <div className="shopping__outcome">
                  <h1 className="shopping__outcome--price">{`$${totalPrice}`}</h1>

                  <p className="shopping__outcome--total">
                    {`Total for ${cart.length} items`}
                  </p>

                  <button
                    type="button"
                    className="shopping__outcome--checkout"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            )
            : (
              <h1>cart is emty</h1>
            )}
        </main>
      )}
    </>
  );
};
