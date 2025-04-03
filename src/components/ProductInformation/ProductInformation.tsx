import React from 'react';
import './ProductInformation.scss';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';
import back from '../../../image/back.svg';
import { Loader } from '../Loader/Loader';
import like from '../../../image/heart.svg';
import { useInfoHook } from './useInfoHook';
import { ProductSlider } from '../ProductCard/ProductCard';
import { NavLink, useParams } from 'react-router-dom';
import { NameSlider } from '../../types/nameslider';
// import catGif from '../../../public/assets/';
import liked from '../../../image/liked.svg';

export const ProductInformation: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const {
    selectedPhone,
    mainImage,
    loading,
    navigate,
    handleChangeMemory,
    handleChangeColor,
    productId,
    setMainImage,
    selectedMemory,
    selecredColor,
    techInfo,
    error,
    products,
    isFavorite,
    isAdded,
    handleToggleFavorite,
    handleToggleCart,
  } = useInfoHook();

  return (
    <main className="productInfo">
      <div className="productInfolink">
        <NavLink to="/" className="productInfolink__home">
          <img src={home} alt="Home" />
        </NavLink>
        <span>
          <img src={arrow} alt="Arrow" />
        </span>
        <NavLink to={`/${category}`} className="productInfolink__title">
          {category === 'tablets'
            ? 'Tablets'
            : category === 'accessories'
              ? 'Accessories'
              : 'Mobile'}
        </NavLink>

        {productId && (
          <>
            <span>
              <img src={arrow} alt="Arrow" />
            </span>
            <p className="productInfolink__title">{productId}</p>
          </>
        )}
      </div>
      <div className="productInfolink__back">
        <img src={back} alt="back__link" onClick={() => navigate(-1)} />
        <p className="productInfolink__backTitle" onClick={() => navigate(-1)}>
          Back
        </p>
      </div>
      {error && (
        <div className="error__container">
          <img
            src="public\assets\page-not-found.png"
            alt="Error"
            className="error__img"
          />
          <p className="error-message">
            Oops, something went wrong, please check your connection 🫶💻. Try
            again later ❤️.
          </p>
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
                      className="productInfo__Image"
                      key={index}
                      src={image}
                      alt={`image_${category}_${index}`}
                      onClick={() => setMainImage(image)}
                    />
                  ))}
              </div>

              <div className="Main__Image">
                <img
                  src={mainImage}
                  className="productInfo__mainImage"
                  alt="image__main"
                />
              </div>
            </div>

            <div className="productInfo__wraperdeteils">
              <div className="productInfo__colors">
                <h3 className="productInfo__contentTitle">Available colors</h3>
                {selectedPhone.colorsAvailable &&
                  selectedPhone.colorsAvailable.map((color, i) => (
                    <button
                      key={i}
                      className={`productInfo__color ${selecredColor === color ? 'selected' : ''}`}
                      onClick={() => handleChangeColor(color)}
                      style={{ backgroundColor: color }}
                    />
                  ))}
              </div>
              <div className="productInfo__line"></div>

              <div className="productInfo__memory">
                <h3 className="productInfo__contentTitle">Select capacity</h3>
                {selectedPhone.capacityAvailable &&
                  selectedPhone.capacityAvailable.map((memory, i) => (
                    <button
                      key={i}
                      className={`productInfo__memorys ${selectedMemory === memory ? 'selected' : ''}`}
                      onClick={() => handleChangeMemory(memory)}
                    >
                      {memory}
                    </button>
                  ))}
              </div>
              <div className="productInfo__line"></div>

              <div className="productInfo__price">
                <h3 className="productInfo__priceNew">
                  {`$ ${selectedPhone.priceRegular}`}
                </h3>
                <h3 className="productInfo__priceOld">
                  {`$ ${selectedPhone.priceDiscount}`}
                </h3>
              </div>

              <div className="productInfo__button">
                <button
                  className="productInfo__buttonAdd"
                  onClick={handleToggleCart}
                >
                  {isAdded ? 'Added' : 'Add to cart'}
                </button>
                <button
                  className="productInfo__buttonLike"
                  onClick={handleToggleFavorite}
                >
                  <img src={isFavorite ? liked : like} alt="like" />
                </button>
              </div>

              <div className="productInfo__Information">
                <div className="productInfo__informationAll">
                  <h3 className="productInfo__screenTitle">Screen</h3>
                  <h3 className="productInfo__screenDescription">
                    {selectedPhone.screen}
                  </h3>
                </div>

                <div className="productInfo__informationAll">
                  <h3 className="productInfo__screenTitle">Resolution</h3>
                  <h3 className="productInfo__screenDescription">
                    {selectedPhone.resolution}
                  </h3>
                </div>

                <div className="productInfo__informationAll">
                  <h3 className="productInfo__screenTitle">Processor</h3>
                  <h3 className="productInfo__screenDescription">
                    {selectedPhone.processor}
                  </h3>
                </div>

                <div className="productInfo__informationAll">
                  <h3 className="productInfo__screenTitle">RAM</h3>
                  <h3 className="productInfo__screenDescription">
                    {selectedPhone.ram}
                  </h3>
                </div>
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
                      <p className="productInfo__desctiption" key={i}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
            </div>

            <div className="productInfo__wrappeTech">
              <h3 className="productInfo__about">Tech specs</h3>
              <div className="productInfo__line" />

              {techInfo.map((item, index) => (
                <div className="productInfo__TechinformationAll" key={index}>
                  <h3 className="productInfo__TechscreenTitle">{item.title}</h3>
                  <h3 className="productInfo__TechscreenDescription">
                    {Array.isArray(item.value)
                      ? item.value.join(', ')
                      : item.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <ProductSlider
              products={products}
              WithAdditionalPrice={true}
              title={NameSlider.Like}
            />
          </div>
        </div>
      ) : (
        <h2>No product selected</h2>
      )}
    </main>
  );
};
