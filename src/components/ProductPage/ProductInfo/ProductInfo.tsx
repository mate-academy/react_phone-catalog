import React, { useContext } from 'react';
import '../../../App.scss';
import './styleProductInfo.scss';
import '../ProductCard/ProductCard.scss';
import { FavProductsContext } from '../../Favourite/FavProductsContext';
import { CartContext } from '../../Cart/CartContext';
import { ProductCarousel } from '../../ProductCarousel';
import { BreadCrumbs } from '../../BreadCrumbs';

type Props = {
  product: ProductItem;
};

export const ProductInfo: React.FC<Props> = ({
  product,
}) => {
  const { addToFav, removeFav, isFavourite } = useContext(FavProductsContext);
  const { addToCart, removeFromCart, isAdded } = useContext(CartContext);
  const priceWithDiscount = product.price - ((product.price * product.discount) / 100);
  // const arrayPhotos: string[] = [];

  return (
    <section className="productsInfo">
      <div className="container">
        <BreadCrumbs />
        <h2 className="productsInfo__title">
          {product.name}
        </h2>
        <div className="productsInfo__parts">
          <div className="productsInfo__left">
            <div className="productsInfo__handleImgs">
              <div className="handleImgs__list">
                {/*{arrayPhotos.map((item, index) =>*/}
                {/*  <a className="handleImgs__item" href="">*/}
                {/*    <img src={`./img/phones/${product.id}.${index}.jpg`} alt="product" />*/}
                {/*  </a>*/}
                {/*)}*/}
                <a className="handleImgs__item" href="123">
                  <img src="./img/productInfo/image 8-1.png" alt="product" />
                </a>
                <a className="handleImgs__item" href="234">
                  <img src="./img/productInfo/image 8-2.png" alt="product" />
                </a>
                <a className="handleImgs__item" href="345">
                  <img src="./img/productInfo/image 8-3.png" alt="product" />
                </a>
                <a className="handleImgs__item" href="456">
                  <img src="./img/productInfo/image 8-4.png" alt="product" />
                </a>
              </div>
              <img className="handleImgs__bigImg" src="./img/productInfo/image 2.png" alt="product" />
            </div>
            <p className="productsInfo__section">About</p>
            <div className="description">
              <p className="description__title">And then there was Pro</p>
              <p className="description__text">
                {product.snippet}
              </p>
            </div>
            <div className="description">
              <p className="description__title">Camera</p>
              <p className="description__text">
                {product.snippet}
              </p>
            </div>
            <div className="description">
              <p className="description__title">Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</p>
              <p className="description__text">
                {product.snippet}
              </p>
            </div>
          </div>
          <div className="productsInfo__right">
            <div className="productsInfo__mainInfo">
              <div className="productsInfo__id">
                <span className="lightText">Available colors</span>
                <span className="lightText">
                  ID:
                  {' '}
                  {product.age}
                </span>
              </div>
              <div className="productsInfo__colors">
                <ul className="colors__list">
                  <button className="colors__item colors__item--pink" />
                  <button className="colors__item colors__item--grey" />
                  <button className="colors__item colors__item--white" />
                  <button className="colors__item colors__item--dark" />
                </ul>
              </div>
              <div className="productsInfo__memory">
                <span className="lightText">Select capacity</span>
                <ul className="memory__list">
                  <button className="memory__item">64 GB</button>
                  <button className="memory__item">128 GB</button>
                  <button className="memory__item">256 GB</button>
                  <button className="memory__item">512 GB</button>
                </ul>
              </div>
              <div className="productsInfo__shortСharacteristics">
                <div className="productsInfo__price">
                  <span className="productsInfo__MainPrice">${product.price} </span>
                  <span className="productsInfo__CeilPrice">
                    {product.price === priceWithDiscount ? '' : `$${priceWithDiscount}`}
                  </span>
                </div>
                <div className="card__buttons button">
                  <button
                    className={isAdded(product)
                      ? 'button__cart button__cart--added'
                      : 'button__cart'}
                    type="button"
                    onClick={() => {
                      if (isAdded(product)) {
                        removeFromCart(product);
                      } else {
                        addToCart(product);
                      }
                    }}
                  >
                    {isAdded(product) ? 'Remove from cart' : 'Add to cart'}
                  </button>
                  <label
                    className={isFavourite(product)
                      ? 'button__favorite button__favorite--checked'
                      : 'button__favorite'}
                    htmlFor={`button__favorite--${product.id}`}
                  >
                    <input
                      className="button__favorite--input"
                      type="checkbox"
                      checked={isFavourite(product)}
                      id={`button__favorite--${product.id}`}
                      onChange={(event) => {
                        if (event.target.checked) {
                          addToFav(product);
                        } else {
                          removeFav(product);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="productsInfo__info">
                  <ul className="productsInfo__infoList">
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Screen
                      </span>
                      <span className="value">
                        {product.screen}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Capacity
                      </span>
                      <span className="value">
                        {product.capacity}
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        Processor
                      </span>
                      <span className="value">
                        Apple A12 Bionic
                      </span>
                    </li>
                    <li className="productsInfo__infoItem">
                      <span className="property">
                        RAM
                      </span>
                      <span className="value">
                        {product.ram}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="productsInfo__techSpecs">
              <p className="productsInfo__section">
                Tech specs
              </p>
              <ul className="techSpecs__list">
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Age
                  </span>
                  <span className="techSpecs__value">
                    {product.age}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Type
                  </span>
                  <span className="techSpecs__value">
                    {product.type}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Name
                  </span>
                  <span className="techSpecs__value">
                    {product.name}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Price
                  </span>
                  <span className="techSpecs__value">
                    {product.price}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Discount
                  </span>
                  <span className="techSpecs__value">
                    {product.discount}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Screen
                  </span>
                  <span className="techSpecs__value">
                    {product.screen}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Capacity
                  </span>
                  <span className="techSpecs__value">
                    {product.capacity}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    RAM
                  </span>
                  <span className="techSpecs__value">
                    {product.ram}
                  </span>
                </li>
                <li className="techSpecs__item">
                  <span className="techSpecs__property">
                    Id
                  </span>
                  <span className="techSpecs__value">
                    {product.id}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ProductCarousel wigthSlides={-101.55} title="You may also like" products={[product]} />

    </section>
  );
};
