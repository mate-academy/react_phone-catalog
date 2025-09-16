import React from 'react';
import './ProductInfo.scss';
import home from '../../assets/icons/home.svg';
import goto from '../../assets/icons/arrowRight.svg';
import back from '../../assets/icons/arrowLeft.svg';
import heart from '../../assets/icons/heart.svg';
import like from '../../assets/icons/heartRed.svg';
import { useInfoHook } from './useInfoHook';
import { Loader } from '../Loader';
import { ProductSlider } from '../ProductCard';
import { NameSlider } from '../../types/namesSlider';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const ProductInfo: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const {
    selectedPhone,
    mainImg,
    loading,
    navigate,
    selectedColor,
    selectedMemory,
    handleColorChange,
    handleMemoryChange,
    handleToggleCart,
    handleToggleFavourite,
    productId,
    setMainImg,
    techInfo,
    error,
    products,
    isFav,
    isAdded,
  } = useInfoHook();

  return (
    <main className="productInfo">
      <div className="productInfolink">
        <NavLink to="/" className="productInfolink__home">
          <img src={home} alt="home" />
        </NavLink>
        <span>
          <img src={goto} alt="Goto" />
        </span>
        <NavLink to={`/${category}`} className="productInfolink__title">
          {category === 'tablets'
            ? 'tablets'
            : category === 'accessories'
              ? 'accessories'
              : 'Mobile'}
        </NavLink>

        {productId && (
          <>
            <span>
              <img src={goto} alt="Goto" />
            </span>
            <p className="productInfolink__title">{productId}</p>
          </>
        )}
      </div>

      <div className="productInfolink__back">
        <img src={back} alt="Back" onClick={() => navigate(1)} />
        <p className="productInfolink__backTitle" onClick={() => navigate(1)}>
          Back
        </p>
      </div>

      {error && (
        <div className="error__container">
          <p className="error-message">Something is wrong... Try again later</p>
        </div>
      )}

      {error ? null : loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : selectedPhone ? (
        <div key={selectedPhone.id}>
          <h2 className="category__title">{selectedPhone.name}</h2>
          <div className="productInfo__wrapper">
            <div className="productInfo__wrapperPhone">
              <div className="Image">
                {selectedPhone.images &&
                  selectedPhone.images.map((image, index) => (
                    <img
                      className={classNames('productInfo__Image', {
                        active: mainImg === image,
                      })}
                      key={index}
                      src={image}
                      alt={`image_${category}_${index}`}
                      onClick={() => setMainImg(image)}
                    />
                  ))}
              </div>

              <div className="Main__Image">
                <img
                  src={mainImg}
                  alt="image"
                  className="productInfo__mainImage"
                />
              </div>
            </div>
          </div>

          <div className="productInfo__wrapperDetails">
            <div className="productInfo__colors">
              <h3 className="productInfo__contentTItle">Available colors</h3>
              {selectedPhone.colorAvaileble &&
                selectedPhone.colorAvaileble.map((color, i) => (
                  <button
                    key={i}
                    className={classNames('productInfo__color', {
                      selected: selectedColor === color,
                    })}
                    onClick={() => handleColorChange(color)}
                    style={{ background: color }}
                  ></button>
                ))}
            </div>
            <div className="productInfo__line"></div>

            <div className="productInfo__memory">
              <h3 className="productInfo__contentTitle">Select capacity</h3>
              {selectedPhone.capacityAvailable &&
                selectedPhone.capacityAvailable.map((memory, i) => (
                  <button
                    key={i}
                    className={classNames('productInfo__memories', {
                      selected: selectedMemory === memory,
                    })}
                    onClick={() => handleMemoryChange(memory)}
                  ></button>
                ))}
            </div>
            <div className="productInfo__line"></div>

            <div className="productInfo__price">
              <h3 className="productInfo__priceNew">
                {`$ ${selectedPhone.priceRegular}`}
              </h3>
              <h3 className="productInfo__preceIld">
                {`$ ${selectedPhone.priceDiscount}`}
              </h3>
            </div>

            <div className="productInfo__btn">
              <button>{isAdded ? 'Remove' : 'Add to cart'}</button>
              <button
                className="productInfo__btnLike"
                onClick={handleToggleFavourite}
              >
                <img src={isFav ? like : heart} alt="like" />
              </button>
            </div>

            <div className="productInfo__info">
              <div className="productInfo__infoAll">
                <h3 className="productInfo__screenTitle">Screen</h3>
                <h3 className="productInfo__screenDescription">
                  {selectedPhone.screen}
                </h3>
              </div>

              <div className="productInfo__infoAll">
                <h3 className="productInfo__screenTitle">Screen</h3>
                <h3 className="productInfo__screenDescription">
                  {selectedPhone.resolution}
                </h3>
              </div>

              <div className="productInfo__infoAll">
                <h3 className="productInfo__screenTitle">Processor</h3>
                <h3 className="productInfo__screenDescription">
                  {selectedPhone.processor}
                </h3>
              </div>

              <div className="productInfo__infoAll">
                <h3 className="productInfo__screenTitle">RAM</h3>
                <h3 className="productInfo__screenDescription">
                  {selectedPhone.ram}
                </h3>
              </div>
            </div>
          </div>

          <div className="productInfo__wrapperAboutTech">
            <div className="productInfo__paragraph">
              <h3 className="productInfo__about">About</h3>
              <div className="productInfo__line"></div>
              {selectedPhone.description &&
                selectedPhone.description.map((item, index) => (
                  <div className="productInfo__content" key={index}>
                    <h2 className="productInfo__itemTitle">{item.title}</h2>
                    {item.text.map((paragraph, i) => (
                      <p className="productInfo__description" key={i}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
            </div>

            <div className="productInfo__wrapperTech">
              <h3 className="productInfo__about">Tech specs</h3>
              <div className="productInfo__line"></div>

              {techInfo.map((item, index) => (
                <div className="productInfo__techInfoAll" key={index}>
                  <h3 className="productInfo__techScreenTitle">{item.title}</h3>
                  <h3 className="productInfo__techScreenDescription">
                    {Array.isArray(item.value)
                      ? item.value.join(', ')
                      : item.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ProductSlider
              products={products}
              AdditionalPrice={true}
              title={NameSlider.Like}
            />
          </div>
        </div>
      ) : (
        <div className="not-found">
          <h2>Something went wrong...</h2>
          <img
            src="public/img/product-not-found.png"
            alt="not-found"
            className="error__img"
          />
        </div>
      )}
    </main>
  );
};
