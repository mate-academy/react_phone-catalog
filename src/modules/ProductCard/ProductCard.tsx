//#region Components and func
import {
  home,
  style,
  arrow,
  Button,
  NotFoundPage,
  getData,
  CardLike,
} from './index';
//#endregion

//#region React-router
import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
//#endregion

//#region TS
import { Device } from '../../types/Device';

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

//#region Context
import { ShoppingContex } from '../../context/ShoppingContex';
//#endregion

//#region other
import cn from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findISelectedItem } from '../../utils/findSelectedItem';
import { showNotify } from '../../utils/showNotify';
import { useTranslation } from 'react-i18next';
//#endregion

export const ProductCard = () => {
  //#regionRoute
  const { pathname } = useLocation();
  const { productId } = useParams();
  const categoryName = pathname.split('/')[1];
  //#endregion

  //#regionState
  const [item, setItem] = useState<Device>();
  const [isError, setIsError] = useState<boolean>(false);
  const [mainImg, setMainImg] = useState<string>('');
  const [isColor, setColor] = useState<string>('');
  const [baseSlug, setBaseSlug] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [OpenGallery, setOpenGallery] = useState(false);

  //#endregion

  //#regionTranslate
  const { t } = useTranslation();

  //#endregion

  //#regionContext
  const { toggleFavorite, favoritItems, cartItems, toggleItems } =
    useContext(ShoppingContex);

  //#endregion

  //#regionFetched
  useEffect(() => {
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
      }
    };

    loadData();
  }, [productId, categoryName]);
  //#endregion

  //#regionSelectedItems
  const selected = findISelectedItem(cartItems, item?.name);
  const isFavorit = findISelectedItem(favoritItems, item?.name);

  const notifyAddedFavorit = (newItem: Device) => {
    if (!isFavorit) {
      return showNotify(`${newItem.name} Added to favorites!`, 'dark');
    } else {
      return showNotify(`${newItem.name} Removed from favorites!`);
    }
  };

  const notifyAddedToCart = (newItem: Device) => {
    if (!selected) {
      return showNotify(
        t('notifications.addedToCart', { name: newItem.name }),
        'dark',
      );
    } else {
      return showNotify(
        t('notifications.removeToCart', { name: newItem.name }),
      );
    }
  };
  //#endregion

  return (
    <>
      {isError && <NotFoundPage />}

      {item && !isError && (
        <main className="main">
          <section className="section">
            <div className="container">
              <div className={style.wrapper}>
                <ToastContainer />
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
                        {t(`categoryDevice.${categoryName}`)}
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
                    {t('page.back')}
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
                                <span>{t('product.AvailableColor')}</span>
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
                              <span>
                                {item.capacity.includes('mm')
                                  ? t('product.capacityMM')
                                  : t('product.capacity')}
                              </span>
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
                              ${item.priceDiscount}
                            </p>
                            {item.priceRegular && (
                              <p className={style.price__discount}>
                                ${item.priceRegular}
                              </p>
                            )}
                          </div>
                          <div
                            className={`${style.card__button} ${style.container}`}
                          >
                            <Button
                              notifyAddedFavorit={() =>
                                notifyAddedFavorit(item)
                              }
                              isAdded={!!selected}
                              isFavorit={!!isFavorit}
                              toggleFavorite={() => toggleFavorite(item)}
                              notifyAddedCart={() => notifyAddedToCart(item)}
                              toggleItems={() => toggleItems(item)}
                            />
                          </div>
                          <div className={`${style.info} ${style.container}`}>
                            <div>
                              <span>{t('product.screen')}</span>
                              <span>{t('product.resolution')}</span>
                              <span>{t('product.processor')}</span>
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
                            {t('product.about')}
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
                            {t('product.techSpecs')}
                          </h4>

                          <div className={style.techspecs__content}>
                            <div>
                              <span>{t('product.screen')}</span>
                              <span>{t('product.resolution')}</span>
                              <span>{t('product.processor')}</span>
                              <span>RAM</span>
                              <span>{t('product.builtInMemory')}</span>
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
