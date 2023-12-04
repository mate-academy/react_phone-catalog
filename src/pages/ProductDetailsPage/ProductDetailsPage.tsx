/* eslint-disable max-len */
import './ProductDetailsPage.scss';
import { useEffect, useState } from 'react';
import {
  Link, useNavigate, useParams,
} from 'react-router-dom';
import { getProductByProductId } from '../../helpers/apis';
import { FetchedProduct } from '../../helpers/types/FetchedProduct';
import { useCartFavorites } from '../../providers/CartFavoritesProvider';
import { YouMayAlsoLike } from '../../components/YouMayAlsoLike/YouMayAlsoLike';
import Loader from '../../components/Loader/Loader';
import { Colors } from '../../helpers/Colors';

export const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<FetchedProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isColorLoading, setIsColorLoading] = useState(false);
  const [isCapacityLoading, setIsCapacityLoading] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  const {
    addToCart, addToFavorites, removeFromCart, removeFromFavorites, state: cartFavoritesState,
  } = useCartFavorites();

  useEffect(() => {
    if (!productId) {
      // eslint-disable-next-line no-console
      console.error('ProductId not found in URL');
      navigate('/404');

      return;
    }

    getProductByProductId(productId)
      .then((fetchedProduct) => {
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setMainImage(fetchedProduct.images[0]);
          setIsLoading(false);
          setIsCapacityLoading(false);
          setIsColorLoading(false);
        } else {
          setIsLoading(false);
          setIsCapacityLoading(false);
          setIsColorLoading(false);
          navigate('/404');
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching product:', error);
        setIsLoading(false);
        navigate('/404');
      });
  }, [navigate, productId]);

  const isInCart = cartFavoritesState.cart.some((item) => item.id === product?.id);
  const isInFavorites = cartFavoritesState.favorites.some((item) => item.id === product?.id);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (product) {
      addToCart(product);
    }
  };

  const handleAddToFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (product) {
      addToFavorites(product);
    }
  };

  const handleRemoveFromCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (product) {
      removeFromCart(product.id);
    }
  };

  const handleRemoveFromFavorites = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (product) {
      removeFromFavorites(product.id);
    }
  };

  return (
    <div className="Parentcontainer">

      {isLoading ? (
        <div className="Productsdetails_loader">
          <Loader style={{ width: '240px', height: '240px' }} />
        </div>
      ) : (
        <div className="Productsdetails">
          {(isColorLoading || isCapacityLoading) && (
            <Loader style={{ width: '40px', height: '40px', margin: 'auto' }} />
          )}
          <div className="Productsdetails_currentpage">

            <Link to="/" className="Productsdetails_currentpage_homelink" />

            <p className="Productsdetails_currentpage_arrow" />

            <Link to="/phones" className="Productsdetails_currentpage_pagename">
              Phones
            </Link>

            <p className="Productsdetails_currentpage_arrow" />

            <p className="Productsdetails_currentpage_title">{product?.name}</p>
          </div>

          <Link to="/phones" className="Productsdetails_backlink">
            <p className="Productsdetails_backlink_arrow" />

            <p className="Productsdetails_backlink_title">Back</p>
          </Link>

          <h1 className="Productsdetails_title">{product?.name}</h1>

          <div className="Productsdetails_phoneinfo">
            <div className="Productsdetails_images">
              <div className="Productsdetails_images_smallimages">
                {product?.images.map((image) => (
                  <div
                    role="button"
                    key={image}
                    tabIndex={0}
                    onClick={() => setMainImage(image)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMainImage(image);
                      }
                    }}
                  >
                    <img
                      key={image}
                      src={BASE_URL + image}
                      alt="imagephone"
                      className={`Productsdetails_images_smallimages_smallimage
                   ${image === mainImage ? 'active' : ''}`}
                    />
                  </div>
                ))}
              </div>

              <img
                src={BASE_URL + mainImage}
                alt="imagephone"
                className="Productsdetails_images_mainimage"
              />
            </div>

            <div className="Productsdetails_availableoptions">
              <div className="Productsdetails_availableoptions_availablecolors">
                <p className="Productsdetails_availableoptions_availablecolors_name">Available colors</p>
                {product?.colorsAvailable.map((color) => {
                  const parts = product.id.split('-');

                  parts[parts.length - 1] = color;
                  const newPath = parts.join('-');

                  return (
                    <Link
                      key={color}
                      to={`/phones/${newPath}`}
                      className={`Productsdetails_availableoptions_availablecolors_colors
                  ${product.color === color ? 'active' : ''}`}
                      style={{ backgroundColor: Colors[color] }}
                      onClick={(e) => {
                        if (product.color !== color) {
                          setIsColorLoading(true);
                        } else {
                          e.preventDefault();
                        }
                      }}
                    />
                  );
                })}
              </div>

              <div className="Productsdetails_availableoptions_line" />

              <div className="Productsdetails_availableoptions_availablecapacity">
                <p className="Productsdetails_availableoptions_availablecapacity_name">
                  Select capacity
                </p>

                <div
                  className="Productsdetails_availableoptions_availablecapacity_capacity"
                >
                  {product?.capacityAvailable.map((capacity) => {
                    const parts = product.id.split('-');
                    const newCapacity = capacity.slice(
                      0, capacity.length - 2,
                    );

                    parts[parts.length - 2] = `${newCapacity}gb`;
                    const newPath = parts.join('-');

                    return (
                      <Link
                        key={capacity}
                        to={`/phones/${newPath}`}
                        className={`Productsdetails_availableoptions_availablecapacity_capacity_each
                    ${product.capacity === capacity ? 'active' : ''}`}
                        onClick={(e) => {
                          if (product.capacity !== capacity) {
                            setIsCapacityLoading(true);
                          } else {
                            e.preventDefault();
                          }
                        }}
                      >
                        {capacity}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="Productsdetails_availableoptions_line" />

              <div className="Productsdetails_availableoptions_prices">
                <h1 className="Productsdetails_availableoptions_prices_new">{`$${product?.priceDiscount}`}</h1>
                <p className="Productsdetails_availableoptions_prices_old">{`$${product?.priceRegular}`}</p>
              </div>

              <div className="Productsdetails_availableoptions_buttons">
                {isInCart ? (
                  <button
                    onClick={handleRemoveFromCart}
                    type="button"
                    className="Productsdetails_availableoptions_buttons_cart-added"
                  >
                    Added to Cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    type="button"
                    className="Productsdetails_availableoptions_buttons_cart"
                  >
                    Add to Cart
                  </button>
                )}

                {isInFavorites ? (
                  <button
                    onClick={handleRemoveFromFavorites}
                    type="button"
                    className="Productsdetails_availableoptions_buttons_fav"
                    aria-label="favbutton-added"
                  >
                    <div className="Productsdetails_availableoptions_buttons_fav_image-added" />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToFavorites}
                    type="button"
                    className="Productsdetails_availableoptions_buttons_fav"
                    aria-label="favbutton"
                  >
                    <div className="Productsdetails_availableoptions_buttons_fav_image" />
                  </button>
                )}
              </div>

              <div className="Productsdetails_availableoptions_caracteristics">
                <div className="Productsdetails_availableoptions_caracteristics_screen">
                  <p className="Productsdetails_availableoptions_caracteristics_screen_name">
                    Screen
                  </p>
                  <p className="Productsdetails_availableoptions_caracteristics_screen_number">
                    {product?.screen}
                  </p>
                </div>

                <div className="Productsdetails_availableoptions_caracteristics_resolution">
                  <p className="Productsdetails_availableoptions_caracteristics_resolution_name">
                    Resolution
                  </p>
                  <p className="Productsdetails_availableoptions_caracteristics_resolution_number">
                    {product?.resolution}
                  </p>
                </div>

                <div className="Productsdetails_availableoptions_caracteristics_processor">
                  <p className="Productsdetails_availableoptions_caracteristics_processor_name">
                    Processor
                  </p>
                  <p className="Productsdetails_availableoptions_caracteristics_processor_number">
                    {product?.processor}
                  </p>
                </div>

                <div className="Productsdetails_availableoptions_caracteristics_ram">
                  <p className="Productsdetails_availableoptions_caracteristics_ram_name">
                    RAM
                  </p>
                  <p className="Productsdetails_availableoptions_caracteristics_ram_number">
                    {product?.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="Productsdetails_moreinformation">
            <div className="Productsdetails_about">
              <h2 className="Productsdetails_about_title">About</h2>

              <div className="Productsdetails_about_line" />

              <div className="Productsdetails_about_first">
                <h3 className="Productsdetails_about_first_title">
                  {product?.description[0].title}
                </h3>
                <p className="Productsdetails_about_first_text">
                  {product?.description[0].text[0]}
                  <span className="Productsdetails_about_first_text_divider" />
                  {product?.description[0].text[1]}
                </p>
              </div>

              <div className="Productsdetails_about_second">
                <h3 className="Productsdetails_about_second_title">
                  {product?.description[1].title}
                </h3>
                <p className="Productsdetails_about_second_text">
                  {product?.description[1].text}
                </p>
              </div>

              <div className="Productsdetails_about_third">
                <h3 className="Productsdetails_about_third_title">
                  {product?.description[2].title}
                </h3>
                <p className="Productsdetails_about_third_text">
                  {product?.description[2].text}
                </p>
              </div>
            </div>

            <div className="Productsdetails_techspecs">
              <h2 className="Productsdetails_techspecs_title">Tech specs</h2>

              <div className="Productsdetails_techspecs_line" />

              <div className="Productsdetails_techspecs_caracteristics">
                <div className="Productsdetails_techspecs_caracteristics_screen">
                  <p className="Productsdetails_techspecs_caracteristics_screen_name">
                    Screen
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_screen_number">
                    {product?.screen}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_resolution">
                  <p className="Productsdetails_techspecs_caracteristics_resolution_name">
                    Resolution
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_resolution_number">
                    {product?.resolution}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_processor">
                  <p className="Productsdetails_techspecs_caracteristics_processor_name">
                    Processor
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_processor_number">
                    {product?.processor}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_ram">
                  <p className="Productsdetails_techspecs_caracteristics_ram_name">
                    RAM
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_ram_number">
                    {product?.ram}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_memory">
                  <p className="Productsdetails_techspecs_caracteristics_memory_name">
                    Built in memory
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_memory_number">
                    {product?.capacity}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_camera">
                  <p className="Productsdetails_techspecs_caracteristics_camera_name">
                    Camera
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_camera_number">
                    {product?.camera}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_zoom">
                  <p className="Productsdetails_techspecs_caracteristics_zoom_name">
                    Zoom
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_zoom_number">
                    {product?.zoom}
                  </p>
                </div>

                <div className="Productsdetails_techspecs_caracteristics_cell">
                  <p className="Productsdetails_techspecs_caracteristics_cell_name">
                    Cell
                  </p>

                  <p className="Productsdetails_techspecs_caracteristics_cell_number">
                    {product?.cell.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {productId && <YouMayAlsoLike productId={productId} />}
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
