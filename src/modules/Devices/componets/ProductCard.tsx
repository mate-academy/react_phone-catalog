import { NavLink, useNavigate } from 'react-router-dom';
import ProductDetailsSlider from './ProductDetailsSlider';
// eslint-disable-next-line max-len
import { useSelectedProduct } from '../../../utils/contexts/SelectedProductContext';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ProductsSlider from '../../../ProductsSlider';
import { getDevices, getDevicesProperties } from '../../../services/device';
import { ProductType } from '../../../types/product';
import { Loader } from './Loader';
import { DeviceType } from '../../../types/deviceType';

export const ProductCard = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    setSelectedColor,
    setSelectedCapacity,
    cartProducts,
    toggleActiveProduct,
    toggleCartProduct,
    activeProducts,
    loading,
    setLoading,
    selectedColor,
    selectedCapacity,
    isError,
    setIsError,
  } = useSelectedProduct();

  const [foundProduct, setFoundProduct] = useState<DeviceType | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);
  const [allDevices, setAllDevices] = useState<ProductType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDevicesProperties(selectedProduct?.category)
      .then(devicesProperties => {
        setFoundProduct(() => {
          let foundDevice = devicesProperties.find(
            (phone: DeviceType) => phone.id === selectedProduct?.itemId,
          );

          if (selectedColor && selectedCapacity) {
            const arr: any = [];

            devicesProperties.forEach((phone: DeviceType) => {
              if (phone.namespaceId === foundDevice.namespaceId) {
                arr.push(phone);
              }
            });

            foundDevice = arr.find((phone: DeviceType) => {
              if (
                phone.color === selectedColor &&
                phone.capacity === selectedCapacity
              ) {
                return true;
              }

              return false;
            });
          }

          return foundDevice;
        });

        getDevices()
          .then(products => {
            setSuggestedProducts(() => {
              const relatedProducts: DeviceType[] = devicesProperties.filter(
                (phone: DeviceType) =>
                  selectedProduct?.itemId.includes(phone.namespaceId),
              );

              const filteredRelatedProducts = products.filter(
                (product: ProductType) =>
                  relatedProducts.some(
                    suggested => product.itemId === suggested.id,
                  ),
              );

              return filteredRelatedProducts;
            });

            setAllDevices(products);
          })
          .catch(() => {
            setIsError(true);
          })
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [selectedColor, selectedCapacity]);

  useEffect(() => {
    if (!foundProduct || allDevices.length === 0) {
      return;
    }

    const matchedProduct = allDevices.find(
      product => product.itemId === foundProduct.id,
    );

    if (matchedProduct) {
      setSelectedProduct(matchedProduct);
    }
  }, [foundProduct, allDevices, setSelectedProduct]);

  const colorHexMap: { [key: string]: string } = {
    rosegold: '#B76E79',
    midnightgreen: '#004953',
    spacegray: '#4B4B4B',
    midnight: '#011635',
    spaceblack: '#323233',
    graphite: '#41424C',
    sierrablue: '#BFDAF7',
    starlight: '#f4edc6',
    // Додайте інші спеціальні кольори тут
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleChangeCapacity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCapacity(event.target.value);
  };

  const handleAddToFavorite = () => {
    toggleActiveProduct(selectedProduct as ProductType); // Виклик через контекст
  };

  const handleAddToCart = () => {
    if (!selectedProduct?.id || selectedProduct?.price === undefined) {
      return;
    }

    const productToAdd: ProductType & { quantity: number } = {
      ...selectedProduct,
      quantity: 1,
      id: selectedProduct.id ?? 0, // fallback для id
      price: selectedProduct.price ?? 0, // fallback для price
    };

    toggleCartProduct(productToAdd); // Виклик через контекст
  };

  const findedId = allDevices.find(
    device => device.itemId === foundProduct?.id,
  );

  return (
    <main className="main-product-card">
      <section className="devices">
        <div className="container">
          {loading && <Loader />}
          {!loading && isError && (
            <h1 className="title--biggest">Something went wrong</h1>
          )}

          {!loading && !isError && !foundProduct && (
            <h1 className="title--biggest">Product was not found</h1>
          )}

          {!loading && !isError && foundProduct && (
            <div className="devices__block">
              <div className="devices__path path">
                <NavLink to="/" className="path__home"></NavLink>
                <span className="path__arrow"></span>

                <NavLink
                  to={`/${foundProduct?.category}`}
                  className="path__type devices__type--active smallText"
                >
                  {foundProduct?.category === 'phones'
                    ? 'Phones'
                    : foundProduct?.category === 'tablets'
                      ? 'Tablets'
                      : foundProduct?.category === 'accessories'
                        ? 'Accessories'
                        : ''}
                </NavLink>
                <span className="path__arrow"></span>
                <a href="" className="path__type smallText">
                  {foundProduct?.name}
                </a>
              </div>
              <div
                className="devices__back back"
                onClick={() => navigate(-1)}
                style={{ cursor: 'pointer' }}
              >
                <span className="back__arrow"></span>
                <span className="back__type smallText">Back</span>
              </div>

              <h2 className="devices__name title title--h2">
                {foundProduct?.name}
              </h2>

              <div className="devices__main-content">
                <div className="devices__slider">
                  {foundProduct && (
                    <ProductDetailsSlider findedProduct={foundProduct} />
                  )}
                </div>

                <div className="devices__main-info">
                  <div className="devices__colors-and-id">
                    <div className="devices__colors">
                      <p className="devices__label devices__label--smaller">
                        Avalaible colors
                        <div className="devices__colors-radio">
                          {foundProduct?.colorsAvailable?.map(
                            (color, index) => (
                              /* eslint-disable-next-line jsx-a11y/label-has-associated-control */
                              <label
                                key={index}
                                className="devices__color-label"
                              >
                                <input
                                  type="radio"
                                  name="color"
                                  value={color}
                                  onChange={handleChange}
                                  className="devices__color"
                                  style={{ display: 'none' }}
                                  checked={foundProduct?.color === color}
                                />
                                <div className="devices__color-indicator">
                                  <span
                                    className=""
                                    style={{
                                      backgroundColor:
                                        colorHexMap[
                                          color.replace(/\s+/g, '')
                                        ] || color.replace(/\s+/g, ''), // Застосовуємо колір з масиву
                                      borderRadius: '50%',
                                      display: 'block',
                                      width: '28px',
                                      height: '28px',
                                    }}
                                  ></span>
                                </div>
                              </label>
                            ),
                          )}
                        </div>
                      </p>
                    </div>
                    <div className="devices__id">
                      <span className="devices__label devices__label--id">
                        {`ID: ${findedId?.id}`}
                      </span>
                    </div>
                  </div>

                  <div className="devices__capacity">
                    <div className="devices__capacities">
                      <label
                        htmlFor=""
                        className="devices__label devices__label--smaller"
                      >
                        Avalaible capacity
                        <div className="devices__capacities-radio">
                          {foundProduct?.capacityAvailable?.map(
                            (capacity, index) => (
                              <label
                                key={index}
                                className="devices__color-label"
                              >
                                <input
                                  type="radio"
                                  name="capacity"
                                  onChange={handleChangeCapacity}
                                  value={capacity}
                                  className="devices__color"
                                  style={{ display: 'none' }}
                                  checked={foundProduct?.capacity === capacity}
                                />
                                <span
                                  className="devices__radio"
                                  style={{
                                    // Застосовуємо колір з масиву
                                    display: 'block',
                                    width: 'auto',
                                    height: '32px',
                                    border: '1px solid #e2e6e9',
                                    cursor: 'pointer',
                                    padding: '0 8px',
                                    fontWeight: '500',
                                    lineHeight: '32px',
                                    borderRadius: '4px',
                                  }}
                                >
                                  {capacity}
                                </span>
                              </label>
                            ),
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <p className="devices__price">
                    {foundProduct?.priceDiscount}
                    <span className="devices__price-fullPrice">
                      {foundProduct?.priceRegular}
                    </span>
                  </p>

                  <div className="devices__buttons">
                    <button
                      className={classNames('addToCart', 'addToCart--bigger', {
                        'addToCart--active': cartProducts.some(
                          product => product.itemId === foundProduct.id,
                        ),
                      })}
                      onClick={handleAddToCart}
                    >
                      {cartProducts.some(
                        product => product.itemId === foundProduct.id,
                      )
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>
                    <button
                      className={classNames(
                        'addToFavourite',
                        'addToFavourite--bigger',
                        {
                          'addToFavourite--active': activeProducts.some(
                            product => product.id === selectedProduct?.id,
                          ),
                        },
                      )}
                      onClick={handleAddToFavorite}
                    ></button>
                  </div>

                  <div className="devices__main-properties">
                    <p className="devices__name-properties smallText">Screen</p>
                    <p
                      className="
                      devices__properties 
                      small-text-700 
                      small-text-700--dark"
                    >
                      {foundProduct?.screen}
                    </p>
                    <p className="devices__name-properties smallText">
                      Resolution
                    </p>
                    <p
                      className="
                      devices__properties 
                      small-text-700 
                      small-text-700--dark"
                    >
                      {foundProduct?.resolution}
                    </p>
                    <p className="devices__name-properties smallText">
                      Processor
                    </p>
                    <p
                      className="
                      devices__properties 
                      small-text-700 
                      small-text-700--dark"
                    >
                      {foundProduct?.processor}
                    </p>
                    <p className="devices__name-properties smallText">RAM</p>
                    <p
                      className="
                      devices__properties 
                      small-text-700 
                      small-text-700--dark"
                    >
                      {foundProduct?.ram}
                    </p>
                  </div>
                </div>

                <div className="devices__about about">
                  <h2 className="about__title title-h3 title-h3--product-card">
                    About
                  </h2>
                  {foundProduct?.description?.map((description, i) => (
                    <div className="about__block block-about" key={i}>
                      <h3 className="about__title-second block-about__title">
                        {description.title}
                      </h3>
                      <div className="block-about__text text-about">
                        {description.text.map((text, j) => (
                          <p
                            className="body-text-600 body-text-600--gray"
                            key={j}
                          >
                            {text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="devices__tech-specs tech-specs">
                  <h2 className="about__title title-h3 title-h3--product-card">
                    Tech specs
                  </h2>
                  <div className="tech-specs__main">
                    <p className="tech-specs__name-properties">Screen</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.screen}
                    </p>
                    <p className="tech-specs__name-properties">Resolution</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.resolution}
                    </p>
                    <p className="tech-specs__name-properties">Processor</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.processor}
                    </p>
                    <p className="tech-specs__name-properties">RAM</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.ram}
                    </p>
                    <p className="tech-specs__name-properties">
                      Built in memory
                    </p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.capacity}
                    </p>
                    <p className="tech-specs__name-properties">Camera</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.camera}
                    </p>
                    <p className="tech-specs__name-properties">Zoom</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.zoom}
                    </p>
                    <p className="tech-specs__name-properties">Cell</p>
                    <p
                      className="
                      tech-specs__properties 
                      body-text-600 
                      body-text-600--black"
                    >
                      {foundProduct?.cell.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {!loading && !isError && foundProduct && (
          <div className="devices__slider-may-also slider-may-also">
            <div className="slider-product">
              <div className="container container--relative">
                <h2 className="slider-may-also__title title">
                  You may also like
                </h2>
                <ProductsSlider
                  products={suggestedProducts}
                  isHotPrices={true}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
