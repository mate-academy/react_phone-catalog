import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Header } from '../../components/Header/Header';
import './CartPage.scss';
import { LikeAndCartContext } from '../../helpers/LikeAndCartContext';
import { ProductShort } from '../../types/ProductShort';
import { getAddedToCart } from '../../api';
import { NamesBySections } from '../../types/NamesBySections';
import { ProductList } from '../../components/ProductList/ProductList';
import { Footer } from '../../components/Footer/Footer';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { getBackLink } from '../../helpers/getBackLink';
import { MenuWithNav } from '../../components/MenuWithNav/MenuWithNav';

export const CartPage = () => {
  const { liked, addedToCart } = useContext(LikeAndCartContext);
  const [numLiked, setNumLiked] = useState<number>(liked.length);
  const [numAdded, setNumAdded] = useState<number>(addedToCart.length);

  const [startProducts, setStartProducts] = useState<ProductShort[]>([]);
  const [errMess, setErrMess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [currentProducts, setCurrentProducts] = useState<ProductShort[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const { state } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    getAddedToCart()
      .then(setStartProducts)
      .catch((mess: Error) => setErrMess(mess.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setCurrentProducts(startProducts
      .filter(pr => addedToCart.includes(pr.phoneId)));
  }, [startProducts, numAdded]);

  useEffect(() => {
    const firstSum = addedToCart.map(id => {
      const price = currentProducts.find(pr => pr.phoneId === id)?.price;

      return price ? +price : 0;
    }).reduce((sum, price) => sum + price, 0);

    setTotalPrice(firstSum);
  }, [currentProducts]);

  useEffect(() => {
    if (isMenu) {
      document.body.classList.add('body__with-menu');
    } else {
      document.body.classList.remove('body__with-menu');
    }
  }, [isMenu]);

  return (
    <>
      <Header
        withNavigate={false}
        quantityLiked={numLiked}
        quantityAdded={numAdded}
        onSetIsMenu={setIsMenu}
      />

      <div className={classNames('home-page__menu', { visible: isMenu })}>
        <MenuWithNav
          quantityLiked={numLiked}
          quantityAdded={numAdded}
          onSetIsMenu={setIsMenu}
        />
      </div>

      {isLoading && (<Loader />)}
      {!isLoading && !!errMess.length && <ErrorMessage text={errMess} />}
      {!isLoading && !errMess.length && (
        <div className="container">
          <main className="container__content">
            <section className="product-page__section">
              <Link
                to={getBackLink(state)}
                className="button-back"
              >
                <div className="button-back__arrow" />
                <span className="button-back__text">Back</span>
              </Link>

              <div className="cart-page__title">
                <h1 className="title__biggest">
                  {NamesBySections.Cart}
                </h1>
              </div>

              {isMessage && (
                <p className="cart-page__paragraph">
                  We are sorry, but this feature is not implemented yet.
                </p>
              )}
              {!isMessage && !currentProducts.length && (
                <p className="cart-page__paragraph">
                  Your cart is empty
                </p>
              )}
              {!isMessage && !!currentProducts.length && (
                <div className="cart-page__content">
                  <>
                    <div className="cart-page__list">
                      <ProductList
                        totalPrice={totalPrice}
                        onSetTotalPrice={setTotalPrice}
                        products={currentProducts}
                        numLiked={numLiked}
                        onSetNumLiked={setNumLiked}
                        numAdded={numAdded}
                        onSetNumAdded={setNumAdded}
                      />
                    </div>

                    <div className="cart-page__content--right">
                      <h1 className="title__biggest cart-page__price">
                        {`$${totalPrice}`}
                      </h1>

                      <p
                        className="cart-page__paragraf"
                        data-cy="productQauntity"
                      >
                        {numAdded === 1
                          ? 'Total for 1 item'
                          : `Total for ${numAdded} items`}
                      </p>

                      <div className="cart-page__button--container">
                        <button
                          type="button"
                          className="cart-page__button"
                          disabled={numAdded === 0}
                          onClick={() => setIsMessage(true)}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              )}
            </section>
          </main>
        </div>
      )}

      {!isLoading && <Footer />}
    </>
  );
};
