import React, { useContext, useEffect, useState } from 'react';
import './CardPageStyle.scss';
import AdressLine from '../ui/adressLine/AdressLine';
import ColorsChose from './ColorsChose/ColorsChose';
import CapacitySection from './CapacitySection/CapacitySection';
import { getSelectedItem } from 'src/components/ui/utils/api/api';
import PicturesContloller from './PicturesController/PicturesController';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../ui/Loader/Loader';
import CardSlider from '../CardSlider/CardSlider';
import { DispatchContext, StateContext } from 'src/store';
import {
  handleAddFavourite,
  handleAddToCart,
  handleRemoveFromCart,
  handleRemoveFromFavourite,
} from './index';
import { ActionTypes } from 'src/types/ActionTypes';
import { getId } from '../ui/utils/getId';

interface Props {
  type: string;
}

const CardPage: React.FC<Props> = ({ type }) => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const location = useLocation().pathname.split('/')[1];

  const {
    brandNewModels,
    cart,
    favourites,
    selectedProduct,
    isLoading,
    products,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [hasError, setHasError] = useState(false);

  const isDiscount = selectedProduct?.priceDiscount;

  const isLiked = selectedProduct
    ? favourites.some(elem => elem.itemId === selectedProduct.id)
    : false;
  const addedToCart = selectedProduct
    ? cart.some(elem => elem.itemId === selectedProduct.id)
    : false;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: ActionTypes.SetIsLoading, payload: { value: true } });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (idProduct) {
      getSelectedItem(location, idProduct)
        .then(payload => {
          if (payload) {
            dispatch({ type: ActionTypes.AddSelectedProduct, payload });
          }
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          dispatch({
            type: ActionTypes.SetIsLoading,
            payload: { value: false },
          });
        });
    }
  }, [idProduct, dispatch, location]);

  const goBack = () => {
    navigate(-1);
  };

  if (!selectedProduct || isLoading) {
    return <Loader />;
  }

  return (
    <div className="cardpage">
      {/* {hasError && !isLoading && } */}
      {!isLoading && !hasError && (
        <div className="cardpage__wrapper container">
          <AdressLine />
          <button className="cardpage__back" onClick={() => goBack()}>
            <img
              src="icons/arrow-up-black.png"
              alt="Back"
              className="cardpage__back--img"
            />
            <div className="cardpage__back--text">Back</div>
          </button>
          <h2 className="cardpage__title">{selectedProduct.name}</h2>
          <div className="cardpage__main">
            <PicturesContloller urls={selectedProduct.images} />
            <div className="cardpage__main--details details">
              <div className="details__wrapper">
                <div className="details__text">
                  <div className="details__title">Available colors</div>
                  <div className="details__sub-title">
                    {`ID: ${getId(
                      selectedProduct.category,
                      products,
                      selectedProduct.id
                    )}`}
                  </div>
                </div>
                <div className="details__inner">
                  <div className="details__colors">
                    <ColorsChose selectedProduct={selectedProduct} />
                  </div>
                  <hr className="details__first-line" />
                  <div className="details__capacity">
                    <CapacitySection selectedProduct={selectedProduct} />
                  </div>
                  <hr className="details__second-line" />
                  <div className="details__price">
                    <h2 className="details__price--regular">$299</h2>
                    {isDiscount && (
                      <div className="details__price--discount">
                        {selectedProduct.priceDiscount}
                      </div>
                    )}
                  </div>
                  <div className="details__buttons">
                    {addedToCart ? (
                      <button
                        className="details__buttons--add added-to-cart"
                        onClick={() =>
                          handleRemoveFromCart(dispatch, selectedProduct)
                        }
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        className="details__buttons--add"
                        onClick={() =>
                          handleAddToCart(dispatch, selectedProduct)
                        }
                      >
                        Add to cart
                      </button>
                    )}
                    {!isLiked ? (
                      <button
                        className="details__buttons--like"
                        onClick={() =>
                          handleAddFavourite(dispatch, selectedProduct)
                        }
                      >
                        <img src="icons/like.svg" alt="" />
                      </button>
                    ) : (
                      <button
                        className="details__buttons--like addded-to-favourite"
                        onClick={() =>
                          handleRemoveFromFavourite(dispatch, selectedProduct)
                        }
                      >
                        <img src="icons/liked.svg" alt="" />
                      </button>
                    )}
                  </div>
                  <div className="details__information">
                    {Object.entries({
                      Screen: selectedProduct.screen,
                      Resolution: selectedProduct.resolution,
                      Processor: selectedProduct.processor,
                      RAM: selectedProduct.ram,
                    }).map(([key, value]) => (
                      <div className="details__information--section" key={key}>
                        <div className="details__information--title">{key}</div>
                        <div className="details__information--sub-title">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cardpage__info">
            <div className="cardpage__info--wrapper">
              <div className="cardpage__header">
                <div className="cardpage__section">
                  <h3 className="cardpage__section--title">About</h3>
                  <hr className="cardpage__section--line" />
                </div>
                {selectedProduct.description.map(elem => (
                  <div className="cardpage__section" key={elem.title}>
                    <h4 className="cardpage__section--title">{elem.title}</h4>
                    {elem.text.map(Item => (
                      <p className="cardpage__section--sub-title" key={Item}>
                        {Item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <div className="cardpage__tech">
                <h3 className="cardpage__tech--title">Tech specs</h3>
                <hr className="cardpage__tech--line" />
                <div className="cardpage__tech--specs">
                  {Object.entries({
                    Screen: selectedProduct.screen,
                    Resolution: selectedProduct.resolution,
                    Processor: selectedProduct.processor,
                    RAM: selectedProduct.ram,
                    'Built in Memory': selectedProduct.capacity,
                    Camera: selectedProduct.camera,
                    Zoom: selectedProduct.zoom,
                    Cell: selectedProduct.cell,
                  }).map(
                    ([key, value]) =>
                      value && (
                        <div className="cardpage__tech--section" key={key}>
                          <div className="cardpage__tech--section-title">
                            {key}
                          </div>
                          <div className="cardpage__tech--section-sub-title">
                            {value}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <CardSlider
              cards={brandNewModels}
              title={'You may also like'}
              type={type}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPage;
