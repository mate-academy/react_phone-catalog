/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import './ProductDetails.scss';
import { CategoryHeader } from '../CategoryHeader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import {
  fetchAccessories,
  fetchPhones,
  fetchProducts,
  fetchTablets,
} from '../../api';
import { DeviceType } from '../../types/DeviceType';
import { ButtonCard } from '../ButtonCard/ButtonCard';
import { ProductSpec } from '../ProductSpec';
import classNames from 'classnames';
import { Carousel } from '../Carousel';
import { Card } from '../Card';
import { CarouselProvider } from '../Carousel/CarouselContext';
import { colorMap } from '../../utils/colorMap';

export const ProductDetails = () => {
  const { category, productId } = useParams<{
    category: 'phones' | 'tablets' | 'accessories';
    productId?: string;
  }>();

  const [device, setDevice] = useState<ProductType | DeviceType | null>(null);
  const [productIdFromJson, setProductIdFromJson] = useState<
    string | number | null
  >(null);

  const [relatedProducts, setRelatedProducts] = useState<DeviceType[]>([]);

  const [selectImage, setSelectImage] = useState(0);
  const [selectColor, setSelectColor] = useState('');
  const [selectCapacity, setSelectCapacity] = useState('');

  const navigate = useNavigate();

  const handleSelectColor = (color: string) => {
    if (!device || !productId || selectColor === color) {
      return;
    }

    const decodedProductId = decodeURIComponent(productId);
    const currentColor = device.color.replace(/\s+/g, '-');
    const newColor = color.toLowerCase().replace(/\s+/g, '-');

    const regex = new RegExp(`\\b${currentColor}\\b`, 'i');
    const newProductId = decodedProductId
      .replace(regex, newColor)
      .replace(/\s+/g, '-');

    if (newProductId !== decodedProductId) {
      setSelectColor(color);
      navigate(`/${category}/${newProductId}`);
    }
  };

  const handleSelectCapacity = (capacity: string) => {
    if (!device || !productId || selectCapacity === capacity) {
      return;
    }

    const regex = new RegExp(`${device.capacity}`, 'i');
    const newProductId = productId.replace(regex, capacity.toLowerCase());

    if (newProductId !== productId) {
      setSelectCapacity(capacity);
      navigate(`/${category}/${newProductId}`);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let foundProduct: DeviceType | ProductType | null = null;

        const [phones, tablets, accessories, products] = await Promise.all([
          fetchPhones(),
          fetchTablets(),
          fetchAccessories(),
          fetchProducts(),
        ]);

        let categoryProducts: DeviceType[] = [];

        switch (category) {
          case 'phones':
            categoryProducts = phones;
            break;

          case 'tablets':
            categoryProducts = tablets;
            break;

          case 'accessories':
            categoryProducts = accessories;
            break;

          default:
            categoryProducts = [];
        }

        foundProduct =
          categoryProducts.find(item => item.id === productId) || null;

        setDevice(foundProduct || null);

        if (foundProduct) {
          const matchedProduct = products.find(
            p => p.itemId === foundProduct.id,
          );

          setProductIdFromJson(matchedProduct ? matchedProduct.id : null);

          const similarProducts = categoryProducts.filter(
            item =>
              item.id !== foundProduct.id &&
              'namespaceId' in item &&
              'namespaceId' in foundProduct &&
              item.namespaceId === foundProduct.namespaceId,
          );

          setRelatedProducts(similarProducts);
        } else {
          setProductIdFromJson(null);
          setRelatedProducts([]);
        }
      } catch (error) {
        setDevice(null);
        setProductIdFromJson(null);
        setRelatedProducts([]);
      }
    };

    loadProducts();
  }, [category, productId]);

  useEffect(() => {
    if (device) {
      setSelectColor(device.color || '');
      setSelectCapacity(device.capacity || '');
    }
  }, [device]);

  return (
    <section className="product-details">
      {category && (
        <CategoryHeader category={category} categoryTitle={device?.name} />
      )}

      {!device ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="product-details__main">
            <div className="product-details__main-image">
              {'images' in device ? (
                <>
                  <img
                    src={device.images[selectImage]}
                    alt={device.name}
                    className="product-details__main-image--general"
                  />

                  <div className="product-details__main-image--block">
                    {device.images.map((image, index) => (
                      <img
                        className={classNames(
                          'product-details__main-image--block-item',
                          { 'image-active': selectImage === index },
                        )}
                        key={index}
                        src={image}
                        alt={`${device.name} ${index}`}
                        onClick={() => setSelectImage(index)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img src={device.image} alt={device.name} />
              )}
            </div>

            <div className="product-details__main-info text text__body">
              {'colorsAvailable' in device && (
                <div className="product-details__main-info--colors">
                  <div className="product-details__main-info--colors-text text__body--small">
                    <p className="product-details__main-info--colors-text--desc text text__body--small">
                      Available colors
                    </p>

                    <p className="product-details__main-info--colors-text--desc position text text__body--small">
                      ID:
                      {productIdFromJson}
                    </p>
                  </div>

                  <div className="product-details__main-info--colors-content">
                    {device.colorsAvailable.map(color => (
                      <div
                        key={color}
                        className={classNames(
                          'product-details__main-info--colors-content--block',
                          { 'color-active': selectColor === color },
                        )}
                        onClick={() => handleSelectColor(color)}
                      >
                        <span
                          className="product-details__main-info--colors-content--block-item"
                          key={color}
                          style={{
                            backgroundColor:
                              colorMap[color.toLowerCase()] || color,
                          }}
                        ></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {'capacityAvailable' in device && (
                <div className="product-details__main-info--capacity">
                  <p className="product-details__main-info--capacity-text text text__body--small">
                    Select capacity
                  </p>

                  <div className="product-details__main-info--capacity-content">
                    {device.capacityAvailable.map(capacity => (
                      <span
                        key={capacity}
                        className={classNames(
                          'product-details__main-info--capacity-content--item',
                          {
                            'capacity-active': selectCapacity === capacity,
                          },
                        )}
                        onClick={() => handleSelectCapacity(capacity)}
                      >
                        {capacity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-details__main-info--price">
                {'priceRegular' in device && (
                  <p className="text__title">${device.priceDiscount}</p>
                )}

                {'priceDiscount' in device && (
                  <p className="product-details__main-info--price-discount">
                    ${device.priceRegular}
                  </p>
                )}
              </div>

              <ButtonCard details={true} product={device} />

              {device &&
                'screen' in device &&
                'resolution' in device &&
                'processor' in device &&
                'ram' in device && (
                  <ProductSpec
                    screen={device.screen}
                    resolution={device.resolution}
                    processor={device.processor}
                    ram={device.ram}
                    details={false}
                  />
                )}
            </div>
          </div>

          <div className="product-details__text">
            <div className="product-details__text-about">
              <h2 className="product-details__text-about--title text">About</h2>

              {'description' in device &&
                device.description.map(({ title, text }, index) => (
                  <div
                    key={index}
                    className="product-details__text-about--description"
                  >
                    <h3 className="product-details__text-about--description-title text">
                      {title}
                    </h3>
                    <p className="product-details__text-about--description-content text text__body">
                      {text}
                    </p>
                  </div>
                ))}
            </div>

            <div className="product-details__text-spec">
              <h2 className="product-details__text-spec--title text">
                Tech specs
              </h2>

              {device && (
                <ProductSpec
                  screen={'screen' in device ? device.screen : ''}
                  resolution={'resolution' in device ? device.resolution : ''}
                  processor={'processor' in device ? device.processor : ''}
                  ram={'ram' in device ? device.ram : ''}
                  capacity={'capacity' in device ? device.capacity : ''}
                  camera={'camera' in device ? device.camera : ''}
                  zoom={'zoom' in device ? device.zoom : ''}
                  cell={'cell' in device ? device.cell : []}
                  details={true}
                />
              )}
            </div>
          </div>

          <div className="product-details__bottom">
            <h2 className="product-details__bottom-title text text__title--basic">
              You may also like
            </h2>

            <CarouselProvider isInProductDetails={true}>
              <Carousel>
                {category &&
                  relatedProducts.map(product => (
                    <Card
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      image={product.images[0]}
                      price={product.priceDiscount}
                      fullPrice={product.priceRegular}
                      screen={product.screen}
                      capacity={product.capacity}
                      ram={product.ram}
                      category={category}
                    />
                  ))}
              </Carousel>
            </CarouselProvider>
          </div>
        </>
      )}
    </section>
  );
};
