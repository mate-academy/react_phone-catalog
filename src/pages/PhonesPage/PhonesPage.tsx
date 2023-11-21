/* eslint-disable jsx-a11y/control-has-associated-label */
import { NavLink } from 'react-router-dom';

export const Phones = () => {
  return (
    <div className="phone__page">
      <div className="container">
        <div className="path-box">
          <NavLink
            to="/home"
            className="home__link icon"
          />
          <div className="arrow-path icon" />
          <p className="current-page">Phones</p>
        </div>
        <h1 className="page__title">Mobile phones</h1>
        <p className="phones-range">95 models</p>
        <div className="selectors__wrapper">
          <div className="select__sort-by">
            <p className="selector__title">Sort by</p>
            <select
              name="sort-by"
              className="select__field select__field--sort"
            >
              <option value="No sorting" selected>No sorting</option>
              <option value="Newest">Newest</option>
              <option value="Alphabetically">Alphabetically</option>
              <option value="Cheapest">Cheapest</option>
            </select>
          </div>
          <div className="select__items-on-page">
            <p className="selector__title">Items on page</p>
            <select
              name="items-on-page"
              className="select__field select__field--items"
            >
              <option value="All" selected>All</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
        <div className="products-field">
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
          <div className="item__card">
            <img
              src=""
              alt="item-name"
              className="item__image"
            />
            <div className="card__content">
              <p
                className="item__title"
              >
                Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
              </p>
              <div className="item__prices">
                <div className="new-price">$799</div>
                <div className="old-price text-strike">$899</div>
              </div>
              <div className="item__descriptions">
                <div className="screen-size descriptions__flex-box">
                  <p className="description--title">Screen</p>
                  <p className="description--value">5.8” OLED</p>
                </div>
                <div className="capacity descriptions__flex-box">
                  <p className="description--title">Capacity</p>
                  <p className="description--value">64 GB</p>
                </div>
                <div className="memory descriptions__flex-box">
                  <p className="description--title">RAM</p>
                  <p className="description--value">4 GB</p>
                </div>
              </div>
              <div className="item__actions">
                <button
                  type="button"
                  className="add-to-card"
                >
                  Add to cart
                </button>
                <button type="button" className="add-to-favourite" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
