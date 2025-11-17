//#region Components and func
import {
  home,
  style,
  arrow,
  Button,
  NotFoundPage,
  getData,
  Skeleton,
  CardLike,
} from './index';
//#endregion

//#region React-router
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//#endregion

//#region TS
import { Device } from '../../types/Device';
import { useTimer } from '../../Hooks/useTimer';
//#endregion

//#region Gallery
import 'yet-another-react-lightbox/styles.css';
import {
  Fullscreen,
  Counter,
  Thumbnails,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Lightbox from 'yet-another-react-lightbox';
//#endregion

import cn from 'classnames';

export const ProductCard = () => {
  //Route
  const { pathname } = useLocation();
  const { productId } = useParams();
  const categoryName = pathname.split('/')[1];

  //State
  const [item, setItem] = useState<Device>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [mainImg, setMainImg] = useState<string>('');
  const [isColor, setColor] = useState<string>('');
  const [baseSlug, setBaseSlug] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [OpenGallery, setOpenGallery] = useState(false);

  //Hooks
  const { start, clear } = useTimer();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const loadData = async () => {
      try {
        const fetchedProduct = await getData<Device[]>(categoryName);

        const productData = fetchedProduct.find(
          product => product.id === productId,
        );

        if (!productData) {
          setIsError(true);

          return;
        }

        const colorsSlug = productData.colorsAvailable.map(c => {
          return c.toLowerCase().replace(/\s+/g, '-');
        });

        const currentColorSlug = colorsSlug.find(slug => {
          return productId?.endsWith(slug);
        });

        const baseSlugs = currentColorSlug
          ? productId?.slice(0, -(currentColorSlug.length + 1))
          : productId;

        if (baseSlugs) {
          setBaseSlug(baseSlugs);
        }

        setItem(productData);
        setMainImg(productData.images[0]);
        setColor(productData.color);
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
  }, [productId, start, clear, categoryName]);

  return (
    <>
      {isLoading && <Skeleton />}
      {isError && <NotFoundPage />}

      {!isLoading && item && !isError && (
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
                      <Link to={`..`} className={style.item__text}>
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
                  <Link className={style.back__link} to={'..'}>
                    Back
                  </Link>
                </div>
                <div>
                  <article className={style.article}>
                    <h1 className={`title ${style.title}`}>{item.name}</h1>
                    <div className={style.card}>
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
                                alt: 'phone',
                              }))}
                            />
                          </ul>
                        </div>
                        <div className={style.main}>
                          <div className={`${style.main__box}`}>
                            <div className={`${style.box__color} ${style.box}`}>
                              <div>
                                <span>Available colors</span>
                                <span>ID: 802390</span>
                              </div>

                              <ul
                                className={`${style['box__color--list']} ${style.container}`}
                              >
                                {item.colorsAvailable.map((color, iColor) => (
                                  <li
                                    className={cn(style['box__color--items'], {
                                      [style['box__color--active']]:
                                        item.colorsAvailable[
                                          iColor
                                        ].toLowerCase() === isColor,
                                    })}
                                    key={iColor}
                                  >
                                    <Link
                                      className={
                                        style['box__color__items--link']
                                      }
                                      to={`/${categoryName}/${baseSlug}-${color
                                        .toLowerCase()
                                        .replace(/\s+/g, '-')}`}
                                    >
                                      <span
                                        style={{
                                          backgroundColor: `var(--device-${color.replace(/\s/g, '')})`,
                                        }}
                                        className={style.box__color__item}
                                      ></span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div
                              className={`${style.capacity} ${style.box} ${style.container}`}
                            >
                              <span>Select capacity</span>
                              <ul className={`${style.capacity__list}`}>
                                {item.capacityAvailable.map(
                                  (capacity, icapacity) => (
                                    <li
                                      key={icapacity}
                                      className={cn(style.capacity__items, {
                                        [style['capacity__items--active']]:
                                          item.capacity === capacity,
                                      })}
                                    >
                                      <Link
                                        className={style.capacity__link}
                                        to={`/${categoryName}/${productId?.replace(
                                          /-(\d+)?(gb|tb|mm)/i,
                                          `-${capacity.toLowerCase()}`,
                                        )}`}
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

                          <div className={style.price}>
                            <p className={style.price__device}>
                              ${item.priceRegular}
                            </p>
                            {item.priceDiscount && (
                              <p className={style.price__discount}>
                                ${item.priceDiscount}
                              </p>
                            )}
                          </div>
                          <div
                            className={`${style.card__button} ${style.container}`}
                          >
                            <Button />
                          </div>
                          <div className={`${style.info} ${style.container}`}>
                            <div>
                              <span>Screen</span>
                              <span>Resolution</span>
                              <span>Processor</span>
                              <span>RAM</span>
                            </div>
                            <div>
                              <span>{item.screen}</span>
                              <span>{item.resolution}</span>
                              <span>{item.processor}</span>
                              <span>{item.ram}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={style.bottom}>
                        <div className={style.about}>
                          <h4 className={`${style['bottom--title']} title`}>
                            About
                          </h4>
                          <div className={style.about__items}>
                            {item.description.map((info, iInfo) => (
                              <div key={iInfo} className={style.about__item}>
                                <h3
                                  className={`${style['about__item--title']} title`}
                                >
                                  {info.title}
                                </h3>
                                <p className={style['about__item--info']}>
                                  {info.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={style.techspecs}>
                          <h4 className={`${style['bottom--title']} title`}>
                            Tech specs
                          </h4>

                          <div className={style.techspecs__content}>
                            <div>
                              <span>Screen</span>
                              <span>Resolution</span>
                              <span>Processor</span>
                              <span>RAM</span>
                              <span>Built in memory</span>
                              {item.camera && <span>Camera</span>}
                              {item.zoom && <span>Zoom</span>}
                              {item.cell && <span>Cell</span>}
                            </div>
                            <div>
                              <span>{item.screen}</span>
                              <span>{item.resolution}</span>
                              <span>{item.processor}</span>
                              <span>{item.ram}</span>
                              <span>{item.capacity}</span>
                              {item.camera && <span>{item.camera}</span>}
                              {item.zoom && <span>{item.zoom}</span>}
                              {item.cell && (
                                <span>{item.cell.slice(-2).join(', ')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className={`container ${style.alsoLike}`}>
              <CardLike />
            </div>
          </section>
        </main>
      )}
    </>
  );
};
