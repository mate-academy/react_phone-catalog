import { Link, useParams } from 'react-router-dom';
import { Navigation as Nav } from '../Navigation/Navigation';
import phoneOffer from './ProductOffer.module.scss';
import './SwiperProductOffer.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import classNames from 'classnames';
import { Footer } from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CartPage } from '../CartPage';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import ReactLoading from 'react-loading';

export const PhonesOffer = () => {
  const {
    phones,
    products,
    setFavouriteItems,
    favouriteItems,
    addedItems,
    setAddedItems,
    totalModels,
    setTotalModels,
    totalPrice,
    setTotalPrice,
    setProducts,
    themeSwitcher,
    error,
    loading,
  } = useContext(CatalogContext);
  const { itemId } = useParams();
  const selectedPhone = phones.find(phone => phone.id === itemId);
  const selectedProduct = products.find(product => product.itemId === itemId);
  const proposedPhones = products.filter(
    product =>
      product.category === 'phones' &&
      product.capacity === selectedPhone?.capacity,
  );
  const [selectedColor, setSelectedColor] = useState(selectedPhone?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedPhone?.capacity,
  );
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const id = (Math.random() * 100000).toFixed(0);

  const navigate = useNavigate();

  const addProductToFavourite = (favouriteProduct: Product) => {
    const readyToAddItem = favouriteItems.some(
      item => item.id === favouriteProduct.id,
    );

    if (favouriteProduct.itemId !== itemId) {
      const updateItem = favouriteItems.filter(
        item => item.id !== favouriteProduct.id,
      );

      setFavouriteItems(updateItem);
    } else {
      setFavouriteItems([...favouriteItems, favouriteProduct]);
    }

    if (readyToAddItem) {
      const updateItem = favouriteItems.filter(
        item => item.id !== favouriteProduct.id,
      );

      setFavouriteItems(updateItem);
    }
  };

  const addItems = (addedItem: Product) => {
    const readyToAdd = addedItems.some(item => item.id === addedItem.id);

    if (
      addedItem.id === selectedProduct?.id &&
      addedItems.find(item => item.id === addedItem.id)
    ) {
      const updateItem = addedItems.filter(item => item.id !== addedItem.id);

      setTotalModels(totalModels - selectedProduct?.amountOfModels);
      setAddedItems(updateItem);
      setTotalPrice(
        totalPrice - selectedProduct?.amountOfModels * addedItem.price,
      );
    }

    if (
      addedItem.id === selectedProduct?.id &&
      !addedItems.find(item => item.id === addedItem.id)
    ) {
      setTotalModels(totalModels + 1);
      setTotalPrice(totalPrice + addedItem.price);
      setAddedItems([...addedItems, addedItem]);
    }

    if (readyToAdd) {
      const updateItem = addedItems.filter(item => item.id !== addedItem.id);
      const updateProduct = products.map(currentProduct => {
        if (currentProduct.id === addedItem.id) {
          return {
            ...currentProduct,
            amountOfModels: 1,
          };
        }

        return currentProduct;
      });

      setProducts(updateProduct);
      setAddedItems(updateItem);
    }
  };

  return (
    <>
      <Nav />
      <div
        className={classNames([phoneOffer.backgroundLoader], {
          [phoneOffer.backgroundLoaderOFF]: !loading,
        })}
        data-theme={themeSwitcher ? 'dark' : 'light'}
      >
        <ReactLoading
          height={'70%'}
          width={'30%'}
          type="spokes"
          color={themeSwitcher ? 'white' : 'black'}
          data-theme={themeSwitcher ? 'dark' : 'light'}
          className={phoneOffer.loader}
        />
      </div>

      <>
        {' '}
        <div
          className={classNames([phoneOffer.offer], {
            [phoneOffer.offerOFF]: loading,
          })}
        >
          {!error ? (
            <>
              <div
                className={phoneOffer.productoffer}
                data-theme={themeSwitcher ? 'dark' : 'light'}
              >
                <button
                  className={phoneOffer.breadcrumbs__backbutton}
                  onClick={() => navigate(-1)}
                >
                  <div className={phoneOffer.breadcrumbs__backarrow}></div> Back
                </button>
                <div className={phoneOffer.breadcrumbs}>
                  <Link to="/">
                    <div
                      className={classNames([phoneOffer.breadcrumbs__home], {
                        [phoneOffer.breadcrumbs__homeONDARK]: themeSwitcher,
                      })}
                    />
                  </Link>
                  <div className={phoneOffer.breadcrumbs__arrow} />
                  <Link
                    className={phoneOffer.breadcrumbs__textactive}
                    to="/phones"
                  >
                    <div className={phoneOffer.breadcrumbs__text}>Phones</div>
                  </Link>
                  <div className={phoneOffer.breadcrumbs__arrow} />
                  <div className={phoneOffer.breadcrumbs__text}>{itemId}</div>
                </div>
                <h1 className={phoneOffer.title}>{selectedPhone?.name}</h1>
                <div className={phoneOffer.containerONTABLET}>
                  <div className="container__swipers">
                    <div className="container">
                      <Swiper
                        className={phoneOffer.images}
                        modules={[FreeMode, Navigation, Thumbs]}
                        navigation={true}
                        loop={true}
                        spaceBetween={100}
                        thumbs={{ swiper: thumbsSwiper }}
                      >
                        {selectedPhone?.images.map((image, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <img src={image} className={phoneOffer.image} />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                    <div className="container__nav">
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={10}
                        freeMode={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className={phoneOffer.navImages}
                      >
                        {selectedPhone?.images.map((image, i) => {
                          return (
                            <SwiperSlide key={i}>
                              <img
                                src={image}
                                className={phoneOffer.navImage}
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>

                  <div className={phoneOffer.panel}>
                    <div className={phoneOffer.panel__id_and_title}>
                      <h2 className={phoneOffer.panel__title}>
                        Available colors
                      </h2>
                      <div
                        className={phoneOffer.panel__idnumber}
                      >{`ID: ${id}`}</div>
                    </div>
                    <div className={phoneOffer.panel__colors}>
                      {selectedPhone?.colorsAvailable.map(color => {
                        const getSelectedColor = (currentColor: string) => {
                          if (color === currentColor) {
                            setSelectedColor(currentColor);

                            navigate(
                              `/phones/${selectedPhone.namespaceId}-${selectedPhone.capacity.toLowerCase()}-${currentColor}`,
                            );
                          }
                        };

                        return (
                          <button
                            key={color}
                            onClick={() => getSelectedColor(color)}
                            className={classNames(
                              [phoneOffer.panel__colorselection],
                              {
                                [phoneOffer.panel__colorselectionselected]:
                                  selectedColor === color ||
                                  color === selectedPhone.color,
                              },
                            )}
                            style={{ backgroundColor: `${color}` }}
                          ></button>
                        );
                      })}
                    </div>
                    <div className={phoneOffer.line}></div>
                    <div className={phoneOffer.panel__capacity_title}>
                      Select capacity
                    </div>
                    {selectedPhone?.capacityAvailable.map(capacity => {
                      const getSelectedCapacity = (currentCapacity: string) => {
                        if (
                          currentCapacity.toLowerCase() ===
                          capacity.toLowerCase()
                        ) {
                          setSelectedCapacity(currentCapacity);

                          navigate(
                            `/phones/${selectedPhone.namespaceId}-${currentCapacity.toLowerCase()}-${selectedPhone.color}`,
                          );
                        }
                      };

                      return (
                        <button
                          className={classNames(
                            [phoneOffer.panel__capacity_option],
                            {
                              [phoneOffer.panel__capacity_optionselected]:
                                selectedCapacity === capacity ||
                                capacity === selectedPhone.capacity,
                            },
                          )}
                          key={capacity}
                          onClick={() => getSelectedCapacity(capacity)}
                        >
                          {capacity}
                        </button>
                      );
                    })}
                    <div className={phoneOffer.line}></div>
                    <div className={phoneOffer.panel__prices}>
                      <div
                        className={phoneOffer.panel__price}
                      >{`$${selectedPhone?.priceDiscount}`}</div>
                      <del
                        className={phoneOffer.panel__pricediscount}
                      >{`$${selectedPhone?.priceRegular}`}</del>
                    </div>
                    <div className={phoneOffer.panel__buttons}>
                      {selectedProduct && (
                        <button
                          className={classNames(
                            [phoneOffer.panel__adding_button],
                            {
                              [phoneOffer.panel__adding_buttonISACTIVE]:
                                addedItems.find(item => item.id === itemId),
                            },
                          )}
                          onClick={() => addItems(selectedProduct)}
                        >
                          {addedItems.find(
                            item => item.id === selectedProduct.id,
                          )
                            ? 'ADDED'
                            : 'Add to cart'}
                        </button>
                      )}
                      {selectedProduct && (
                        <button
                          onClick={() => addProductToFavourite(selectedProduct)}
                          className={classNames(
                            [phoneOffer.panel__heartbutton],
                            {
                              [phoneOffer.panel__heartbuttonisactive]:
                                favouriteItems.find(
                                  item => item.itemId === itemId,
                                ),
                              [phoneOffer.panel__heartbuttonONDARK]:
                                themeSwitcher,
                              [phoneOffer.panel__heartbuttonONDARKISACTIVE]:
                                themeSwitcher &&
                                favouriteItems.find(
                                  item => item.itemId === itemId,
                                ),
                            },
                          )}
                        ></button>
                      )}
                    </div>
                    <div className={phoneOffer.panel__basicspec}>
                      <div className={phoneOffer.panel__basicspec__data}>
                        <div className={phoneOffer.panel__basicspec__title}>
                          Screen
                        </div>
                        <div className={phoneOffer.panel__basicspec__text}>
                          {selectedPhone?.screen}
                        </div>
                      </div>
                      <div className={phoneOffer.panel__basicspec__data}>
                        <div className={phoneOffer.panel__basicspec__title}>
                          Resolution
                        </div>
                        <div className={phoneOffer.panel__basicspec__text}>
                          {selectedPhone?.resolution}
                        </div>
                      </div>
                      <div className={phoneOffer.panel__basicspec__data}>
                        <div className={phoneOffer.panel__basicspec__title}>
                          Processor
                        </div>
                        <div className={phoneOffer.panel__basicspec__text}>
                          {selectedPhone?.processor}
                        </div>
                      </div>
                      <div className={phoneOffer.panel__basicspec__data}>
                        <div className={phoneOffer.panel__basicspec__title}>
                          RAM
                        </div>
                        <div className={phoneOffer.panel__basicspec__text}>
                          {selectedPhone?.ram}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={phoneOffer.description__container}
                data-theme={themeSwitcher ? 'dark' : 'light'}
              >
                <div className={phoneOffer.description}>
                  <h2 className={phoneOffer.description__header}>About</h2>
                  <div className={phoneOffer.line}></div>
                  {selectedPhone?.description.map(data => (
                    <>
                      <div className={phoneOffer.description__title}>
                        {data.title}
                      </div>
                      <div className={phoneOffer.description__text}>
                        {data.text}
                      </div>
                    </>
                  ))}
                  <div className={phoneOffer.line}></div>
                </div>
                <div className={phoneOffer.techspec}>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>Screen</div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.screen}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>Resolution</div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.resolution}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>Processor</div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.processor}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>RAM</div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.ram}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>
                      Built in memory
                    </div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.capacity}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>Camera</div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.camera}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>Zoom</div>
                    <div className={phoneOffer.techspec__text}>
                      {selectedPhone?.zoom}
                    </div>
                  </div>
                  <div className={phoneOffer.techspec__data}>
                    <div className={phoneOffer.techspec__title}>Cell</div>

                    {selectedPhone?.cell.map(cell => (
                      <div className={phoneOffer.techspec__text} key={cell}>
                        {`${cell}, `}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={phoneOffer.title}
                data-theme={themeSwitcher ? 'dark' : 'light'}
              >
                <CartPage
                  showedProducts={proposedPhones}
                  swiperTitle={'You may also like'}
                />
              </div>
            </>
          ) : (
            <ErrorScreen />
          )}
        </div>
      </>
      <Footer />
    </>
  );
};
