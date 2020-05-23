import React from 'react';

export const UIKit = () => {
  return (
    <div className="container">
      <h1>UI Kit</h1>

      <div className="section">
        <h2>Icons</h2>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--home" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--search" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--shopping-bag" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--shopping-bag" />
          <div className="Icon__tag">12</div>
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--favorites" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--favorites" />
          <div className="Icon__tag">12</div>
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--favorites-filled" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--minus" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--plus" />
        </a>

        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--arrow-left" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--arrow-right" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--arrow-up" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--arrow-down" />
        </a>

        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--inactive Icon__image--arrow-left" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--inactive Icon__image--arrow-right" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--inactive Icon__image--arrow-up" />
        </a>
        <a className="Icon" href="./#">
          <div className="Icon__image Icon__image--inactive Icon__image--arrow-down" />
        </a>
      </div>

      <div className="section">
        <h1>H1 — The quick brown fox jumps over the lazy dog</h1>
        <h2>H2 — The quick brown fox jumps over the lazy dog</h2>
        <h3>H3 — The quick brown fox jumps over the lazy dog</h3>
        <div className="uppercase">H3 — The quick brown fox jumps over the lazy dog</div>
        <p>Body text — The quick brown fox jumps over the lazy dog</p>
        <p className="small-text">Small text — The quick brown fox jumps over the lazy dog</p>
      </div>

      <div className="section">
        <a className="Button Button__primary" href="./">Button</a>
        <a className="Button Button__primary Button__primary--selected" href="./">Button</a>
      </div>

      <div className="section">
        <div className="Pagination">
          <button className="Pagination__Button Button Button__pagination Icon" type="button">
            <div className="Icon__image Icon__image--arrow-left" />
          </button>
          <button className="Pagination__Button Button Button__pagination" type="button">1</button>
          <button className="Pagination__Button Button Button__pagination Button__pagination--selected" type="button">2</button>
          <button className="Pagination__Button Button Button__pagination" type="button">3</button>
          <button className="Pagination__Button Button Button__pagination" type="button">4</button>
          <button className="Pagination__Button Button Button__pagination Icon" disabled type="button">
            <div className="Icon__image Icon__image--arrow-right" />
          </button>
        </div>
      </div>

      <div className="section">
        <button className="Button Button__squared Icon" type="button">
          <div className="Icon__image Icon__image--shopping-bag" />
        </button>
        <button className="Button Button__squared Button__squared--selected Icon" type="button">
          <div className="Icon__image Icon__image--shopping-bag" />
        </button>
        <button className="Button Button__squared Icon" type="button">
          <div className="Icon__image Icon__image--favorites" />
        </button>
        <button className="Button Button__squared Button__squared--selected Icon" type="button">
          <div className="Icon__image Icon__image--favorites-filled" />
        </button>
        <br />
        <br />
        <a href="./" className="Button Button__link">Link</a>
      </div>

      <div className="section">
        <div className="Color">
          <label htmlFor="color-red" className="Color__label Color__label--red">
            <input
              type="radio"
              name="color"
              id="color-red"
              className="Color__radio"
              value="Red"
            />
          </label>

          <label htmlFor="color-green" className="Color__label Color__label--green Color__label--selected">
            <input
              type="radio"
              name="color"
              id="color-green"
              className="Color__radio"
              value="Green"
            />
          </label>
        </div>
      </div>

      <div className="section">
        <form action="./" className="Form">
          <label htmlFor="search" className="Form__Field Form__Field--search">
            <input
              type="text"
              className="Form__TextInput"
              placeholder="Search in phones..."
            />
          </label>
        </form>
      </div>

    </div>
  );
};
