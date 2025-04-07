import React, { useEffect, useState } from 'react';
import styles from './ProductDetails.module.scss';
import phones from '../../../public/api/phones.json';
import products from '../../../public/api/products.json';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { TitleAndButtonSlider } from '../TitleAndButtonSlider/TitleAndButtonSlider';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  productId?: string;
  disabledIds: number[];
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  category: Phone[];
};

export const ProductDetails: React.FC<Props> = ({
  productId,
  disabledIds,
  setDisabledIds,
  category,
}) => {
  const categoryName = category[0].category;
  const product = category.find(product_ => product_.id === productId);
  const [activeProduct, setActiveProduct] = useState(product);
  const [image, setImage] = useState(activeProduct?.images[0]);
  const [activeColor, setActiveColor] = useState<string | undefined>(
    activeProduct?.colorsAvailable[0],
  );
  const [activeCapacity, setActiveCapacity] = useState<string | undefined>(
    activeProduct?.capacity,
  );
  const [clicked, setClicked] = useState(false);
  const techDetails = {
    Screen: 'screen',
    Resolution: 'resolution',
    Processor: 'processor',
    RAM: 'ram',
    'Built in memory': 'capacity',
    Camera: 'camera',
    Zoom: 'zoom',
    Cell: 'cell',
  } as Record<string, keyof Phone>;

  const navigate = useNavigate();
  const { search } = useLocation();
  const { productId: productIdFromUrl } = useParams();
  const productIdtext = products.find(
    product_ => product_.itemId === product?.id,
  );

  const handleChangeColor = (color: string) => {
    const newProduct = category.find(
      item =>
        activeProduct?.namespaceId === item.namespaceId &&
        activeProduct.capacity === item.capacity &&
        item.color === color,
    );

    if (newProduct) {
      setActiveColor(color);
      setActiveProduct(newProduct);
      setImage(newProduct.images[0]);
      navigate(`/${categoryName}/${newProduct.id}`);
    }
  };

  const handleBackButton = () => {
    navigate({ pathname: '..', search });
  };

  const handleCapacityChange = (capacity: string) => {
    const newProduct = category.find(
      product_ =>
        product_.capacity === capacity &&
        activeProduct?.namespaceId === product_.namespaceId,
    );

    if (newProduct) {
      setActiveCapacity(capacity);
      setActiveProduct(newProduct);
      navigate(`/${categoryName}/${newProduct.id}`);
    }
  };

  const getTechValue = (key: keyof Phone) => {
    const value = activeProduct?.[key];
    return Array.isArray(value) ? value.join(', ') : (value ?? 'N/A');
  };

  useEffect(() => {
    const productActive = category.find(_phone => _phone.id === productIdFromUrl);

    if (productActive) {
      setActiveColor(productActive.color);
      setActiveProduct(productActive);
      setImage(productActive.images[0]);
      setActiveCapacity(productActive.capacity);
      window.scrollTo({ top: 0 });
    }
  }, [navigate]);

  return (
    <>
      <div className={`${styles.details_main_container}`}>
        <div className={`${styles.details_path_container}`}>
          <img
            src="./img/icons/home-icon.svg"
            alt="home icon"
            className={`${styles.details_header_icon}`}
          />
          <img
            src="./img/icons/main-disabled-arrow.svg"
            alt="right arrow"
            className={`${styles.details_header_icon}`}
          />
          <p className={`${styles.details_path} ${styles.dark_gray}`}>{categoryName}</p>
          <img
            src="./img/icons/main-disabled-arrow.svg"
            alt="right arrow"
            className={`${styles.details_header_icon}`}
          />
          <p className={`${styles.details_path}`}>{activeProduct?.name}</p>
        </div>

        <div
          className={`${styles.details_back_container}`}
          onClick={handleBackButton}
        >
          <img
            src="./img/icons/main-default-arrow.svg"
            alt="left arrow"
            className={`${styles.details_back_icon}`}
          />
          <p className={`${styles.details_back_text}`}>Back</p>
        </div>
        <h1 className={`${styles.details_header}`}>{activeProduct?.name}</h1>
        <div className={`${styles.details_main_info_container}`}>
          <img
            src={image}
            alt="phone image"
            className={`${styles.details_main_image}`}
          />

          <div className={`${styles.details_slider_image_container}`}>
            {activeProduct?.images.map((img, id) => {
              return (
                <div
                  className={classNames(
                    `${styles.details_slider_image_wrapper}`,
                    {
                      [styles.details_active_image]: img === image,
                    },
                  )}
                  key={id}
                  onClick={() => setImage(img)}
                >
                  <img
                    src={img}
                    alt="phone image"
                    className={`${styles.details_slider_image}`}
                  />
                </div>
              );
            })}
          </div>
          <div className={`${styles.details_controls_container}`}>
            <div className={`${styles.details_available_header_container}`}>
              <p className={`${styles.details_available_header}`}>
                Available colors
              </p>
              {productIdtext && (
                <p
                  className={`${styles.details_available_id}`}
                >{`ID: ${productIdtext.id}`}</p>
              )}
            </div>
            <div className={`${styles.details_available_colors_container}`}>
              {activeProduct?.colorsAvailable.map((color, id) => {
                return (
                  <div
                    className={classNames(`${styles.details_color_wrapper}`, {
                      [styles.details_active_color]: activeColor === color,
                    })}
                    style={{ backgroundColor: color }}
                    key={id}
                    onClick={() => handleChangeColor(color)}
                  ></div>
                );
              })}
            </div>

            <hr className={`${styles.details_line}`} />

            <div className={`${styles.details_capacity_container}`}>
              <p className={`${styles.details_capacity_text}`}>
                Select capacity
              </p>
              <div className={`${styles.details_capacity_amount_cont}`}>
                {activeProduct?.capacityAvailable.map((capacity, id) => {
                  return (
                    <div
                      key={id}
                      className={classNames(
                        `${styles.details_capacity_amount_wrapper}`,
                        {
                          [styles.activeCapacity]: activeCapacity === capacity,
                        },
                      )}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      <p className={`${styles.details_capacity_amount}`}>
                        {capacity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className={`${styles.details_line} ${styles.margin_bot_32}`} />

            <div className={`${styles.price_wrapper}`}>
              <h2
                className={`${styles.price}`}
              >{`$${activeProduct?.priceRegular}`}</h2>
              <h2
                className={`${styles.oldPrice}`}
              >{`$${activeProduct?.priceDiscount}`}</h2>
            </div>

            <div className={classNames(`${styles.buttons_container}`)}>
              <button
                className={classNames(`${styles.button} ${styles.button_add}`)}
              >
                Add to cart
              </button>
              <button
                className={`${styles.button} ${styles.button_like}`}
                onClick={() => (clicked ? setClicked(false) : setClicked(true))}
              >
                <img
                  src={
                    clicked
                      ? './img/icons/card-selected-like.svg'
                      : './img/icons/card-default-like.svg'
                  }
                  alt="like button"
                />
              </button>
            </div>

            <div className={classNames(`${styles.phone_charact_container}`)}>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>Screen</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activeProduct?.screen}
                </p>
              </div>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>Resolution</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activeProduct?.resolution}
                </p>
              </div>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>Processor</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activeProduct?.processor}
                </p>
              </div>
              <div className={classNames(`${styles.phone_charact}`)}>
                <p className={`${styles.phone_charact_parag}`}>RAM</p>
                <p
                  className={`${styles.phone_charact_parag} ${styles.char_value}`}
                >
                  {activeProduct?.ram}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.details_main_descr_container}`}>
          <div className={`${styles.details_descr_container}`}>
            <div className={`${styles.details_descr_wrapper}`}>
              <h3 className={`${styles.details_descr_title}`}>About</h3>
              <hr className={`${styles.details_line} ${styles.margin_0}`} />
            </div>
            {activeProduct?.description.map((descr, id) => {
              return (
                <div className={`${styles.details_descr_wrapper}`} key={id}>
                  <h2 className={`${styles.details_descr_title}`}>
                    {descr.title}
                  </h2>
                  <p className={`${styles.details_descr_text}`}>{descr.text}</p>
                </div>
              );
            })}
          </div>

          <div className={`${styles.details_tech_container}`}>
            <h3 className={`${styles.details_descr_title}`}>Tech specs</h3>
            <hr className={`${styles.details_line} ${styles.margin_bot_16}`} />
            {Object.entries(techDetails).map(([label, productKey], id) => {
              return (
                <div
                  className={classNames(
                    `${styles.phone_charact} ${styles.tech_charact}`,
                  )}
                  key={id}
                >
                  <p
                    className={`${styles.phone_charact_parag} ${styles.tech_charact_parag}`}
                  >
                    {label}
                  </p>
                  <p
                    className={`${styles.phone_charact_parag}
                  ${styles.tech_charact_parag} ${styles.char_value}
                  ${styles.tech_char_value}`}
                  >
                    {getTechValue(productKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <TitleAndButtonSlider
          disabledIds={disabledIds}
          setDisabledIds={setDisabledIds}
          title={'You may also like'}
          startId={7}
          endId={8}
          containerId={'scroll_container_also_like'}
        />

        <div
          className={`${styles.details_scroll_container}`}
          id="scroll_container_also_like"
        >
          {category.map(productItem=> (
            <ProductCard
              key={productItem.id}
              product={productItem}
              category={`${categoryName}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
