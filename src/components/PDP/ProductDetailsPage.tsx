import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Accessories, ProductChars } from '../../types';
import { Header } from '../HomePage/Header/HeaderComponent';
import { Footer } from '../Footer/Footer';
import { TransitionComponent } from '../main/Transition/TransitionComponent';
import { CardComponent } from '../main/CardComponent/CardComponent';
import { DeviceProps, useDevices } from '../../context/DeviceProvider';
import { COLORS } from '../../colors';
import { CuteLoader } from '../loader/CuteLoader';
import {
  nextSlide,
  previousSlide,
} from '../main/CardComponent/slider_function';
import styles from './productsDetails.module.scss';
import cardStyles from '.././main/CardComponent/card.module.scss';
import row from '../HomePage/Welcome/productSlider.module.scss';
import buttom from '../HomePage/Welcome/homeface.module.scss';
import classNames from 'classnames';

type Device = ProductChars | Accessories;

export const ProductDetailsPage: React.FC = () => {
  const [items, setItems] = useState<Device | null>(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Device[]>([]);
  const { addToCart } = useDevices();
  const { addToFavorites } = useDevices();
  const [isLoading, setIsloading] = useState(true);
  const [favorites, setFavorites] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleFavButton = (device: DeviceProps) => {
    const newFavoriteState = !favorites;

    setFavorites(newFavoriteState);
    localStorage.setItem(
      `favorites:${items?.id}`,
      JSON.stringify(newFavoriteState),
    );
    addToFavorites(device);
  };

  const handleAddToCart = (device: DeviceProps) => {
    const newAddingState = !isAdding;

    setIsAdding(newAddingState);
    localStorage.setItem(
      `isAdding_${items?.id}`,
      JSON.stringify(newAddingState),
    );
    addToCart(device);
  };

  useEffect(() => {
    const savedIsAdding = localStorage.getItem(`isAdding_${items?.id}`);

    if (savedIsAdding) {
      setIsAdding(JSON.parse(savedIsAdding));
    }
  }, [items?.id]);

  useEffect(() => {
    const favoriteDevice = localStorage.getItem(`favorites:${items?.id}`);

    if (favoriteDevice) {
      setFavorites(JSON.parse(favoriteDevice));
    }
  }, [items?.id]);

  const isSelectCapacity = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? styles.product_char_capacity_active
      : styles.product_char_capacity;

  const isSelectColor = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.product_char_color_active : styles.product_char_color;

  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();

  const { phones } = useDevices();
  const { tablets } = useDevices();
  const { accessories } = useDevices();

  const totalSlides = relatedProducts.length;

  const findByCapacity = (
    namespaceId: string,
    color: string,
    cap: string,
    categories: string,
  ) => {
    let foundItems;

    switch (categories) {
      case 'phones':
        foundItems = phones.find(
          item =>
            item.id === namespaceId &&
            item.color === color &&
            item.capacity === cap,
        );
        break;
      case 'tablet':
        foundItems = tablets.find(
          item =>
            item.id === namespaceId &&
            item.color === color &&
            item.capacity === cap,
        );
        break;
      case 'accessories':
        foundItems = accessories.find(
          item =>
            item.id === namespaceId &&
            item.color === color &&
            item.capacity === cap,
        );
        break;
      default:
        break;
    }

    if (foundItems) {
      setItems(foundItems);
    }
  };

  useEffect(() => {
    const filterItem = (id: string) => {
      const foundItem =
        category === 'phones'
          ? phones.find(device => device.id === id)
          : category === 'tablets'
            ? tablets.find(device => device.id === id)
            : category === 'accessories'
              ? accessories.find(device => device.id === id)
              : null;

      if (foundItem !== undefined) {
        setItems(foundItem || null);
      }

      if (foundItem) {
        const fetchRelatedProducts = () => {
          let products: Device[] = [];

          switch (category) {
            case 'phones':
              products = phones.filter(device => device.id !== id);
              break;
            case 'tablets':
              products = tablets.filter(device => device.id !== id);
              break;
            case 'accessories':
              products = accessories.filter(device => device.id !== id);
              break;
            default:
              break;
          }

          const shuffleArray = (array: Device[]) => {
            return array.sort(() => Math.random() - 0.5);
          };

          const randomProducts = shuffleArray(products).slice(0, 10);

          setRelatedProducts(randomProducts);
        };

        fetchRelatedProducts();
      }
    };

    if (itemId) {
      filterItem(itemId);
      window.scrollTo(0, 0);
    }

    setIsloading(false);

    return;
  }, [itemId, phones, tablets, accessories, category]);

  if (isLoading) {
    return <CuteLoader />;
  }

  if (!items) {
    return <img src="img/page-not-found.png" alt="not_found" />;
  }

  const handleCapacityClick = (capacity?: string, color?: string) => {
    const effectiveCapacity = capacity ?? items.capacity;
    const effectiveColor = color ?? items.color;

    findByCapacity(
      items.namespaceId,
      effectiveColor,
      effectiveCapacity,
      items.category,
    );
  };

  return (
    <>
      <Header />

      <div className={styles.product_title}>
        <TransitionComponent filter={category} itemName={items.name} />

        <NavLink to={`/${category}`} className={styles.product_back}>
          <span>
            <img
              className={styles.product_back_vector}
              src="img/Vector_left.svg"
              alt="vector"
            />
            <span className={styles.product_back_text}>Back</span>
          </span>
        </NavLink>

        <div>
          <h1 className={styles.product_h1}>{items.name}</h1>
        </div>

        <div className={styles.product_titlecontainer}>
          <div className={styles.product_container}>
            <div className={styles.product_carousel_container}>
              <div className={styles.product_carousel}>
                {items.images.map((img, index) => (
                  <img
                    src={img}
                    alt={`Image ${index}`}
                    key={index}
                    className={
                      selectedImage === index ? `${styles.active}` : ''
                    }
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>

              <div className={styles.product_mainimg}>
                <img
                  src={items.images[selectedImage]}
                  alt=""
                  className={styles.product_img}
                />
              </div>
            </div>

            <div className={styles.product_char}>
              <div>
                <span className={cardStyles.card_stats_left}>
                  Available colors
                </span>
                <div className={styles.product_char_capacity_container}>
                  {items.colorsAvailable.map((color, index) => (
                    <NavLink
                      to={`/${category}/${items.namespaceId}-${items.capacity.toLocaleLowerCase()}-${color.replace(/\s+/g, '-')}`}
                      key={index}
                      className={isSelectColor}
                      onClick={() => handleCapacityClick(items.capacity, color)}
                    >
                      <div
                        className={styles.product_char_capacity_colors}
                        style={{
                          backgroundColor:
                            COLORS[
                              color.replace(/\s+/g, '') as keyof typeof COLORS
                            ],
                        }}
                      ></div>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <span className={cardStyles.card_stats_left}>
                  Select capacity
                </span>
                <div className={styles.product_char_capacity_container}>
                  {items.capacityAvailable.map((cap, index) => (
                    <NavLink
                      to={`/${category}/${items.namespaceId}-${cap.toLocaleLowerCase()}-${items.color.replace(/\s+/g, '-')}`}
                      key={index}
                      className={isSelectCapacity}
                      onClick={() => handleCapacityClick(cap, items.color)}
                    >
                      {cap}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div>
                <div className={styles.product_price}>
                  <h2 className={styles.product_price_text}>
                    {`$${items.priceRegular}`}
                  </h2>

                  <h2
                    className={styles.product_price_sale}
                  >{`$${items.priceDiscount}`}</h2>
                </div>

                <div className={cardStyles.card_buy_container}>
                  <button
                    className={classNames(cardStyles.card_buy_button, {
                      [cardStyles.card_buy_button_active]: isAdding,
                    })}
                    onClick={() => handleAddToCart(items)}
                  >
                    Add to card
                  </button>
                  <button
                    className={cardStyles.card_follow_button}
                    onClick={() => handleFavButton(items)}
                  >
                    {favorites ? (
                      <img
                        className={classNames(styles.card_follow_button_un)}
                        src="./img/Heart_Like.svg"
                        alt="heart"
                      />
                    ) : (
                      <img
                        className={classNames(styles.card_follow_button_un)}
                        src="./img/Vector(Heart).svg"
                        alt="heart"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className={cardStyles.card_stats}>
                <div className={cardStyles.card_stats_text}>
                  <span className={cardStyles.card_stats_left}>screen</span>
                  <span className={cardStyles.card_stats_right}>
                    {items.screen}
                  </span>
                </div>

                <div className={cardStyles.card_stats_text}>
                  <span className={cardStyles.card_stats_left}>resolution</span>
                  <span className={cardStyles.card_stats_right}>
                    {items.resolution}
                  </span>
                </div>

                <div className={cardStyles.card_stats_text}>
                  <span className={cardStyles.card_stats_left}>capacity</span>
                  <span className={cardStyles.card_stats_right}>
                    {items.capacity}
                  </span>
                </div>

                <div className={cardStyles.card_stats_text}>
                  <span className={cardStyles.card_stats_left}>ram</span>
                  <span className={cardStyles.card_stats_right}>
                    {items.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.product_info}>
          <div className={styles.product_info_about}>
            <h2 className={styles.product_info_title}>About</h2>
            {items.description.map((item, index) => (
              <>
                <div key={index} className={styles.product_info_about_title}>
                  {item.title}
                </div>

                <div className={styles.product_info_about_text}>
                  {item.text[0]}
                </div>

                {item.text[1] && (
                  <div className={styles.product_info_about_text}>
                    {item.text[1]}
                  </div>
                )}
              </>
            ))}
          </div>

          <div className={styles.product_info_tech}>
            <h2 className={styles.product_info_title}>Tech specs</h2>

            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>screen</div>
              <div className={styles.product_info_tech_right}>
                {items.screen}
              </div>
            </div>
            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>resolution</div>
              <div className={styles.product_info_tech_right}>
                {items.resolution}
              </div>
            </div>
            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>processor</div>
              <div className={styles.product_info_tech_right}>
                {items.processor}
              </div>
            </div>
            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>ram</div>
              <div className={styles.product_info_tech_right}>{items.ram}</div>
            </div>
            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>camera</div>
              <div className={styles.product_info_tech_right}>
                {'camera' in items ? items.camera : ''}
              </div>
            </div>
            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>zoom</div>
              <div className={styles.product_info_tech_right}>
                {'zoom' in items ? items.zoom : ''}
              </div>
            </div>
            <div className={styles.product_info_tech_container}>
              <div className={styles.product_info_tech_left}>cell</div>
              <div className={styles.product_info_tech_right}>
                {items.cell.join(', ')}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.product_carousel_slider}>
            <div>
              <h2 className={styles.product_h1}>You may also like</h2>
            </div>

            <div className={row.slider_buttons}>
              <button
                className={classNames(buttom.product_slide_buttons)}
                onClick={() => previousSlide({ currentSlide, setCurrentSlide })}
              >
                &lt;
              </button>

              <button
                className={classNames(buttom.product_slide_buttons)}
                onClick={() =>
                  nextSlide({ currentSlide, setCurrentSlide, totalSlides })
                }
              >
                &gt;
              </button>
            </div>
          </div>

          <div className={row.slider_container}>
            <div
              className={row.slider_card}
              style={{
                transform: `translateX(calc(-${currentSlide * 25}%))`,
              }}
            >
              {relatedProducts.map(product => (
                <CardComponent key={product.id} devices={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
