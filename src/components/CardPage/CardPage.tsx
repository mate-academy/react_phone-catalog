import React, { useContext, useEffect, useState } from 'react';
import './CardPageStyle.scss';
import AdressLine from '../ui/adressLine/AdressLine';
import ColorsChose from './ColorsChose/ColorsChose';
import CapacitySection from './CapacitySection/CapacitySection';
import { Details } from 'src/types/Details';
import {
  getItemByParameters,
  getSelectedItem,
} from 'src/components/ui/utils/api/api';
import PicturesContloller from './PicturesController/PicturesController';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../ui/Loader/Loader';
import CardSlider from '../CardSlider/CardSlider';
import { DispatchContext, StateContext } from 'src/store';
import {
  handleAddFavourite,
  handleAddToCart,
  handleRemoveFromCart,
  handleRemoveFromFavourite,
} from './index';

interface Props {
  type: string;
}

const CardPage: React.FC<Props> = ({ type }) => {
  const [detailsCard, setDetailsCard] = useState<Details | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { brandNewModels, cart, favourites } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  const isLiked = detailsCard
    ? favourites.some(elem => elem.itemId === detailsCard.id)
    : false;
  const addedToCart = detailsCard
    ? cart.some(elem => elem.itemId === detailsCard.id)
    : false;
  const { idProduct } = useParams<{ idProduct: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (type && idProduct) {
      setIsLoading(true);
      getSelectedItem(type, idProduct)
        .then(data => {
          if (data) {
            setDetailsCard(data);
            setSelectedColor(data.color || null);
            setSelectedCapacity(data.capacity || null);
          } else {
            setDetailsCard(null);
          }
        })
        .catch(() => {
          // console.error('Error fetching selected item:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idProduct]);

  const changeProduct = (newProductName: string) => {
    if (detailsCard) {
      navigate(`/${type}/${newProductName}`, { replace: true });
    }
  };

  const handleSetColor = (chosenColor: string) => {
    if (detailsCard && chosenColor !== selectedColor) {
      setSelectedColor(chosenColor);
      setIsLoading(true);
      getItemByParameters(
        type,
        detailsCard.namespaceId,
        chosenColor,
        selectedCapacity || detailsCard.capacity,
      )
        .then(data => {
          changeProduct((data as Details).id);
          setDetailsCard(data || null);
        })
        .catch(() => {
          // console.error('Error fetching selected item by color:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleSetCapacity = (chosenCapacity: string) => {
    if (detailsCard && chosenCapacity !== selectedCapacity) {
      setSelectedCapacity(chosenCapacity);
      setIsLoading(true);
      getItemByParameters(
        type,
        detailsCard.namespaceId,
        selectedColor || detailsCard.color,
        chosenCapacity,
      )
        .then(data => {
          changeProduct((data as Details).id);
          setDetailsCard(data || null);
        })
        .catch(() => {
          // console.error('Error fetching selected item by capacity:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="cardpage">
      {!isLoading && detailsCard ? (
        <div className="cardpage__wrapper container">
          <AdressLine />
          <button className="cardpage__back" onClick={() => goBack()}>
            <img
              src="/icons/arrow-up-black.png"
              alt="Back"
              className="cardpage__back--img"
            />
            <div className="cardpage__back--text">Back</div>
          </button>
          <h2 className="cardpage__title">{detailsCard.name}</h2>
          <div className="cardpage__main">
            <PicturesContloller urls={detailsCard.images} />
            <div className="cardpage__main--details details">
              <div className="details__wrapper">
                <div className="details__text">
                  <div className="details__title">Available colors</div>
                  <div className="details__sub-title">ID : {idProduct}</div>
                </div>
                <div className="details__inner">
                  <div className="details__colors">
                    <ColorsChose
                      colors={detailsCard.colorsAvailable}
                      handleSetColor={handleSetColor}
                      chosenColor={selectedColor || ''}
                    />
                  </div>
                  <hr className="details__first-line" />
                  <div className="details__capacity">
                    <CapacitySection
                      capacity={detailsCard.capacityAvailable}
                      handleSetCapacity={handleSetCapacity}
                      selectedCapacity={selectedCapacity || ''}
                    />
                  </div>
                  <hr className="details__second-line" />
                  <div className="details__price">
                    <h2 className="details__price--regular">$299</h2>
                    <div className="details__price--discount"></div>
                  </div>
                  <div className="details__buttons">
                    {addedToCart ? (
                      <button
                        className="details__buttons--add added-to-cart"
                        onClick={() =>
                          handleRemoveFromCart(dispatch, detailsCard)
                        }
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        className="details__buttons--add"
                        onClick={() => handleAddToCart(dispatch, detailsCard)}
                      >
                        Add to cart
                      </button>
                    )}
                    {!isLiked ? (
                      <button
                        className="details__buttons--like"
                        onClick={() =>
                          handleAddFavourite(dispatch, detailsCard)
                        }
                      >
                        <img src="/icons/like.svg" alt="" />
                      </button>
                    ) : (
                      <button
                        className="details__buttons--like addded-to-favourite"
                        onClick={() =>
                          handleRemoveFromFavourite(dispatch, detailsCard)
                        }
                      >
                        <img src="/icons/liked.svg" alt="" />
                      </button>
                    )}
                  </div>
                  <div className="details__information">
                    {Object.entries({
                      Screen: detailsCard.screen,
                      Resolution: detailsCard.resolution,
                      Processor: detailsCard.processor,
                      RAM: detailsCard.ram,
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
            <div className="cardpage__section">
              <h3 className="cardpage__section--title">About</h3>
              <hr className="cardpage__sections--line" />
            </div>
            {detailsCard.description.map(elem => (
              <div className="cardpage__section" key={elem.title}>
                <h4 className="cardpage__section--title">{elem.title}</h4>
                {elem.text.map(Item => (
                  <p className="cardpage__section--sub-title" key={Item}>
                    {Item}
                  </p>
                ))}
              </div>
            ))}
            <div className="cardpage__tech">
              <h3 className="cardpage__tech--title">Tech specs</h3>
              <hr className="cardpage__tech--line" />
              <div className="cardpage__tech--specs">
                {Object.entries({
                  Screen: detailsCard.screen,
                  Resolution: detailsCard.resolution,
                  Processor: detailsCard.processor,
                  RAM: detailsCard.ram,
                  'Built in Memory': selectedCapacity,
                  Camera: detailsCard.camera,
                  Zoom: detailsCard.zoom,
                  Cell: detailsCard.cell,
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
                    ),
                )}
              </div>
            </div>
            <CardSlider
              cards={brandNewModels}
              title={'You may also like'}
              type={type}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CardPage;
