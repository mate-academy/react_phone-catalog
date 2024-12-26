import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigation as Nav } from '../Navigation/Navigation';
import tabletOffer from './ProductOffer.module.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import classNames from 'classnames';
import { Footer } from '../Footer/Footer';
import { Product } from '../types/Product';
import { CartPage } from '../CartPage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export const TabletsOffer = () => {
  const {
    tablets,
    products,
    favouriteItems,
    setFavouriteItems,
    addedItems,
    setAddedItems,
    totalModels,
    setTotalModels,
    totalPrice,
    setTotalPrice,
    setProducts,
  } = useContext(CatalogContext);
  const { itemId } = useParams();
  const selectedTablet = tablets.find(tablet => tablet.id === itemId);
  const selectedProduct = products.find(product => product.itemId === itemId);
  const proposedTablets = products.filter(
    product =>
      product.category === 'tablets' &&
      product.capacity === selectedTablet?.capacity,
  );
  const [selectedColor, setSelectedColor] = useState(selectedTablet?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedTablet?.capacity,
  );
  const id = (Math.random() * 100000).toFixed(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
      addedItem.itemId === itemId &&
      addedItems.find(item => item.id === addedItem.id)
    ) {
      const updateItem = addedItems.filter(item => item.id !== addedItem.id);

      if (selectedProduct) {
        setTotalModels(totalModels - selectedProduct?.amountOfModels);
        setAddedItems(updateItem);
        setTotalPrice(
          totalPrice - selectedProduct?.amountOfModels * addedItem.price,
        );
      }
    }

    if (
      addedItem.itemId === itemId &&
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
      <div className={tabletOffer.productoffer}>
        <button
          className={tabletOffer.breadcrumbs__backbutton}
          onClick={() => navigate(-1)}
        >
          <div className={tabletOffer.breadcrumbs__backarrow}></div> Back
        </button>
        <div className={tabletOffer.breadcrumbs}>
          <Link to="/">
            <div className={tabletOffer.breadcrumbs__home} />
          </Link>
          <div className={tabletOffer.breadcrumbs__arrow} />
          <Link className={tabletOffer.breadcrumbs__textactive} to="/phones">
            <div>Tablets</div>
          </Link>
          <div className={tabletOffer.breadcrumbs__arrow} />
          <div className={tabletOffer.breadcrumbs__text}>{itemId}</div>
        </div>
        <h1 className={tabletOffer.title}>{selectedTablet?.name}</h1>
        <div className={tabletOffer.containerONTABLET}>
          <div className="container__swipers">
            <div className="container">
              <Swiper
                className={tabletOffer.images}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={true}
                loop={true}
                spaceBetween={100}
                thumbs={{ swiper: thumbsSwiper }}
              >
                {selectedTablet?.images.map((image, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={image} className={tabletOffer.image} />
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
                className={tabletOffer.navImages}
              >
                {selectedTablet?.images.map((image, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={image} className={tabletOffer.navImage} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          <div className={tabletOffer.panel}>
            <div className={tabletOffer.panel__id_and_title}>
              <h2 className={tabletOffer.panel__title}>Available colors</h2>
              <div className={tabletOffer.panel__idnumber}>{`ID: ${id}`}</div>
            </div>
            <div className={tabletOffer.panel__colors}>
              {selectedTablet?.colorsAvailable.map(color => {
                const getSelectedColor = (currentColor: string) => {
                  if (color === currentColor) {
                    setSelectedColor(currentColor);

                    navigate(
                      `/tablets/${selectedTablet.namespaceId}-${selectedTablet.capacity.toLowerCase()}-${currentColor}`,
                    );
                  }
                };

                return (
                  <button
                    key={color}
                    onClick={() => getSelectedColor(color)}
                    className={classNames([tabletOffer.panel__colorselection], {
                      [tabletOffer.panel__colorselectionselected]:
                        selectedColor === color ||
                        color === selectedTablet.color,
                    })}
                    style={{ backgroundColor: `${color}` }}
                  ></button>
                );
              })}
            </div>
            <div className={tabletOffer.line}></div>
            <div className={tabletOffer.panel__capacity_title}>
              Select capacity
            </div>
            {selectedTablet?.capacityAvailable.map(capacity => {
              const getSelectedCapacity = (currentCapacity: string) => {
                if (currentCapacity.toLowerCase() === capacity.toLowerCase()) {
                  setSelectedCapacity(currentCapacity);

                  navigate(
                    `/tablets/${selectedTablet.namespaceId}-${currentCapacity.toLowerCase()}-${selectedTablet.color}`,
                  );
                }
              };

              return (
                <button
                  className={classNames([tabletOffer.panel__capacity_option], {
                    [tabletOffer.panel__capacity_optionselected]:
                      selectedCapacity === capacity ||
                      capacity === selectedTablet.capacity,
                  })}
                  key={capacity}
                  onClick={() => getSelectedCapacity(capacity)}
                >
                  {capacity}
                </button>
              );
            })}
            <div className={tabletOffer.line}></div>
            <div className={tabletOffer.panel__prices}>
              <div
                className={tabletOffer.panel__price}
              >{`$${selectedTablet?.priceDiscount}`}</div>
              <del
                className={tabletOffer.panel__pricediscount}
              >{`$${selectedTablet?.priceRegular}`}</del>
            </div>
            <div className={tabletOffer.panel__buttons}>
              {selectedProduct && (
                <button
                  className={tabletOffer.panel__adding_button}
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
                  className={classNames([tabletOffer.panel__heartbutton], {
                    [tabletOffer.panel__heartbutton_isactive]:
                      favouriteItems.find(item => item.itemId === itemId),
                  })}
                ></button>
              )}
            </div>
            <div className={tabletOffer.panel__basicspec}>
              <div className={tabletOffer.panel__basicspec__data}>
                <div className={tabletOffer.panel__basicspec__title}>
                  Screen
                </div>
                <div className={tabletOffer.panel__basicspec__text}>
                  {selectedTablet?.screen}
                </div>
              </div>
              <div className={tabletOffer.panel__basicspec__data}>
                <div className={tabletOffer.panel__basicspec__title}>
                  Resolution
                </div>
                <div className={tabletOffer.panel__basicspec__text}>
                  {selectedTablet?.resolution}
                </div>
              </div>
              <div className={tabletOffer.panel__basicspec__data}>
                <div className={tabletOffer.panel__basicspec__title}>
                  Processor
                </div>
                <div className={tabletOffer.panel__basicspec__text}>
                  {selectedTablet?.processor}
                </div>
              </div>
              <div className={tabletOffer.panel__basicspec__data}>
                <div className={tabletOffer.panel__basicspec__title}>RAM</div>
                <div className={tabletOffer.panel__basicspec__text}>
                  {selectedTablet?.ram}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={tabletOffer.decription}>
          <h2 className={tabletOffer.description__header}>About</h2>
          <div className={tabletOffer.line}></div>
          {selectedTablet?.description.map(data => (
            <>
              <div className={tabletOffer.description__title}>{data.title}</div>
              <div className={tabletOffer.description__text}>{data.text}</div>
            </>
          ))}
          <div className={tabletOffer.line}></div>
        </div>
        <div className={tabletOffer.techspecs}>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Screen</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.screen}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Resolution</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.resolution}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Processor</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.processor}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>RAM</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.ram}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Built in memory</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.capacity}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Camera</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.camera}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Zoom</div>
            <div className={tabletOffer.techspec__text}>
              {selectedTablet?.zoom}
            </div>
          </div>
          <div className={tabletOffer.techspec__data}>
            <div className={tabletOffer.techspec__title}>Cell</div>

            {selectedTablet?.cell.map(cell => (
              <div className={tabletOffer.techspec__text} key={cell}>
                {`${cell}, `}
              </div>
            ))}
          </div>
        </div>
        <div className={tabletOffer.title}>
          <CartPage
            showedProducts={proposedTablets}
            swiperTitle={'You may also like'}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
