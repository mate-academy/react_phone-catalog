import React from 'react';
// import { ProductDetails } from '../../types/ProductDetails';
import './ProductInformation.scss';
// import { getPhones } from '../../utils/api';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';
import back from '../../../image/back.svg';
// import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import like from '../../../image/heart.svg';
import { InfoHook } from './InfoHook';

export const ProductInformation: React.FC = () => {
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
  } = InfoHook();

  return (
    <main className="productInfo">
      <div className="productInfolink">
        <img src={home} alt="productInfolink__home" />
        <span>
          <img src={arrow} alt="productInfolink__arrow" />
        </span>
        <p className="productInfolink__title">
          Phones
          {productId && (
            <>
              <span>
                <img src={arrow} alt="productInfolink__arrow" />
              </span>
              {productId}
            </>
          )}
        </p>
      </div>
      <div className="productInfolink__back">
        <img src={back} alt="back__link" onClick={() => navigate(-1)} />
        <p className="productInfolink__backTitle" onClick={() => navigate(-1)}>
          Back
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : selectedPhone ? (
        <div key={selectedPhone.id}>
          <h2 className="productInfo__title">{selectedPhone.name}</h2>
          <div className="productInfo__wrapper">
            <div className="productInfo__wrapperPhone">
              <div className="Image">
                {selectedPhone.images.map((image, index) => (
                  <img
                    className="productInfo__Image"
                    key={index}
                    src={image}
                    alt={`image_phone_${index}`}
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

                {selectedPhone.colorsAvailable.map((color, i) => (
                  <button
                    key={i}
                    className={`productInfo__color ${selecredColor === color ? 'selected' : ''}`}
                    onClick={() => handleChangeColor(color)}
                    style={{ backgroundColor: color, opacity: 0.6 }}
                  />
                ))}
              </div>
              <div className="productInfo__line"></div>

              <div className="productInfo__memory">
                <h3 className="productInfo__contentTitle">Select capacity</h3>
                {selectedPhone.capacityAvailable.map((memorys, i) => (
                  <button
                    key={i}
                    className={`productInfo__memorys ${selectedMemory === memorys ? 'selected' : ''}`}
                    onClick={() => handleChangeMemory(memorys)}
                  >
                    {memorys}
                  </button>
                ))}
              </div>
              <div className="productInfo__line"></div>

              <div className="productInfo__price">
                <h3 className="productInfo__priceNew">
                  {selectedPhone.priceRegular}
                </h3>
                <h3 className="productInfo__priceOld">
                  {selectedPhone.priceDiscount}
                </h3>
              </div>

              <div className="productInfo__button">
                <button className="productInfo__buttonAdd">Add to card</button>
                <button className="productInfo__buttonLike">
                  <img src={like} alt="like" />
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
              {selectedPhone.description.map((item, index) => (
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

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">Screen</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.screen}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">Resolution</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.resolution}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">Processor</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.processor}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">RAM</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.ram}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">
                  Built in memory
                </h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.capacity}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">Camera</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.camera}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">Zoom</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.zoom}
                </h3>
              </div>

              <div className="productInfo__TechinformationAll">
                <h3 className="productInfo__TechscreenTitle">Cell</h3>
                <h3 className="productInfo__TechscreenDescription">
                  {selectedPhone.cell}
                </h3>
              </div>
            </div>
          </div>

          {/* <div className="mobile__cards">
            {currentItems.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                WithAdditionalPrice
                onClick={() => setSelectedPhone(product.name)}
              />
            ))}
          </div> */}
        </div>
      ) : (
        <h2>No phone selected</h2>
      )}
    </main>
  );
};
