import home from '@Images/icons/Home.svg';
import style from './productCard.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import arrow from '@Images/icons/Arrow-black-right.svg';
import { FC, useEffect, useState } from 'react';
import { getData } from '@Fetch';
import { Phones } from '../../types/phones';
import { useTimer } from '../../Hooks/useTimer';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import 'yet-another-react-lightbox/styles.css';
import {
  Fullscreen,
  Counter,
  Thumbnails,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Lightbox from 'yet-another-react-lightbox';
import cn from 'classnames';

interface ImagesProps {
  images: string[] | undefined;
  onClick: (v: number) => void;
}

export const Images: FC<ImagesProps> = props => {
  const { images, onClick } = props;
  const handleClickImg = (index: number) => {
    onClick(index);
  };

  return (
    <div className={style.container}>
      {images?.map((slide, index) => (
        <div
          onClick={() => handleClickImg(index)}
          key={index}
          className={style.img}
        >
          <img src={slide} alt="" />
        </div>
      ))}
    </div>
  );
};

export const ProductCard = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const categoryName = pathname.split('/')[1];

  console.log(categoryName);

  const [item, setItem] = useState<Phones>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { start, clear } = useTimer();

  const [index, setIndex] = useState<number>(0);

  const [OpenGallery, setOpenGallery] = useState(false);
  const [mainImg, setMainImg] = useState<string>('');
  const [isColor, setColor] = useState<string>('');
  const [iscapacity, setIsCapacity] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);

    const loadData = async () => {
      try {
        const fetchedProduct = await getData<Phones[]>('phones');
        const productData = fetchedProduct.find(
          phone => phone.id === productId,
        );

        if (!productData) {
          return;
        }

        setItem(productData);
        setMainImg(productData.images[0]);

        const productName = productData.name;

        const initialColor = productData.colorsAvailable.find(color => {
          return productName.toLowerCase().includes(color.toLowerCase());
        });

        if (initialColor) {
          setColor(initialColor);
        }
      } catch (error) {
        if (error) {
          setIsError(true);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    start(() => {
      loadData();
    }, 200);

    return () => clear();
  }, [productId, start, clear]);

  return (
    <>
      {!isLoading && item ? (
        <main className="main">
          <section className="section">
            <div className="container">
              <div className={style.wrapper}>
                <div className={style.nav}>
                  <ul className={style.list}>
                    <li className={style.item}>
                      <Link className={style.link} to="/">
                        <img src={home} alt="" />
                      </Link>
                    </li>
                    <li className={style.item}>
                      <img
                        className={style['item__img-arrow']}
                        src={arrow}
                        alt=""
                      />
                      <Link to={'.'} className={style.item__text}>
                        {categoryName}
                      </Link>
                    </li>
                    <li className={`${style.item} ${style.items}`}>
                      <img
                        className={style['item__img-arrow']}
                        src={arrow}
                        alt=""
                      />
                      <Link
                        to={'.'}
                        className={`${style.item__text} ${style['item__text--id']}`}
                      >
                        {productId}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={style.back}>
                  <Link className={style.back__link} to={'/'}>
                    Back
                  </Link>
                </div>
                <div>
                  <article>
                    <div className={style.card}>
                      <h1 className={`title ${style.title}`}>{item.name}</h1>
                      <div className={style.top}>
                        <div className={style.gallery}>
                          <div
                            onClick={() => {
                              setOpenGallery(true);
                            }}
                            className={style['gallery-img']}
                          >
                            <img src={mainImg} alt="phone" />
                          </div>

                          <ul className={style['gallery-list']}>
                            {item.images.map((img, i) => (
                              <li
                                className={cn(style['gallery-items'], {
                                  [style['gallery-items--active']]: i === index,
                                })}
                                onClick={() => {
                                  setMainImg(img);
                                  setIndex(i);
                                }}
                                key={i}
                              >
                                <img src={img} alt="'gallery-item" />
                              </li>
                            ))}
                            <Lightbox
                              open={OpenGallery}
                              close={() => setOpenGallery(false)}
                              plugins={[Fullscreen, Counter, Thumbnails]}
                              captions={{
                                showToggle: true,
                                descriptionTextAlign: 'end',
                              }}
                              thumbnails={{
                                position: 'bottom',
                                width: 120,
                                height: 80,
                              }}
                              index={index}
                              slides={item.images.map(img => ({
                                src: img,
                                description: productId,
                              }))}
                            />
                          </ul>
                        </div>
                      </div>
                      <div className={style.main}>
                        <div className={style.main__box}>
                          <div className={`${style.box__color} ${style.box}`}>
                            <div>
                              <span>Available colors</span>
                              <span>ID: 802390</span>
                            </div>

                            <ul className={style['box__color--list']}>
                              {item.colorsAvailable.map((color, iColor) => (
                                <li
                                  className={cn(style['box__color--items'], {
                                    [style['box__color--active']]:
                                      color === isColor,
                                  })}
                                  key={iColor}
                                >
                                  <Link
                                    onClick={() => {
                                      setColor(color);
                                    }}
                                    className={style['box__color__items--link']}
                                    to={''}
                                  >
                                    <span
                                      style={{
                                        backgroundColor:
                                          color === 'midnight'
                                            ? 'rgb(44, 62, 80)'
                                            : color,
                                      }}
                                      className={style.box__color__item}
                                    ></span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className={`${style.capacity} ${style.box}`}>
                            <span>Select capacity</span>
                            <ul className={`${style.capacity__list}`}>
                              {item.capacityAvailable.map(
                                (capacity, icapacity) => (
                                  <li
                                    key={icapacity}
                                    className={style.capacity__items}
                                  >
                                    <Link
                                      className={style.capacity__link}
                                      to={''}
                                    >
                                      <span className={style.capacity__item}>
                                        {capacity}
                                      </span>
                                    </Link>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className={style.price}></div>
                        <div className={style.info}></div>
                      </div>
                      <div className={style.bottom}>
                        <div className={style.about}>
                          <h3>About</h3>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                      <div className={style.techspecs}></div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <Skeleton />
      )}
    </>
  );
};
