import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useProducts } from '../../contexts/Products';
import { Product } from '../../types/Product';
import { NotFoundPage } from '../../modules/NotFoundPage';
import { BreadCrumbs } from '../BreadCrumbs';
import { ProductsSlider } from '../ProductCardSwipper/ProductCardSwipper';

import './ProductDetails.scss';
import { useEffect, useState } from 'react';
import { useFavourites } from '../../contexts/Favourites';
import { useCart } from '../../contexts/Cart';

export const ProductDetails = () => {
  const { productId } = useParams();
  const { phones, tablets, accessories } = useProducts();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, toggleCart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const productSlug = pathParts[2];
  const parts = productSlug.split('-');

  const sources = [
    { category: 'phones', items: phones.items },
    { category: 'tablets', items: tablets.items },
    { category: 'accessories', items: accessories.items },
  ] as const;

  const found = sources.find(source => source.items.some(p => p.id.toString() === productId));

  const product = found?.items.find(p => p.id.toString() === productId);
  const category = found?.category;

  const handleColorClick = (color: string) => {
    const newParts = [...parts];
    newParts[newParts.length - 1] = color;
    const newSlug = newParts.join('-');
    navigate(`/product/${newSlug}`);
  };

  const handleCapacityClick = (capacity: string) => {
    const newParts = [...parts];
    newParts[newParts.length - 2] = capacity.replaceAll('GB', 'gb').replaceAll('TB', 'tb');
    const newSlug = newParts.join('-');
    navigate(`/product/${newSlug}`);
  };

  useEffect(() => {
    if (product) {
      setCurrentImg(product.images[0]);
      setSelectedColor(product.color);
      setSelectedCapacity(product.capacity);

      window.scrollTo({ top: 0 });
    }
  }, [productId, product]);

  const getProductToSwipper = () => {
    switch (category) {
      case 'phones':
        return phones.items;
      case 'tablets':
        return tablets.items;
      case 'accessories':
        return accessories.items;
    }
  };

  const [currentImg, setCurrentImg] = useState(product?.images[0]);
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product?.capacity);

  return (
    <>
      {product ? (
        <>
          <BreadCrumbs />

          <div className="product-details">
            <div className="product-details__back">
              <div className="product-details__back__img">
                <img src="./img/left.png" alt="back" className="product-details__back__img__link" />
              </div>
              <button onClick={() => navigate(-1)} className="product-details__back__btn">
                Back
              </button>
            </div>

            <h1 className="product-details__title" autoFocus>
              {product.name}
            </h1>

            <div className="product__details-grid">
              <div className="product-details__img">
                <div className="product-details__img__list">
                  {product.images.map(img => (
                    <img
                      key={img}
                      src={img}
                      onClick={() => setCurrentImg(img)}
                      alt="product-photo"
                      className={`${currentImg === img ? 'product-details__img__list__link--active product-details__img__list__link' : 'product-details__img__list__link'}`}
                    />
                  ))}
                </div>

                <img src={currentImg} alt="product-photo" className="product-details__img__link" />
              </div>

              <div className="product-details__params">
                <div className="product-details__params__color__list">
                  <span className="product-details__params__color__list__title">
                    Available colors
                  </span>

                  <div className="product-details__params__color__list__items">
                    {product.colorsAvailable.map((c: string) => (
                      <div
                        key={c}
                        className={`${c === selectedColor ? `product-details__params__color__list__item color-${c} color--active` : `product-details__params__color__list__item color-${c}`}`}
                        onClick={() => handleColorClick(c)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="product-details__params__capacity__list">
                  <span className="product-details__params__capacity__list__title">
                    Select capacity
                  </span>
                  <div className="product-details__params__capacity__list__items">
                    {product.capacityAvailable.map((c: string) => (
                      <div
                        key={c}
                        className={`${c === selectedCapacity ? `product-details__params__capacity__list__item capacity-${c} product-details__params__capacity__list__item--active` : `product-details__params__capacity__list__item capacity-${c}`}`}
                        onClick={() => handleCapacityClick(c)}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="product-details__params__bottom">
                  <div className="product-details__params__bottom__price">
                    <span className="product-details__params__bottom__price-discount">
                      {`$${product.priceDiscount}`}
                    </span>
                    <span className="product-details__params__bottom__price-regular">
                      {`$${product.priceRegular}`}
                    </span>
                  </div>
                  <div className="product-details__params__bottom__btns">
                    <span
                      className={
                        isInCart(product.id)
                          ? 'product-details__params__bottom__btns-add product-details__params__bottom__btns-add--active'
                          : 'product-details__params__bottom__btns-add'
                      }
                      onClick={() => toggleCart(product.id)}
                    >
                      {isInCart(product.id) ? 'Added to cart' : 'Add to cart'}
                    </span>
                    <div
                      className="product-details__params__bottom__btns-like"
                      onClick={() => toggleFavourite(product.id)}
                    >
                      <img
                        src={isFavourite(product.id) ? './img/like-active.svg' : './img/like.svg'}
                        alt="like"
                        className="product-details__params__bottom__btns-like__link"
                      />
                    </div>
                  </div>
                </div>
                <div className="product-details__params__info">
                  <div className="product-details__params__info__params">
                    <span className="product-details__params__info__params-param">Screen</span>
                    <span className="product-details__params__info__params-value">
                      {product.screen}
                    </span>
                  </div>

                  <div className="product-details__params__info__params">
                    <span className="product-details__params__info__params-param">Resolution</span>
                    <span className="product-details__params__info__params-value">
                      {product.resolution}
                    </span>
                  </div>

                  <div className="product-details__params__info__params">
                    <span className="product-details__params__info__params-param">Processor</span>
                    <span className="product-details__params__info__params-value">
                      {product.processor}
                    </span>
                  </div>

                  <div className="product-details__params__info__params">
                    <span className="product-details__params__info__params-param">RAM</span>
                    <span className="product-details__params__info__params-value">
                      {product.ram}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="product-details__description">
              <div className="product-details__description__about-us">
                <h3 className="product-details__description__about-us__about">About</h3>
                <div className="product-details__description__about-us__section">
                  {product.description.map((desc, i) => (
                    <div key={i} className="product-details__description__about-us__section__block">
                      <span className="product-details__description__about-us__section__title">
                        {desc.title}
                      </span>

                      {desc.text.map((paragraph, j) => (
                        <p
                          key={j}
                          className="product-details__description__about-us__section__text"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-details__description__tech-specs">
                <h3 className="product-details__description__tech-specs__title">Tech specs</h3>
                <div className="product-details__description__tech-specs__sections">
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Screen
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.screen}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Resolution
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.resolution}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Processor
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.processor}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      RAM
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.ram}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Built in memory
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.capacity}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Camera
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.camera}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Zoom
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.zoom}
                    </span>
                  </div>
                  <div className="product-details__description__tech-specs__section">
                    <span className="product-details__description__tech-specs__section__label">
                      Cell
                    </span>
                    <span className="product-details__description__tech-specs__section__value">
                      {product.cell}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductsSlider blockName="You may also like" products={getProductToSwipper() || []} />
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};
