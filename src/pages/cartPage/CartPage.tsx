/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartPage.scss';
import { BackButton } from '../../components/BackButton';
import { useProductStore } from '../../helpers/store';
import { useData } from '../../helpers/DataContext';

export const CartPage = () => {
  const { products } = useData();
  const cartProductsId = useProductStore((state) => state.cartProductsId);
  // const cartPrices = useProductStore((state) => state.cartPrices);
  // const addCartPrice = useProductStore((state) => state.addCartPrice);
  // const deleteCartPrice = useProductStore((state) => state.deleteCartPrice);
  const deleteCartProduct = useProductStore((state) => state.deleteCartProductId);
  const cartFilteredProducts = products?.filter(p => cartProductsId.find(fp => fp === p.id));
  const handleDeleteFromCart = (id: string) => {
    deleteCartProduct(id);
  };

  const totalValueOfProducts = cartFilteredProducts?.reduce(
    (acc, curVal) => acc + curVal.price,
    0,
  );

  // const totalValueOfCounter = cartPrices?.reduce(
  //   (acc, curVal) => acc + +curVal,
  //   0,
  // );

  // const totalValueOfProductsWithCounter = totalValueOfProducts + totalValueOfCounter;

  return (
    <div className="cart">
      <div className="cart__utils">
        <BackButton />
      </div>
      <h1 className="cart__header text--h1">Cart</h1>
      <div className="cart__main">
        <div className="cart__main__list">
          {cartFilteredProducts && totalValueOfProducts
            ? (
              <>
                <div className="cart__main__list-container">
                  {cartFilteredProducts.map(p => (
                    <>
                      <div className="cart__main__item">
                        <button
                          type="button"
                          className="button__cross"
                          onClick={() => handleDeleteFromCart(p.id)}
                        >
                          <span className="icon icon--close" />
                        </button>
                        <img
                          className="cart__main__item__image"
                          src={p.image}
                          alt={p.name}
                        />
                        <span>
                          {p.name}
                          <br />
                          (iMT9G2FS/A)
                        </span>
                        <div className="counter">
                          <button
                            type="button"
                            onClick={() => { }}
                          >
                            <span className="icon icon--minus" />
                          </button>
                          <span>1</span>
                          <button
                            type="button"
                            onClick={() => { }}
                          >
                            <span className="icon icon--plus" />
                          </button>
                        </div>
                        <span className="text text--h2">{`$${p.price}`}</span>
                      </div>
                    </>
                  ))}
                </div>
                <div className="cart__main__price">
                  <div className="price__main">
                    <span className="text--h1">{`$${totalValueOfProducts}`}</span>
                    <span className="text text--small text--gray">
                      {`Total for ${cartFilteredProducts?.length} items`}
                    </span>
                  </div>
                  <button
                    className="button__cart-checkout"
                    type="button"
                  />
                </div>
              </>
            )
            : (
              <span>No products here</span>
            )}
        </div>
      </div>
    </div>
  );
};
