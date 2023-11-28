/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext';

export const ElementsPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Elements Page');
    setIsHeaderSearchVisible(false);
    setIsMenuOpen(false);
  }, []);

  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="section__container">
        <h1 className="h1">H1 — The quick brown fox jumps over the lazy dog</h1>
        <br />
        <h2 className="h2">H2 — The quick brown fox jumps over the lazy dog</h2>
        <br />
        <h3 className="h3">H3 — The quick brown fox jumps over the lazy dog</h3>
        <br />

        <div className="text">
          Body text — The quick brown fox jumps over the lazy dog
        </div>
        <br />
        <div className="text text--size-2">
          Small text — The quick brown fox jumps over the lazy dog
        </div>
        <br />
        <div className="text text--size-2 text--upper">
          Uppercase — The quick brown fox jumps over the lazy dog
        </div>
        <br />

        <button type="button" className="btn">
          Add to cart
        </button>
        <br />
        <button type="button" className="btn btn--active">
          Add to cart
        </button>

        <br />
        <button type="button" className="like-btn">
          <img
            className="like-btn__icon"
            src="./img/like.svg"
            alt="like-btn"
            loading="lazy"
          />
        </button>
        <br />
        <button type="button" className="like-btn like-btn--active">
          <img
            className="like-btn__icon"
            src="./img/like_active.svg"
            alt="like-btn"
            loading="lazy"
          />
        </button>
        <br />

        <button type="button" className="arrow-btn arrow-btn--disabled">
          <img
            className="like-btn__icon"
            src="./img/arrow_left_disabled.svg"
            alt="arrow-btn"
            loading="lazy"
          />
        </button>
        <br />
        <button type="button" className="arrow-btn">
          <img
            className="like-btn__icon"
            src="./img/arrow_right.svg"
            alt="arrow-btn"
            loading="lazy"
          />
        </button>
      </div>
    </section>
  );
};
