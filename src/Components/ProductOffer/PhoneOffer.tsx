import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './ProductOffer.module.scss';
import { useContext, useState } from 'react';
import { CatalogContext } from '../CatalogProvider';
import Slider from 'react-slick';
import classNames from 'classnames';
import { Footer } from '../Footer/Footer';
import { ProductCard } from '../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

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
  const [activeImage, setActiveImage] = useState(false);
  const id = (Math.random() * 100000).toFixed(0);

  const navigate = useNavigate();

  const settings = {
    className: 'productoffer__phoneslider',
    arrows: false,
    dots: true,
    appendDots: (dots: number) => (
      <ul
        style={{
          width: '80px',
          height: '49px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {dots}
      </ul>
    ),
    customPaging: (i: number) => (
      <img
        style={{ width: '51.2px', height: '49px', objectFit: 'contain' }}
        src={selectedPhone?.images[i]}
        onClick={() => setActiveImage(true)}
        className={classNames('productoffer__dot-image', {
          'productoffer__image--active': activeImage,
        })}
      ></img>
    ),
  };

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

  const secondSettings = {
    infinite: false,
    arrows: true,
    className: 'productoffer__proposition',
  };

  return (
    <>
      <Navigation />
      <div className="productoffer">
        <button
          className="productoffer__breadcrumbs--back-button"
          onClick={() => navigate(-1)}
        >
          <div className="productoffer__breadcrumbs--back-arrow"></div> Back
        </button>
        <div className="productoffer__breadcrumbs">
          <Link to="/">
            <div className="productoffer__breadcrumbs--home" />
          </Link>
          <div className="productoffer__breadcrumbs--arrow" />
          <Link className="productoffer__breadcrumbs--text-active" to="/phones">
            <div>Phones</div>
          </Link>
          <div className="productoffer__breadcrumbs--arrow" />
          <div className="productoffer__breadcrumbs--text">{itemId}</div>
        </div>
        <h1 className="productoffer__title">{selectedPhone?.name}</h1>
        <div className="productoffer__images">
          <Slider {...settings}>
            {selectedPhone?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="productoffer__sliderimage"
              />
            ))}
          </Slider>
        </div>
        <div className="productoffer__panel">
          <div className="productoffer__panel--id-and-title">
            <h2 className="productoffer__panel--title">Available colors</h2>
            <div className="productoffer__panel--id-number">{`ID: ${id}`}</div>
          </div>
          <div className="productoffer__panel--colors">
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
                    'productoffer__panel--color-selection',
                    {
                      'productoffer__panel--color-selection--selected':
                        selectedColor === color ||
                        color === selectedPhone.color,
                    },
                  )}
                  style={{ backgroundColor: `${color}` }}
                ></button>
              );
            })}
          </div>
          <div className="productoffer__line"></div>
          <div className="productoffer__panel--capacity-title">
            Select capacity
          </div>
          {selectedPhone?.capacityAvailable.map(capacity => {
            const getSelectedCapacity = (currentCapacity: string) => {
              if (currentCapacity.toLowerCase() === capacity.toLowerCase()) {
                setSelectedCapacity(currentCapacity);

                navigate(
                  `/phones/${selectedPhone.namespaceId}-${currentCapacity.toLowerCase()}-${selectedPhone.color}`,
                );
              }
            };

            return (
              <button
                className={classNames('productoffer__panel--capacity-option', {
                  'productoffer__panel--capacity-option-selected':
                    selectedCapacity === capacity ||
                    capacity === selectedPhone.capacity,
                })}
                key={capacity}
                onClick={() => getSelectedCapacity(capacity)}
              >
                {capacity}
              </button>
            );
          })}
          <div className="productoffer__line"></div>
          <div className="productoffer__panel--prices">
            <div className="productoffer__panel--price">{`$${selectedPhone?.priceDiscount}`}</div>
            <del className="productoffer__panel--price-discount">{`$${selectedPhone?.priceRegular}`}</del>
          </div>
          <div className="productoffer__panel--buttons">
            {selectedProduct && (
              <button
                className="productoffer__panel--adding-button"
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
                className={classNames('productoffer__panel--heart-button', {
                  'productoffer__panel--heart-button--is-active':
                    favouriteItems.find(item => item.itemId === itemId),
                })}
              ></button>
            )}
          </div>
          <div className="productoffer__panel--basicspec">
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">Screen</div>
              <div className="productoffer__panel--basicspec-text">
                {selectedPhone?.screen}
              </div>
            </div>
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">
                Resolution
              </div>
              <div className="productoffer__panel--basicspec-text">
                {selectedPhone?.resolution}
              </div>
            </div>
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">
                Processor
              </div>
              <div className="productoffer__panel--basicspec-text">
                {selectedPhone?.processor}
              </div>
            </div>
            <div className="productoffer__panel--basicspec-data">
              <div className="productoffer__panel--basicspec-title">RAM</div>
              <div className="productoffer__panel--basicspec-text">
                {selectedPhone?.ram}
              </div>
            </div>
          </div>
        </div>
        <div className="productoffer__description">
          <h2 className="productoffer__description--header">About</h2>
          <div className="productoffer__line"></div>
          {selectedPhone?.description.map(data => (
            <>
              <div className="productoffer__description--title">
                {data.title}
              </div>
              <div className="productoffer__description--text">{data.text}</div>
            </>
          ))}
          <div className="productoffer__line"></div>
        </div>
        <div className="productoffer__techspecs">
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Screen</div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.screen}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Resolution</div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.resolution}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Processor</div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.processor}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">RAM</div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.ram}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">
              Built in memory
            </div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.capacity}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Camera</div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.camera}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Zoom</div>
            <div className="productoffer__techspecs--text">
              {selectedPhone?.zoom}
            </div>
          </div>
          <div className="productoffer__techspecs--data">
            <div className="productoffer__techspecs--title">Cell</div>

            {selectedPhone?.cell.map(cell => (
              <div className="productoffer__techspecs--text" key={cell}>
                {`${cell}, `}
              </div>
            ))}
          </div>
        </div>
        <div className="productoffer__slider">
          <div className="productoffer__slider--header">You may also like</div>

          <Slider {...secondSettings}>
            {proposedPhones.map(proposedPhone => (
              <ProductCard key={proposedPhone.id} product={proposedPhone} />
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
};
