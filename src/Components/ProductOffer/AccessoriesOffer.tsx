import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigation as Nav } from '../Navigation/Navigation';
import accessoryOffer from './ProductOffer.module.scss';
import './SwiperProductOffer.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import classNames from 'classnames';
import { Footer } from '../Footer/Footer';
import { Product } from '../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CartPage } from '../CartPage';

export const AccessoriesOffer = () => {
  const {
    accessories,
    products,
    favouriteItems,
    setFavouriteItems,
    addedItems,
    setAddedItems,
    setTotalModels,
    totalModels,
    setProducts,
    totalPrice,
    setTotalPrice,
  } = useContext(CatalogContext);
  const { itemId } = useParams();
  const selectedAccessory = accessories.find(
    accessory => accessory.id === itemId,
  );
  const selectedProduct = products.find(product => product.itemId === itemId);
  const proposedPhones = products.filter(
    product =>
      product.category === 'accessories' &&
      product.capacity === selectedAccessory?.capacity,
  );
  const [selectedColor, setSelectedColor] = useState(selectedAccessory?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedAccessory?.capacity,
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
    const readyToAdd = addedItems.some(item => item.id === addedItem?.id);

    if (
      addedItem.id === selectedProduct?.id &&
      addedItems.find(item => item.id === addedItem.id)
    ) {
      const updateItem = addedItems.filter(item => item.id !== addedItem?.id);

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
      <div className={accessoryOffer.productoffer}>
        <button
          className={accessoryOffer.breadcrumbs__backbutton}
          onClick={() => navigate(-1)}
        >
          <div className={accessoryOffer.breadcrumbs__backarrow}></div> Back
        </button>
        <div className={accessoryOffer.breadcrumbs}>
          <Link to="/">
            <div className={accessoryOffer.breadcrumbs__home} />
          </Link>
          <div className={accessoryOffer.breadcrumbs__arrow} />
          <Link className={accessoryOffer.breadcrumbs__textactive} to="/phones">
            <div>Accessories</div>
          </Link>
          <div className={accessoryOffer.breadcrumbs__arrow} />
          <div className={accessoryOffer.breadcrumbs__text}>{itemId}</div>
        </div>
        <h1 className={accessoryOffer.title}>{selectedAccessory?.name}</h1>
        <div className={accessoryOffer.containerONTABLET}>
          <div className="container__swipers">
            <div className="container">
              <Swiper
                className={accessoryOffer.images}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={true}
                loop={true}
                spaceBetween={100}
                thumbs={{ swiper: thumbsSwiper }}
              >
                {selectedAccessory?.images.map((image, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={image} className={accessoryOffer.image} />
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
                className={accessoryOffer.navImages}
              >
                {selectedAccessory?.images.map((image, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={image} className={accessoryOffer.navImage} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <div className={accessoryOffer.panel}>
            <div className={accessoryOffer.panel__id_and_title}>
              <h2 className={accessoryOffer.panel__title}>Available colors</h2>
              <div
                className={accessoryOffer.panel__idnumber}
              >{`ID: ${id}`}</div>
            </div>
            <div className={accessoryOffer.panel__colors}>
              {selectedAccessory?.colorsAvailable.map(color => {
                const getSelectedColor = (currentColor: string) => {
                  if (color === currentColor) {
                    setSelectedColor(currentColor);

                    navigate(
                      `/accessories/${selectedAccessory.namespaceId}-${selectedAccessory.capacity.toLowerCase()}-${currentColor}`,
                    );
                  }
                };

                return (
                  <button
                    key={color}
                    onClick={() => getSelectedColor(color)}
                    className={classNames(
                      [accessoryOffer.panel__colorselection],
                      {
                        [accessoryOffer.panel__colorselectionselected]:
                          selectedColor === color ||
                          color === selectedAccessory.color,
                      },
                    )}
                    style={{ backgroundColor: `${color}` }}
                  ></button>
                );
              })}
            </div>
            <div className={accessoryOffer.line}></div>
            <div className={accessoryOffer.panel__capacity_title}>
              Select capacity
            </div>
            {selectedAccessory?.capacityAvailable.map(capacity => {
              const getSelectedCapacity = (currentCapacity: string) => {
                if (currentCapacity.toLowerCase() === capacity.toLowerCase()) {
                  setSelectedCapacity(currentCapacity);

                  navigate(
                    `/accessories/${selectedAccessory.namespaceId}-${currentCapacity.toLowerCase()}-${selectedAccessory.color}`,
                  );
                }
              };

              return (
                <button
                  className={classNames(
                    [accessoryOffer.panel__capacity_option],
                    {
                      [accessoryOffer.panel__capacity_optionselected]:
                        selectedCapacity === capacity ||
                        capacity === selectedAccessory.capacity,
                    },
                  )}
                  key={capacity}
                  onClick={() => getSelectedCapacity(capacity)}
                >
                  {capacity}
                </button>
              );
            })}
            <div className={accessoryOffer.line}></div>
            <div className={accessoryOffer.panel__prices}>
              <div
                className={accessoryOffer.panel__price}
              >{`$${selectedAccessory?.priceDiscount}`}</div>
              <del
                className={accessoryOffer.panel__pricediscount}
              >{`$${selectedAccessory?.priceRegular}`}</del>
            </div>
            <div className={accessoryOffer.panel__buttons}>
              {selectedProduct && (
                <button
                  className={accessoryOffer.panel__adding_button}
                  onClick={() => addItems(selectedProduct)}
                >
                  {addedItems.find(item => item.id === selectedProduct.id)
                    ? 'ADDED'
                    : 'Add to cart'}
                </button>
              )}
              {selectedProduct && (
                <button
                  onClick={() => addProductToFavourite(selectedProduct)}
                  className={classNames([accessoryOffer.panel__heartbutton], {
                    [accessoryOffer.panel__heartbutton_isactive]:
                      favouriteItems.find(item => item.itemId === itemId),
                  })}
                ></button>
              )}
            </div>
            <div className={accessoryOffer.panel__basicspec}>
              <div className={accessoryOffer.panel__basicspec__data}>
                <div className={accessoryOffer.panel__basicspec__title}>
                  Screen
                </div>
                <div className={accessoryOffer.panel__basicspec__text}>
                  {selectedAccessory?.screen}
                </div>
              </div>
              <div className={accessoryOffer.panel__basicspec__data}>
                <div className={accessoryOffer.panel__basicspec__title}>
                  Resolution
                </div>
                <div className={accessoryOffer.panel__basicspec__text}>
                  {selectedAccessory?.resolution}
                </div>
              </div>
              <div className={accessoryOffer.panel__basicspec__data}>
                <div className={accessoryOffer.panel__basicspec__title}>
                  Processor
                </div>
                <div className={accessoryOffer.panel__basicspec__text}>
                  {selectedAccessory?.processor}
                </div>
              </div>
              <div className={accessoryOffer.panel__basicspec__data}>
                <div className={accessoryOffer.panel__basicspec__title}>
                  RAM
                </div>
                <div className={accessoryOffer.panel__basicspec__text}>
                  {selectedAccessory?.ram}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={accessoryOffer.decription}>
          <h2 className={accessoryOffer.description__header}>About</h2>
          <div className={accessoryOffer.line}></div>
          {selectedAccessory?.description.map(data => (
            <>
              <div className={accessoryOffer.description__title}>
                {data.title}
              </div>
              <div className={accessoryOffer.description__text}>
                {data.text}
              </div>
            </>
          ))}
          <div className={accessoryOffer.line}></div>
        </div>
        <div className={accessoryOffer.techspecs}>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>Screen</div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.screen}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>Resolution</div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.resolution}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>Processor</div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.processor}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>RAM</div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.ram}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>
              Built in memory
            </div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.capacity}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>Camera</div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.camera}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>Zoom</div>
            <div className={accessoryOffer.techspec__text}>
              {selectedAccessory?.zoom}
            </div>
          </div>
          <div className={accessoryOffer.techspec__data}>
            <div className={accessoryOffer.techspec__title}>Cell</div>

            {selectedAccessory?.cell.map(cell => (
              <div className={accessoryOffer.techspec__text} key={cell}>
                {`${cell}, `}
              </div>
            ))}
          </div>
        </div>
        <div className={accessoryOffer.title}>
          <CartPage
            showedProducts={proposedPhones}
            swiperTitle={'You may also like'}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
