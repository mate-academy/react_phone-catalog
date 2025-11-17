/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line max-len
import { useSelectedProduct } from '../../../utils/contexts/SelectedProductContext';
import { ProductQuantity } from '../../../types/productQuantity';

function countSum(products: ProductQuantity[]) {
  return products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0,
  );
}

export const Cart = () => {
  const {
    cartProducts,
    setCartProducts,
    additionalNumber,
    setAdditionalNumber,
  } = useSelectedProduct();
  const [productsWithQuantity, setProductsWithQuantity] = useState<
    ProductQuantity[]
  >(() => {
    const storedProducts = localStorage.getItem('cartProducts');

    return storedProducts
      ? (JSON.parse(storedProducts) as ProductQuantity[])
      : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(productsWithQuantity));
    setCartProducts(productsWithQuantity);
  }, [productsWithQuantity, setCartProducts]);

  const navigate = useNavigate();

  const increaseQuantity = (index: number) => {
    setProductsWithQuantity(prev =>
      prev.map((product, i) =>
        i === index ? { ...product, quantity: product.quantity + 1 } : product,
      ),
    );
  };

  const decreaseQuantity = (index: number) => {
    setProductsWithQuantity(prev =>
      prev.map((product, i) =>
        i === index && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      ),
    );
  };

  const removeProduct = (index: number) => {
    setProductsWithQuantity(
      prev => prev.filter((_, i) => i !== index), // Видаляємо продукт за індексом
    );
    setCartProducts(
      prev => prev.filter((_, i) => i !== index), // Видаляємо продукт за індексом
    );
  };

  const totalCount = countSum(productsWithQuantity);

  return (
    <main className="main-cart">
      <section className="cart">
        <div className="container">
          <div
            className="cart__back back"
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
          >
            <span className="back__arrow"></span>
            <span className="back__type smallText">Back</span>
          </div>
          <h1 className="cart__title title--biggest">Cart</h1>
          {productsWithQuantity.length > 0 ? (
            <div className="cart__info">
              <div className="cart__products">
                {productsWithQuantity.map((cartProduct, index) => (
                  <div className="quantity" key={cartProduct.id || index}>
                    <div className="quantity__top">
                      <div className="quantity__icon">
                        <button
                          className="icon icon--close icon--close-button"
                          onClick={() => removeProduct(index)}
                        ></button>
                      </div>
                      <div className="quantity__foto">
                        <img
                          src={cartProduct.image}
                          alt=""
                          className="quantity__main-foto"
                        />
                      </div>
                      <p
                        className="
                          quantity__name 
                          body-text-600 
                          body-text-600--black"
                      >
                        {cartProduct.name}
                      </p>
                    </div>
                    <div className="quantity__bottom">
                      <div className="quantity__buttons buttons-quantity">
                        <button
                          className="
                            buttons-quantity__main 
                            buttons-quantity__main--menos
                          "
                          onClick={() => {
                            decreaseQuantity(index);
                            setAdditionalNumber(additionalNumber - 1);
                          }}
                          disabled={cartProduct.quantity === 1}
                        ></button>
                        <span className="buttons-quantity__text">
                          {cartProduct.quantity}
                        </span>
                        <button
                          className="
                            buttons-quantity__main 
                            buttons-quantity__main--plus
                          "
                          onClick={() => {
                            increaseQuantity(index);
                            setAdditionalNumber(additionalNumber + 1);
                          }}
                        ></button>
                      </div>
                      <div className="quantity__price title-h3">{`${cartProduct.price * cartProduct.quantity}€`}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart__total-price total-price">
                <p className="total-price__price">{`${totalCount}€`}</p>
                <p className="total-price__label body-text-600 body-text-600--gray body-text-600--gray-homepage">{`Total for ${cartProducts.length + additionalNumber} items`}</p>
                <button
                  className="addToCart addToCart--bigger"
                  onClick={() => setIsOpen(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {isOpen && (
          <div className="modal">
            <div className="modal__content">
              <p className="modal__text">
                Checkout is not implemented yet. Do you want to clear the Cart?
              </p>
              <span className="modal__close" onClick={() => setIsOpen(false)}>
                &times;
              </span>
              <div className="modal__buttons">
                <button
                  className="addToCart"
                  onClick={() => {
                    setProductsWithQuantity([]); // Очищуємо стан
                    setCartProducts([]); // Очищуємо контекст
                    localStorage.removeItem('cartProducts'); // Видаляємо з localStorage
                    setIsOpen(false); // Закриваємо модалку
                  }}
                >
                  Yes
                </button>
                <button className="addToCart" onClick={() => setIsOpen(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
