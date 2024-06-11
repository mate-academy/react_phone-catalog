import { useEffect, useRef, useState } from 'react';
import Styles from './Details.module.scss';
import { Slider } from '../home/slider';
import { Item } from '../../types/Item';
import { useParams } from 'react-router-dom';

type Props = {
  list: Item[];
};

export const Details: React.FC<Props> = ({ list }) => {
  const { itemId } = useParams();
  const product = list.find(item => item.namespaceId === itemId);
  const [active, setActive] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);
  const totalPictureNumber = product?.images.length ?? 0;
  const startTouch = useRef<number>(0);
  const endTouch = useRef<number>(0);
  console.log('x', selectedPictures);
  console.log('y', selectedColor);

  useEffect(() => {
    if (selectedColor !== '') {
      const formated = selectedColor.split(' ').join('-');
      const newImages = product?.images.map(image => {
        const parts = image.split('/');
        parts[3] = formated;
        return parts.join('/');
      });

      setSelectedPictures(newImages ? newImages : ['xxx']);
    }
  }, [selectedColor, product]);

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
  };
  return (
    <div className={Styles.card}>
      <h1 className={Styles.card__title}>{product?.name}</h1>

      <div className={Styles.card__slider}>
        <div
          onTouchStart={handlerTouchStart}
          onTouchEnd={handlerTouchEnd}
          onTouchMove={handlerTouchMove}
          className={Styles.card__slider__container}
          style={{
            transform: `translateX(-${active * 100}%)`,
          }}
        >
          {!selectedPictures.length
            ? product?.images.map(picture => {
                return (
                  <img key={picture} src={`./${picture}`} alt={`${picture}`} />
                );
              })
            : selectedPictures.map(picture => {
                return (
                  <img key={picture} src={`./${picture}`} alt={`${picture}`} />
                );
              })}
        </div>

        <div className={Styles.card__slider__picker}>
          {!selectedPictures.length
            ? product?.images.map(item => {
                return (
                  <img
                    className={Styles.card__slider__picker__item}
                    key={item}
                    src={`./${item}`}
                    alt="item picture"
                    onClick={() => {
                      const index = product.images.findIndex(
                        img => img === item,
                      );
                      setActive(index);
                    }}
                  />
                );
              })
            : selectedPictures.map(item => {
                return (
                  <img
                    className={Styles.card__slider__picker__item}
                    key={item}
                    src={`./${item}`}
                    alt="item picture"
                    onClick={() => {
                      const index =
                        product &&
                        product.images.findIndex(img => img === item);
                      setActive(index?);
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
          >{`ID: ${product?.namespaceId}`}</p>
        </div>

        <div className={Styles.card__colors__container}>
          {product?.colorsAvailable.map(item => {
            const formated =
              item.split(' ')[1] === undefined ? item : item.split(' ')[1];
            console.log(formated, 'l');

            return (
              <div
                key={item}
                onClick={() => handleChangeColor(item)}
                className={Styles['card__colors__container__item']}
                style={{
                  backgroundColor: formated,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      <div className={Styles.card__separator} />

      <div className={Styles.card__capacity}>
        <p>Select capacity</p>

        <div className={Styles['card__capacity__item--1']}>
          'product.capacity1'
        </div>
        <div className={Styles['card__capacity__item--2']}>
          'product.capacity2'
        </div>
        <div className={Styles['card__capacity__item--3']}>
          'product.capacity3'
        </div>
      </div>

      <div className={Styles.card__separator} />

      <div className={Styles.card__price}>
        <p className={Styles.card__price__discount}>product.price</p>

        <p className={Styles.card__price__full}>product.fullPrice</p>

        <div className={Styles.card__price__add}>Add to cart</div>

        <div className={Styles.card__price__fav} />
      </div>

      <div className={Styles.card__info}>
        <p className={Styles.card__info__paragraph}>
          <span className={Styles.card__info__paragraph__name}>Screen</span>
          <span className={Styles.card__info__paragraph__name}>
            product.screen
          </span>
        </p>

        <p className={Styles.card__info__paragraph}>
          <span className={Styles.card__info__paragraph__name}>Resolution</span>
          <span className={Styles.card__info__paragraph__name}>
            product.resolution
          </span>
        </p>

        <p className={Styles.card__info__paragraph}>
          <span className={Styles.card__info__paragraph__name}>Processor</span>
          <span className={Styles.card__info__paragraph__name}>
            product.processor
          </span>
        </p>

        <p className={Styles.card__info__paragraph}>
          <span className={Styles.card__info__paragraph__name}>RAM</span>
          <span className={Styles.card__info__paragraph__name}>
            product.ram
          </span>
        </p>
      </div>

      <div className={Styles.card__description}>
        <p className={Styles.card__description__title}>About</p>

        <div className={Styles.card__separator} />

        <p className={Styles.card__description__title}>
          And then there was Pro
        </p>

        <article className={Styles.card__description__article}>
          product.description
        </article>

        <p className={Styles.card__description__title}>Camera</p>

        <article className={Styles.card__description__article}>
          product.description
        </article>

        <p className={Styles.card__description__title}>
          Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love
          it.
        </p>

        <article className={Styles.card__description__article}>
          product.description
        </article>
      </div>

      <div className={Styles.card__tech}>
        <p className={Styles.card__tech__title}>Tech specs</p>

        <div className={Styles.card__separator} />

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Screen</span>
          <span className={Styles.card__tech__value}>product.screen</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Resolution</span>
          <span className={Styles.card__tech__value}>product.resolution</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Processor</span>
          <span className={Styles.card__tech__value}>product.Processor</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Ram</span>
          <span className={Styles.card__tech__value}>product.ram</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Built in memory</span>
          <span className={Styles.card__tech__value}>product.memory</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Camera</span>
          <span className={Styles.card__tech__value}>product.camera</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Zoom</span>
          <span className={Styles.card__tech__value}>product.zoom</span>
        </p>

        <p className={Styles.card__tech__paragraph}>
          <span className={Styles.card__tech__name}>Cell</span>
          <span className={Styles.card__tech__value}>product.cell</span>
        </p>
      </div>

      <Slider title={'You may also like'} />
    </div>
  );
};
