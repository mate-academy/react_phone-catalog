import React, { useEffect, useState } from 'react';
import './ProductsSlider.scss';
import { Products } from '../../../types/Products';
import classNames from 'classnames';
import { getProductsPerSlide } from '../../../utils/variables';

interface ProductsSliderProps {
  phones: Products[];
  isShowDiscount?: boolean;
}

const toggleFunction = (
  productsId: Products['id'],
  state: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  state(currentIds => {
    if (currentIds.includes(productsId)) {
      return currentIds.filter(current => current !== productsId);
    } else {
      return [...currentIds, productsId];
    }
  });
};

export const ProductsSlider = ({
  phones,
  isShowDiscount = false,
}: ProductsSliderProps) => {
  const [slideCount, setSlideCount] = useState(0);

  const [addedPhone, setAddedPhone] = useState<Products['id'][]>(() => {
    const savedPhones = localStorage.getItem('addedProduct');

    return savedPhones ? JSON.parse(savedPhones) : [];
  });
  const [favIconsId, setFavIconsId] = useState<Products['id'][]>(() => {
    const savedIcons = localStorage.getItem('favouriteProduct');

    return savedIcons ? JSON.parse(savedIcons) : [];
  });

  const [productsPerSlide, setProductsPerSlide] = useState(getProductsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lastSlideIndex = Math.max(
    0,
    Math.ceil(phones.length / productsPerSlide) - 1,
  );

  const countStart = slideCount * productsPerSlide;
  const countEnd = countStart + productsPerSlide;

  const slidedPhones = phones.slice(countStart, countEnd);

  useEffect(() => {
    localStorage.setItem('favouriteProduct', JSON.stringify(favIconsId));
  }, [favIconsId]);

  useEffect(() => {
    localStorage.setItem('addedProduct', JSON.stringify(addedPhone));
  }, [addedPhone]);

  return (
    <div className="brandSlider">
      <div className="sliderInfo">
        <h2 className="sliderInfo__title">Brand new models</h2>
        <div className="sliderNav">
          <button
            type="button"
            className="icons scroll"
            disabled={slideCount === 0}
            aria-label="Previous slide"
            onClick={() => setSlideCount(count => count - 1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowLeft.svg`}
              alt=""
              className="arrow"
            />
          </button>

          <button
            type="button"
            className="icons scroll"
            disabled={slideCount >= lastSlideIndex}
            aria-label="Next slide"
            onClick={() => setSlideCount(count => count + 1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}/img/arrowRight.svg`}
              alt=""
              className="arrow"
            />
          </button>
        </div>
      </div>

      <div className="products">
        {slidedPhones.map(phone => {
          const {
            id,
            name,
            priceRegular,
            priceDiscount,
            screen,
            capacity,
            ram,
            images,
          } = phone;

          const isFavourite = favIconsId.includes(id);

          return (
            <div className="catalog" key={id}>
              <img src={images[0]} alt="photo" className="catalog__photo" />

              <p className="catalog__name">{name}</p>
              <div className="catalog__price">
                <p className="catalog__current-price">
                  ${priceDiscount || priceRegular}
                </p>

                {isShowDiscount && priceDiscount && (
                  <p className="catalog__old-price">${priceRegular}</p>
                )}
              </div>

              <div className="catalog__settings">
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="title">screen</td>
                      <td className="result">{screen}</td>
                    </tr>
                    <tr>
                      <td className="title">capacity</td>
                      <td className="result">{capacity}</td>
                    </tr>
                    <tr>
                      <td className="title">RAM</td>
                      <td className="result">{ram}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="catalog__buttons">
                <button
                  className={classNames('button', {
                    selectedPhone: addedPhone.includes(id),
                    buttons__buy: !addedPhone.includes(id),
                  })}
                  onClick={() => {
                    toggleFunction(id, setAddedPhone);
                  }}
                >
                  {addedPhone.includes(id) ? 'Selected' : 'Add to card'}
                </button>
                <button
                  className="button buttons__like icons"
                  onClick={() => {
                    toggleFunction(id, setFavIconsId);
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/img/${isFavourite ? 'likeClicked.svg' : 'like.svg'}`}
                    alt="logo"
                    className="logo isClicked"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
