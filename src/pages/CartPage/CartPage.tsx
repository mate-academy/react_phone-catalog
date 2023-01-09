import { GoBack } from 'src/components/GoBack';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { Product } from 'src/types/Product';
import {
  getProductsWithActualPrice,
} from 'src/utils/helpers/getProductsWithActualPrice';
import { CartCard } from './CartCard/CartCard';
import { Checkout } from './Checkout/Checkout';
import { EmptyCartPage } from './EmptyCartPage';
import './CartPage.scss';

export const CartPage = () => {
  const [cartProducts, setCartProducts] = useLocalStorage('cart', '');
  const productWithActualPrice = getProductsWithActualPrice(cartProducts);

  return (
    <>
      {cartProducts.length === 0
        ? (
          <EmptyCartPage />
        ) : (
          <div className="container">
            <div className="cart-section__go-back">
              <GoBack />
            </div>

            <div className="products-section cart-section">
              <div className="products-section__top cart-section__top">
                <h1 className="products-section__title">Cart</h1>
              </div>

              <div className="cart-section__catalog cart-section__grid">
                <div className="cart-section__grid-left">
                  {productWithActualPrice.map((product: Product) => (
                    <div
                      key={product.id}
                      className="cart-section__card-wrapper"
                    >
                      <CartCard
                        product={product}
                        setCartProducts={setCartProducts}
                      />
                    </div>
                  ))}
                </div>

                <Checkout cartProducts={cartProducts} />
              </div>
            </div>
          </div>
        )}
    </>
  );
};
