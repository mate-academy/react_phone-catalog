import React, { useState, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Outlet as Main } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import * as goodsActions from './store/reducers/goodsSlice';

import { getScreenType } from './helpers/getScreenType';
import { Resolutions } from './types/Resolutions';

import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Burger } from './components/Burger/Burger';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Modal } from './components/Modal/Modal';
import { Footer } from './components/Footer/Footer';

import { BagPage } from './pages/BagPage/BagPage';
import { WishlistPage } from './pages/WishlistPage/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { PaynowPage } from './pages/PaynowPage/PaynowPage';

import './App.scss';

export const App: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { goods } = useAppSelector(state => state.goods);
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const [screenType, setScreenType] = useState(getScreenType());
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [isBagOpened, setIsBagOpened] = useState(false);
  const [isWishlistOpened, setIsWishlistOpened] = useState(false);
  const [isCheckoutModalOpened, setIsCheckoutModalOpened] = useState(false);
  const [isPayNowButtonClicked, setIsPayNowButtonClicked] = useState(false);
  const [isSuccessCheckout, setIsSuccessCheckout] = useState(false);
  const [isPaynowOpened, setIsPaynowOpened] = useState(false);
  const [isSuccessPaynow, setIsSuccessPaynow] = useState(false);

  useEffect(() => {
    dispatch(goodsActions.init());
  }, [updatedAt]);

  return (
    <Suspense fallback="...loading">
      <div className="app">
        <Header
          isMenuOpened={isMenuOpened}
          setIsMenuOpened={setIsMenuOpened}
          screenType={screenType}
          setScreenType={setScreenType}
          setIsSearchOpened={setIsSearchOpened}
          setIsBagOpened={setIsBagOpened}
          setIsWishlistOpened={setIsWishlistOpened}
        />

        <Transition
          in={isSearchOpened}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state: TransitionStatus) => (
            <SearchBar
              className={`searchBar--${state}`}
              goods={goods}
              setIsSearchOpened={setIsSearchOpened}
            />
          )}
        </Transition>

        <Transition
          in={isMenuOpened && screenType !== Resolutions.Desktop}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {(state: TransitionStatus) => (
            <Burger
              classNames={`burger burger--${state}`}
              isMenuOpened={isMenuOpened}
              setIsMenuOpened={setIsMenuOpened}
              screenType={screenType}
              setScreenType={setScreenType}
              setIsSearchOpened={setIsSearchOpened}
              setIsWishlistOpened={setIsWishlistOpened}
            />
          )}
        </Transition>

        {goods.length ? (
          <Main />
        ) : (
          <ErrorMessage
            rootClassName=""
            reload={() => setUpdatedAt(new Date())}
          />
        )}

        <Modal
          active={isBagOpened}
          setActive={setIsBagOpened}
        >
          <BagPage
            setIsBagOpened={setIsBagOpened}
            setIsCheckoutModalOpened={setIsCheckoutModalOpened}
            setIsPayNowButtonClicked={setIsPayNowButtonClicked}
          />
        </Modal>

        <Modal
          active={isWishlistOpened}
          setActive={setIsWishlistOpened}
        >
          <WishlistPage />
        </Modal>

        <Modal
          active={isCheckoutModalOpened}
          setActive={setIsCheckoutModalOpened}
        >
          <CheckoutPage
            isPayNowButtonClicked={isPayNowButtonClicked}
            setIsPayNowButtonClicked={setIsPayNowButtonClicked}
            setIsCheckoutModalOpened={setIsCheckoutModalOpened}
            setIsSuccessCheckout={setIsSuccessCheckout}
            setIsPaynowOpened={setIsPaynowOpened}
          />
        </Modal>

        <Modal
          active={isSuccessCheckout}
          setActive={setIsSuccessCheckout}
        >
          <p>
            {t('congratsCheckout')}
          </p>
        </Modal>

        <Modal
          active={isPaynowOpened}
          setActive={setIsPaynowOpened}
        >
          <PaynowPage
            setIsPaynowOpened={setIsPaynowOpened}
            setIsSuccessPaynow={setIsSuccessPaynow}
          />
        </Modal>

        <Modal
          active={isSuccessPaynow}
          setActive={setIsSuccessPaynow}
        >
          <p>
            {t('congratsPaynow')}
          </p>
        </Modal>

        <Footer
          setIsMenuOpened={setIsMenuOpened}
        />
      </div>
    </Suspense>
  );
};
