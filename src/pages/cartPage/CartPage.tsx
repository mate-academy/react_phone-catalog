/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartPage.scss';
import { BackButton } from '../../components/BackButton';
import { useProductStore } from '../../helpers/store';
import { useData } from '../../helpers/DataContext';

export const CartPage = () => {
  const { products } = useData();
  const cartProductsId = useProductStore((state) => state.cartProducts);
  const deleteCartProduct = useProductStore((state) => state.deleteCartProductId);
  const incQuantity = useProductStore((state) => state.incQuantity);
  const decQuantity = useProductStore((state) => state.decQuantity);
  const cartFilteredProducts = products?.filter(p => cartProductsId.find(product => product.name === p.phoneId));

  const handleDeleteFromCart = (id: string) => {
    deleteCartProduct(id);
  };

  const handleIncQuantity = (id: string) => {
    incQuantity(id);
  };

  const handleDecQuantity = (id: string) => {
    decQuantity(id);
  };

  const totalValueOfProducts = cartFilteredProducts?.reduce(
    (acc, curVal) => acc + (curVal.price * (cartProductsId.find(p => p.name === curVal.phoneId)?.quantity || 1)),
    0,
  );

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
                  {cartFilteredProducts.map(p => {
                    const kek = cartProductsId.find(pr => pr.name === p.phoneId);

                    return (
                      <>
                        <div
                          className="cart__main__item"
                          key={p.id}
                        >

                          <button
                            type="button"
                            className="cart__main__item__button-cross"
                            onClick={() => handleDeleteFromCart(p.phoneId)}
                          >
                            <span className="icon icon--close" />
                          </button>
                          <div className="cart__main__item-top">
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
                          </div>
                          <div className="cart__main__item-bottom">
                            <div className="counter">
                              <button
                                type="button"
                                className="cart__main__item__button"
                                disabled={kek?.quantity === 1}
                                onClick={() => handleDecQuantity(p.phoneId)}
                              >
                                <span className="icon icon--minus" />
                              </button>
                              <span>{kek?.quantity}</span>
                              <button
                                type="button"
                                className="cart__main__item__button"
                                onClick={() => handleIncQuantity(p.phoneId)}
                              >
                                <span className="icon icon--plus" />
                              </button>
                            </div>
                            <span className="text text--h2">{`$${p.price}`}</span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="cart__main__price">
                  <div className="price__main">
                    <span className="text--h1">{`$${totalValueOfProducts}`}</span>
                    <span className="text text--small text--gray">
                      {`Total for ${cartFilteredProducts?.length} items`}
                    </span>
                  </div>
                  <button
                    className="button__checkout"
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
