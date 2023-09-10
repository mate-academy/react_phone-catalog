/* eslint-disable import/no-extraneous-dependencies */
import './App.scss';
import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { Iphone } from './types/Iphone';
import { PhonesPage } from './PhonesPage';
import { HomePage } from './HomePage';
import { NotImplemented } from './PageNotImplemented';
import { Favorites } from './Favorites';
import { Basket } from './Basket';
import { PhoneDescription } from './PhoneDescription';
import { getAll } from './api/iphones';
import { MenuMobile } from './MenuMobile';

const App = () => {
  const [iphones, setIphones] = useState<Iphone[]>([]); // -
  const [selectedIphoneId] = useState<null | string>(null); // - set
  const [favorites, setFavorites] = useState<Iphone[]>([]);
  const [selectedIphoneIdToBuy] = useState<null | string>(null);
  const [iphonesToBuy, setIphonesToBuy] = useState<Iphone[]>([]);
  const [iphoneTitle, setIphoneTitle] = useState('');

  const location = useLocation();

  useEffect(() => {
    getAll().then((items) => setIphones(items));
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedIphonesToBuy = localStorage.getItem('iphonesToBuy');

    if (savedIphonesToBuy) {
      setIphonesToBuy(JSON.parse(savedIphonesToBuy));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('iphonesToBuy', JSON.stringify(iphonesToBuy));
  }, [favorites, iphonesToBuy]);

  const handleRemoveIphone = (iphoneId: string) => {
    setIphonesToBuy(iphonesToBuy.filter(iphone => iphoneId !== iphone.id));
  };

  const handleSetInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIphoneTitle(event.target.value);
  };

  const handleSelectPhone = (iphoneId: string | undefined) => {
    const selectedIphone = iphones.find((iphone) => iphone.id === iphoneId); // was visibleItems before instead of iphones

    if (selectedIphone) {
      const isFavorite = favorites
        .some((iphone) => iphone.id === selectedIphone.id);

      if (isFavorite) {
        const updatedFavorites = favorites
          .filter((iphone) => iphone.id !== selectedIphone.id);

        setFavorites(updatedFavorites);
      } else {
        const updatedFavorites = [...favorites, selectedIphone];

        setFavorites(updatedFavorites);
      }
    }
  };

  const handleSelectPhoneToBuy = (iphoneId: string | undefined) => {
    const selectedIphoneToBuy = iphones
      .find((iphone) => iphone.id === iphoneId);

    if (selectedIphoneToBuy) {
      const isInBasket = iphonesToBuy
        .some((iphone) => iphone.id === selectedIphoneToBuy.id);

      if (isInBasket) {
        const updatedInBasket = iphonesToBuy
          .filter((iphone) => iphone.id !== selectedIphoneToBuy.id);

        setIphonesToBuy(updatedInBasket);
      } else {
        const updatedInBasket = [...iphonesToBuy, selectedIphoneToBuy];

        setIphonesToBuy(updatedInBasket);
      }
    }
  };

  const svgLike = document.querySelector('.icon--path');

  if (favorites.length > 0) {
    svgLike?.setAttribute('fill', '#EB5757');
    svgLike?.removeAttribute('stroke');
    svgLike?.removeAttribute('stroke-width');
  } else {
    svgLike?.setAttribute('fill', 'white');
    svgLike?.setAttribute('stroke', 'black');
    svgLike?.setAttribute('stroke-width', '1');
  }

  return (
    <>
      <Routes>
        <Route
          path="menu"
          element={(
            <MenuMobile />)}
        />

      </Routes>
      {location.pathname !== '/menu' && (
        <>
          <Header
            inputText={iphoneTitle}
            setInputText={handleSetInputText}
            favoritesCount={favorites.length}
            basketCount={iphonesToBuy.length}
          />
          <main className="page">
            <div className="container">
              <Routes>

                <Route
                  path="/"
                  element={(
                    <HomePage
                      selectPhone={handleSelectPhone}
                      selectedIphoneId={selectedIphoneId}
                      selectPhoneToBuy={handleSelectPhoneToBuy}
                      selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                    />
                  )}
                />

                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                  path="phones"
                  element={(
                    <PhonesPage
                      selectedIphoneId={selectedIphoneId}
                      selectPhone={handleSelectPhone}
                      selectPhoneToBuy={handleSelectPhoneToBuy}
                      selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                      iphoneTitle={iphoneTitle}
                    />
                  )}
                />
                <Route
                  path="tablets"
                  element={(
                    <NotImplemented />)}
                />
                <Route
                  path="accessories"
                  element={(
                    <NotImplemented />)}
                />
                <Route
                  path="liked"
                  element={(
                    <Favorites
                      favorites={favorites}
                      selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                      selectPhoneToBuy={handleSelectPhoneToBuy}
                      selectedIphoneId={selectedIphoneId}
                      selectPhone={handleSelectPhone}
                    />
                  )}
                />

                <Route
                  path="basket"
                  element={(
                    <Basket
                      phonesToBuy={iphonesToBuy}
                      removeIphone={handleRemoveIphone}
                    />
                  )}
                />

                <Route path="phones">
                  <Route
                    index
                    element={(
                      <PhonesPage
                        selectedIphoneId={selectedIphoneId}
                        selectPhone={handleSelectPhone}
                        selectPhoneToBuy={handleSelectPhoneToBuy}
                        selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                        iphoneTitle={iphoneTitle} // +
                      />
                    )}
                  />
                  <Route
                    path=":iphoneId"
                    element={(
                      <PhoneDescription
                        selectedIphoneId={selectedIphoneId}
                        selectPhone={handleSelectPhone}
                        selectPhoneToBuy={handleSelectPhoneToBuy}
                        selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                      />
                    )}
                  />
                </Route>

              </Routes>
            </div>
          </main>
          <Footer />

        </>
      )}
    </>
  );
};

export default App;
