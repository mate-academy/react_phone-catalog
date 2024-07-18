import { useContext, useRef, useState } from 'react';
import cn from 'classnames';
import Styles from './Details.module.scss';
import { Item } from '../../types/Item';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { SkeletonDetails } from '../../skeletons/SkeletonDetails/SkeletonDetails';
import { ItemSlider } from '../itemSlider';
import { ContextApp } from '../../appContext/AppContext';
import { Crumbs } from '../breadCrumbs/Crumbs';
import { firstLetterCapital } from '../../functions/firstLetterCapital';
import { BackButton } from '../backButton';

type Props = {
  list: Item[];
};

type ColorName =
  | 'space gray'
  | 'spaceblack'
  | 'midnightgreen'
  | 'rosegold'
  | 'spacegray'
  | 'sierrablue'
  | 'graphite'
  | 'midnight';

type ColorNames = {
  [key in ColorName]: string;
};

export const Details: React.FC<Props> = ({ list }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const { idItem } = useParams();
  const navigate = useNavigate();
  const product = list.find(item => item.id === idItem);
  const [capacity, setCapacity] = useState(
    idItem?.split('-').slice(-2, -1).join(' ').toUpperCase(),
  );
  const [active, setActive] = useState(0);
  const totalPictureNumber = product?.images.length ?? 0;
  const startTouch = useRef<number>(0);
  const endTouch = useRef<number>(0);

  const { fav, cart, handleAddCart, handleAddFav } = useContext(ContextApp);

  const colorNames: ColorNames = {
    'space gray': '#CCCCCC',
    spaceblack: '#333333',
    midnightgreen: '#003300',
    rosegold: '#FFCCCC',
    spacegray: '#AAAAAA',
    sierrablue: '#66CCFF',
    graphite: '#666666',
    midnight: '#000033',
  };

  const handlerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handlerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endTouch.current = e.touches[0].clientX;
  };

  const handlerTouchEnd = () => {
    if (startTouch.current - endTouch.current > 40) {
      setActive(prevState => (prevState + 1) % totalPictureNumber);
    }

    if (startTouch.current - endTouch.current < -40) {
      setActive(
        prevState => (prevState - 1 + totalPictureNumber) % totalPictureNumber,
      );
    }
  };

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);

    const formattedColor = color === 'space gray' ? ['space', 'gray'] : color;

    let parts = idItem?.split('-');

    if (parts && parts[parts.length - 2] === 'space') {
      parts = parts?.filter(item => item !== 'space');
    }

    const id = parts?.slice(0, -1).concat(formattedColor).join('-');

    if (product) {
      return navigate(`/${product.category}/${id}`);
    }
  };

  const handleChangeCapacity = (cap: string) => {
    setCapacity(cap);

    const newId = idItem?.split('-');

    if (newId && selectedColor !== 'space gray') {
      newId[newId.length - 2] = cap.toLowerCase();
    }

    if (newId && selectedColor === 'space gray') {
      newId[newId.length - 3] = cap.toLowerCase();
    }

    const newString = newId?.join('-');
    const newUrl = `/${product?.category}/${newString}`;

    navigate(newUrl);
  };

  return (
    <>
      {!product && <SkeletonDetails />}
      {product && (
        <div className={Styles.card}>
          <Crumbs path={[product.category]} details={`${product.id}`} />

          <BackButton />

          <h1 className={Styles.card__title}>
            {firstLetterCapital(product.id)}
          </h1>

          <div className={Styles.card__slider}>
            <div
              onTouchStart={handlerTouchStart}
              onTouchEnd={handlerTouchEnd}
              onTouchMove={handlerTouchMove}
              className={Styles.card__slider__container}
              style={{
                transform: `translateY(-${active * 100}%)`,
              }}
            >
              {product?.images.map(picture => {
                return (
                  <img
                    key={picture}
                    className={Styles.card__slider__container__img}
                    src={`./${picture}`}
                    alt={`${picture}`}
                  />
                );
              })}
            </div>

            <div className={Styles.card__slider__picker}>
              {product?.images.map(item => {
                return (
                  <img
                    className={Styles.card__slider__picker__item}
                    key={item}
                    src={`./${item}`}
                    alt="item picture"
                    onClick={() => {
                      if (product) {
                        const index = product.images.findIndex(
                          img => img === item,
                        );
                        setActive(index);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className={Styles.card__colors}>
            <div className={Styles.card__colors__paragraphs}>
              <p className={Styles.card__colors__paragraphs__item}>
                Available colors
              </p>
              <p
                className={Styles.card__colors__paragraphs__item}
              >{`ID: ${product?.id}`}</p>
            </div>

            <div className={Styles.card__colors__container}>
              {product?.colorsAvailable.map(item => {
                return (
                  <div
                    key={item}
                    onClick={() => handleChangeColor(item)}
                    className={Styles['card__colors__container__item']}
                    style={{
                      backgroundColor: colorNames[item as ColorName] || item,
                    }}
                  ></div>
                );
              })}
            </div>

            <div className={Styles.card__colors__separator} />
          </div>

          <div className={Styles.card__capacity}>
            <p className={Styles.card__capacity__paragraph}>Select capacity</p>

            <div className={Styles.card__capacity__container}>
              {product?.capacityAvailable.map(cap => {
                return (
                  <div
                    key={cap}
                    onClick={() => handleChangeCapacity(cap)}
                    className={cn(Styles.card__capacity__container__item, {
                      [Styles.card__capacity__container__item__active]:
                        capacity === cap,
                    })}
                  >
                    {cap}
                  </div>
                );
              })}
            </div>

            <div className={Styles.card__capacity__separator} />
          </div>

          <div className={Styles.card__price}>
            <div className={Styles.card__price__container}>
              <p className={Styles.card__price__discount}>
                ${product?.priceDiscount}
              </p>
              <p className={Styles.card__price__full}>
                ${product?.priceRegular}
              </p>
            </div>

            <div className={Styles.card__price__container}>
              <div
                onClick={() => handleAddCart(product)}
                className={cn(Styles.card__price__add, {
                  [Styles.card__price__add__added]: cart.find(
                    item => item.id === product.id,
                  ),
                })}
              ></div>
              <div
                onClick={() => handleAddFav(product)}
                className={cn(Styles.card__price__fav, {
                  [Styles.card__price__fav__selected]: fav.find(
                    item => item.id === product.id,
                  ),
                })}
              />
            </div>
          </div>

          <div className={Styles.card__info}>
            <p className={Styles.card__info__paragraph}>
              <span className={Styles.card__info__paragraph__name}>Screen</span>
              <span className={Styles.card__info__paragraph__value}>
                {product?.screen}
              </span>
            </p>

            <p className={Styles.card__info__paragraph}>
              <span className={Styles.card__info__paragraph__name}>
                Resolution
              </span>
              <span className={Styles.card__info__paragraph__value}>
                {product?.resolution}
              </span>
            </p>

            <p className={Styles.card__info__paragraph}>
              <span className={Styles.card__info__paragraph__name}>
                Processor
              </span>
              <span className={Styles.card__info__paragraph__value}>
                {product?.processor}
              </span>
            </p>

            <p className={Styles.card__info__paragraph}>
              <span className={Styles.card__info__paragraph__name}>RAM</span>
              <span className={Styles.card__info__paragraph__value}>
                {product?.ram}
              </span>
            </p>
          </div>

          <div className={Styles.card__description}>
            <p className={Styles.card__description__title}>About</p>

            <div className={Styles.card__description__separator} />

            {product?.description.map(item => {
              return (
                <React.Fragment key={item.title}>
                  <p className={Styles.card__description__title}>
                    {item.title}
                  </p>
                  <article className={Styles.card__description__article}>
                    {item.text}
                  </article>
                </React.Fragment>
              );
            })}
          </div>

          <div className={Styles.card__tech}>
            <p className={Styles.card__tech__title}>Tech specs</p>

            <div className={Styles.card__tech__separator} />

            <p className={Styles.card__tech__paragraph}>
              <span className={Styles.card__tech__paragraph__name}>Screen</span>
              <span className={Styles.card__tech__paragraph__value}>
                {product?.screen}
              </span>
            </p>

            <p className={Styles.card__tech__paragraph}>
              <span className={Styles.card__tech__paragraph__name}>
                Resolution
              </span>
              <span className={Styles.card__tech__paragraph__value}>
                {product?.resolution}
              </span>
            </p>

            <p className={Styles.card__tech__paragraph}>
              <span className={Styles.card__tech__paragraph__name}>
                Processor
              </span>
              <span className={Styles.card__tech__paragraph__value}>
                {product?.processor}
              </span>
            </p>

            <p className={Styles.card__tech__paragraph}>
              <span className={Styles.card__tech__paragraph__name}>Ram</span>
              <span className={Styles.card__tech__paragraph__value}>
                {product?.ram}
              </span>
            </p>

            <p className={Styles.card__tech__paragraph}>
              <span className={Styles.card__tech__paragraph__name}>
                Built in memory
              </span>
              <span className={Styles.card__tech__paragraph__value}>
                {product?.capacity}
              </span>
            </p>

            <p className={Styles.card__tech__paragraph}>
              <span className={Styles.card__tech__paragraph__name}>Cell</span>
              <span className={Styles.card__tech__paragraph__value}>
                {product?.cell.join(',')}
              </span>
            </p>
          </div>

          <div className={Styles.card__list}>
            <ItemSlider
              list={list}
              showRandom={true}
              title={'You may also like'}
            />
          </div>
        </div>
      )}
    </>
  );
};
