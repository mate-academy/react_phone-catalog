/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './App.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Pages } from './pages/Pages';
import { StorageContext } from './components/StorageContext';
import { NewParamsProps } from './types/NewParams';
import { IMAGES } from './images-style/images';

const App = () => {
  const { fav, cart } = useContext(StorageContext);
  const [favLength, setFavLength] = useState(fav.length);
  const [cartLength, setCartLength] = useState(cart.length);
  const [searchParams, setSearchParams] = useSearchParams();
  const GetToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  const addParam = (
    newParams: NewParamsProps = {},
  ) => {
    const newParam = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        newParam.set(key, `${value}`);
      } else if (!value) {
        newParam.delete(key);
      }
    }

    setSearchParams(newParam);
  };

  return (
    <div className="app">
      <header className="header">
        <Navigation
          addParam={addParam}
          favLength={favLength}
          cartLength={cartLength}
        />
      </header>

      <main className="main">
        <Pages
          addParam={addParam}
          setFavLength={setFavLength}
          setCartLength={setCartLength}
        />
      </main>

      <footer className="footer">
        <div className="footer-content-container">
          <Link to="/" className="logo">
            <img src={IMAGES.logo} alt="Logo" />
          </Link>

          <div className="footer__info">
            <a
              href="https://github.com/Pavlo-Petrashevskyi"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>

            <a
              href="/"
              className="footer__link"
            >
              Contacts
            </a>

            <a
              href="/"
              className="footer__link"
            >
              Rights
            </a>
          </div>

          <div
            className="footer__button"
            onClick={() => GetToTop()}
          />
        </div>
      </footer>
    </div>
  );
};

export default App;
