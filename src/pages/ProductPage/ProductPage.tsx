import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import cn from 'classnames';
import { CardProduct, Product } from '../../types/Product';
import { getProduct, getProducts } from '../../api/api';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ProductDetails } from '../../types/ProductDetails';
import { Loader } from '../../components/Loader/Loader';
import { SmallLoader } from '../../components/SmallLoader/SmallLoader';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from '../../utils/LocalStorage';

const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductPage: React.FC = () => {
  const {
    cart,
    favorite,
    setCart,
    setFavorite,
    addToFavorite,
  } = useContext(PhoneCatalogContext);

  const [selectedItem, setSelectedItem] = useState<ProductDetails>();
  const [productsFromServer, setProductsFromServer] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [isFavoriteItem, setIsFavoriteItem] = useState<boolean>(false);
  const [isProductLoaded, setIsProductLoaded] = useState<boolean>(true);
  const [productError, setProductError] = useState<string>('');

  const navigate = useNavigate();

  const { productId } = useParams();

  const findSelectedProduct = (products: Product[]) => {
    const selectedProduct = products
      .find(product => product.phoneId === productId);

    return selectedProduct || null;
  };

  const isProductInCart = cart.some((item) => item.phoneId === productId);

  useEffect(() => {
    const storedCart = getDataFromLocalStorage('cart');
    const storedFavorite = getDataFromLocalStorage('favorite');

    setCart(storedCart);
    setFavorite(storedFavorite);
  }, []);

  useEffect(() => {
    setDataToLocalStorage('cart', cart);
  }, [cart]);

  useEffect(() => {
    setDataToLocalStorage('favorite', favorite);
  }, [favorite]);

  useEffect(() => {
    setIsFavoriteItem(favorite
      .some((favProduct) => favProduct.phoneId === productId));
  }, [favorite]);

  const [isAdded, setIsAdded] = useState(false);

  const addToCart = (p: Product, event: React.MouseEvent) => {
    const cartProduct: CardProduct = { ...p, quantity: 1 };
    const findItemIndex = cart.findIndex((item) => item.id === p.id);

    event.stopPropagation();

    if (findItemIndex !== -1) {
      const updatedCart = [...cart];

      updatedCart.splice(findItemIndex, 1);
      setCart(updatedCart);
      setDataToLocalStorage('cart', updatedCart);
      setIsAdded(false);
    } else {
      setCart((prev) => [...prev, cartProduct]);
      setDataToLocalStorage('cart', [...cart, cartProduct]);
      setIsAdded(true);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async (id: string) => {
      setIsProductLoaded(false);
      try {
        const product = await getProduct(id);

        setSelectedItem(product);
        setSelectedPhoto(product.images[0]);
        setIsProductLoaded(true);
      } catch (error) {
        setProductError(`Error fetching ${productId} details`);
        setIsProductLoaded(false);
      }
    };

    if (productId) {
      fetchProductDetails(productId);
    } else {
      navigate('/');
    }
  }, [productId, navigate]);

  useEffect(() => {
    setIsLoaded(true);

    getProducts()
      .then((products) => {
        setIsLoaded(false);

        setProductsFromServer(products);

        const shuffledProducts = products.sort(() => Math.random() - 0.5);

        const selectedSuggestedProducts = shuffledProducts.slice(0, 8);

        setSuggestedProducts(selectedSuggestedProducts);
      });
  }, [productId]);

  const goBack = () => {
    navigate(-1);
  };

  const handleImageClick = (image: string) => {
    setSelectedPhoto(image);
  };

  const handleCapacityChange = (capacity: string) => {
    const newUrl = `/phones/${selectedItem?.namespaceId}-${capacity.toLowerCase()}-${selectedItem?.color.toLowerCase()}`;

    navigate(newUrl);
  };

  const handleColorChange = (color: string) => {
    const newUrl = `/phones/${selectedItem?.namespaceId}-${selectedItem?.capacity.toLowerCase()}-${color.toLowerCase()}`;

    navigate(newUrl);
  };

  if (productError) {
    return (
      <div className="productsPage">
        <div className="productsPage__error bold">{productError}</div>
      </div>
    );
  }

  return (
    <div className="productPage">
      <div className="productPage__nav">
        <Link to="/" className="productPage__nav__home" />
        <div className="arrow arrow-right" />
        <Link to="/phones" className="productPage__nav__subtitle">Phones</Link>
        <div className="arrow arrow-right" />
        {isProductLoaded ? (
          <div className="productPage__nav__title">{selectedItem?.name}</div>
        ) : (
          <div className="productPage__nav__title">
            <SmallLoader />
          </div>
        )}
      </div>
      <div className="productPage__back">
        <div className="arrow arrow-left--disabled arrow-left--hovered" />
        <div
          className="productPage__back__text"
          role="button"
          tabIndex={0}
          onClick={goBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              goBack();
            }
          }}
        >
          Back
        </div>
      </div>
      {isProductLoaded && selectedItem ? (
        <>
          <div className="productPage__title h1 primary-color">
            {selectedItem?.name}
          </div>
          <div className="productPage__details">
            <div className="grid-container">
              <div className="productPage__details__photos">
                {selectedItem?.images.map(image => {
                  return (
                    <div
                      className={cn('productPage__details__photos__image', {
                        productPage__details__photos__image__selected:
                          selectedPhoto === image,
                      })}
                      key={image}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleImageClick(image)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Space') {
                          handleImageClick(image);
                        }
                      }}
                    >
                      <img
                        src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
                        alt="img"
                        className="productPage__details__photos__img"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="productPage__details__selectedImage">
                <img
                  src={`${API_URL}${selectedPhoto}`}
                  alt="selected-img"
                  className="productPage__details__selectedImg"
                />
              </div>
              <div className="productPage__details__specs">
                <div className="productPage__details__specs__colors">
                  <div className="
                  productPage__details__specs__colors__text
                  small-text"
                  >
                    Avaliable colors
                  </div>
                  <div className="productPage__details__specs__colors__block">
                    {selectedItem?.colorsAvailable.map((item) => (
                      <button
                        type="button"
                        className={cn(
                          'productPage__details__specs__colors__block__button',
                          {
                            // eslint-disable-next-line
                            productPage__details__specs__colors__block__button__active:
                              `${selectedItem.namespaceId}-${selectedItem.capacity.toLowerCase()}-${item}` === productId,
                          },
                        )}
                        onClick={() => handleColorChange(item)}
                      >
                        <div
                          className={`productPage__details__specs__colors__block__color ${item}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="productPage__details__specs__capacity">
                  <div className="
                  productPage__details__specs__capacity__text
                  small-text"
                  >
                    Avaliable capacity
                  </div>
                  <div className="productPage__details__specs__capacity__block">
                    {selectedItem?.capacityAvailable.map((item) => (
                      <button
                        type="button"
                        className={cn(
                          // eslint-disable-next-line
                          'productPage__details__specs__capacity__block__button',
                          {
                            // eslint-disable-next-line
                            productPage__details__specs__capacity__block__button__active:
                              `${selectedItem.namespaceId}-${item.toLowerCase()}-${selectedItem.color}` === productId,
                          },
                        )}
                        onClick={() => handleCapacityChange(item)}
                      >
                        <div
                          className="
                          productPage__details__specs__capacity__block__text
                          buttons-text
                          normal"
                        >
                          {item}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="productPage__details__specs__price">
                  <span className="productPage__details__specs__price__discounted h1 bold primary-color">{`$${selectedItem?.priceDiscount}`}</span>
                  <span className="productPage__details__specs__price__regular">{`$${selectedItem?.priceRegular}`}</span>
                </div>
                <div className="productPage__details__specs__buttons">
                  <button
                    type="button"
                    className={
                      cn('productPage__details__specs__buttons__cart',
                        {
                          productPage__details__specs__buttons__cart__added:
                            isAdded || isProductInCart,
                        })
                    }
                    onClick={(event) => {
                      const selectedProduct = findSelectedProduct(
                        productsFromServer,
                      );

                      if (selectedProduct) {
                        addToCart(selectedProduct, event);
                      }
                    }}
                  >
                    <div className="
                    productPage__details__specs__buttons__cart__text
                    buttons-text
                    medium"
                    >
                      Add to cart
                    </div>
                  </button>
                  <button
                    type="button"
                    className="productPage__details__specs__buttons__favorite"
                    onClick={(event) => {
                      const selectedProduct = findSelectedProduct(
                        productsFromServer,
                      );

                      if (selectedProduct) {
                        addToFavorite(selectedProduct, event);
                      }
                    }}
                  >
                    <div className={cn(
                      'productPage__details__specs__buttons__favorite__icon',
                      'icon',
                      {
                        favoriteSelected: isFavoriteItem,
                        favorite: !isFavoriteItem,
                      },
                    )}
                    />
                  </button>
                </div>
                <ul className="productPage__details__specs__block">
                  <li className="
                  productPage__details__specs__block__item
                  secondary-color"
                  >
                    Screen
                    <span className="primary-color">
                      {selectedItem?.screen}
                    </span>
                  </li>
                  <li className="
                  productPage__details__specs__block__item
                  secondary-color"
                  >
                    Resolution
                    <span className="primary-color">
                      {selectedItem?.resolution}
                    </span>
                  </li>
                  <li className="
                  productPage__details__specs__block__item
                  secondary-color"
                  >
                    Processor
                    <span className="primary-color">
                      {selectedItem?.processor}
                    </span>
                  </li>
                  <li className="productPage__details__specs__block__item
                  secondary-color"
                  >
                    RAM
                    <span className="primary-color">
                      {selectedItem?.ram}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="productPage__details__about">
                <div className="
                productPage__details__about__title
                h2
                bold
                primary-color"
                >
                  About
                </div>
                {selectedItem?.description.map((item) => (
                  <div className="productPage__details__about__block">
                    <div className="
                    productPage__details__about__block__subtitle
                    h3
                    medium
                    primary-color"
                    >
                      {item.title}
                    </div>
                    <div className="
                    productPage__details__about__block__description
                    body-text
                    normal
                    secondary-color"
                    >
                      <p className="body-text">{item.text[0]}</p>
                      <p className="body-text">{item.text[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="productPage__details__techSpecs">
                <div className="
                productPage__details__techSpecs__title
                h2
                bold
                primary color"
                >
                  Tech specs
                </div>
                <ul className="productPage__details__techSpecs__block">
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    Screen
                    <span className="primary-color body-text">
                      {selectedItem?.screen}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    Resolution
                    <span className="primary-color body-text">
                      {selectedItem?.resolution}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    Processor
                    <span className="primary-color body-text">
                      {selectedItem?.processor}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    RAM
                    <span className="primary-color body-text">
                      {selectedItem?.ram}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    Built in memory
                    <span className="primary-color body-text">
                      {selectedItem?.capacity}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    Camera
                    <span className="primary-color body-text">
                      {selectedItem?.camera}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text"
                  >
                    Zoom
                    <span className="primary-color body-text">
                      {selectedItem?.zoom}
                    </span>
                  </li>
                  <li className="
                  productPage__details__techSpecs__block__item
                  secondary-color
                  body-text
                  "
                  >
                    Cell
                    <span>
                      {selectedItem.cell.map((item, index) => (
                        <span key={item} className="primary-color body-text">
                          {`${item}${index === selectedItem.cell.length - 1 ? '' : ', '}`}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ProductSlider
            products={suggestedProducts}
            name="You may also like"
            isLoaded={isLoaded}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
