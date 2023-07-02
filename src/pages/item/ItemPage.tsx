import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import './ItemPage.scss';

import { useFavsContext }
  from '../../context/favouritesContext/FavoritesContext';

import { useCartContext } from '../../context/cartContext/CartContext';

import { addToCart, getCart, removeFromCart } from '../../helpers/Cart';
import Loader from '../../components/loader/Loader';
import NoResults from '../../components/noResults/NoResults';
import ProductSlider from '../../components/slider/ProductSlider';
import { Product, ProductDetails } from '../../types/Product';

import {
  removeFromFavourites,
  addToFavourites,
  getFavourites,
} from '../../helpers/Favourites';

import { getProductById, getProducts } from '../../helpers/Requests';

import { ReactComponent as Home } from '../../icons/Home.svg';

import { ReactComponent as ArrowLeft }
  from '../../icons/Chevron (Arrow Left).svg';

import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';

import { ReactComponent as AddToFavourites }
  from '../../icons/Favourites (Heart Like).svg';

import { ReactComponent as Like }
  from '../../icons/Favourites Filled (Heart Like).svg';

const ItemPage: React.FC = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddedToFav, setIsAddedToFav] = useState(false);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const { itemId } = useParams();
  const { setAddedToCart } = useCartContext();
  const { setAddedToFavs } = useFavsContext();

  const newColorUrl = itemId?.split('-').slice(0, -1).join('-');
  const newCapacityUrl = useCallback((capacity: string) => (
    itemId?.split('-').map(item => (
      item.includes('gb')
        ? capacity.toLowerCase()
        : item
    )).join('-')
  ), [itemId]);

  const updateIsAddedState = () => {
    const updatedCart = getCart();
    const updatedIsAdded = updatedCart.some(item => (
      item.product.id === currentProduct?.id
    ));

    setIsAdded(updatedIsAdded);

    if (updatedIsAdded) {
      localStorage.setItem(`isAdded_${currentProduct?.id}`, 'true');
    } else {
      localStorage.removeItem(`isAdded_${currentProduct?.id}`);
    }
  };

  const updateIsAddedToFavs = () => {
    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs.some(item => (
      item.id === currentProduct?.id
    ));

    setIsAddedToFav(updatedIsAddedToFavs);

    if (updatedIsAddedToFavs) {
      localStorage.setItem(`isAddedToFavs_${currentProduct?.id}`, 'true');
    } else {
      localStorage.removeItem(`isAddedToFavs_${currentProduct?.id}`);
    }
  };

  const getProductsFromServer = async () => {
    try {
      const fetchedProducts = await getProducts();
      const current = fetchedProducts.find(item => item.itemId === itemId);

      setProducts(fetchedProducts);

      if (current) {
        setCurrentProduct(current);
      }
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const getProductFromServer = async () => {
    try {
      if (itemId) {
        const fetchedProduct = await getProductById(itemId);

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (!currentProduct) {
      return;
    }

    const productToAdd = {
      product: currentProduct,
      quantity: 1,
    };

    if (isAdded) {
      removeFromCart(productToAdd);
      setAddedToCart(prev => prev - 1);
    } else {
      addToCart(productToAdd);
      setAddedToCart(prev => prev + 1);
    }

    const updatedCart = getCart();
    const updatedIsAdded = updatedCart.some(item => (
      item.product.id === currentProduct.id
    ));

    setIsAdded(updatedIsAdded);
    updateIsAddedState();
  };

  const handleAddToFavourites = () => {
    if (!currentProduct) {
      return;
    }

    if (isAddedToFav) {
      removeFromFavourites(currentProduct);
      setAddedToFavs(prev => prev - 1);
    } else {
      addToFavourites(currentProduct);
      setAddedToFavs(prev => prev + 1);
    }

    const updatedFavs = getFavourites();
    const updatedIsAddedToFavs = updatedFavs.some(item => (
      item.id === currentProduct?.id
    ));

    setIsAddedToFav(updatedIsAddedToFavs);
    updateIsAddedToFavs();
  };

  useEffect(() => {
    getProductFromServer();
  }, [itemId]);

  useEffect(() => {
    getProductsFromServer();

    const storedIsAdded = localStorage.getItem(`isAdded_${currentProduct?.id}`);

    if (storedIsAdded) {
      setIsAdded(storedIsAdded === 'true');
    }
  }, []);

  useEffect(() => {
    updateIsAddedState();
    updateIsAddedToFavs();
  }, [itemId]);

  if (notFound) {
    return <NoResults title="Phone" />;
  }

  return (
    <section className="item-card">
      <div
        className="item-nav"
        data-cy="breadCrumbs"
      >
        <Link to="/">
          <Home className="item-nav-icon" />
        </Link>

        <ArrowRight className="item-nav-icon" />

        <Link to="/phones">
          <span className="item-nav-page">Phones</span>
        </Link>

        <ArrowRight className="item-nav-icon" />

        <span className="item-nav-page">
          {product?.name}
        </span>
      </div>

      <button
        className="item-nav"
        data-cy="backButton"
        type="button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="item-nav-icon" />
        <div className="item-nav-page">
          Back
        </div>
      </button>

      {isLoading
        ? <Loader />
        : (
          <>
            <h2 className="title">
              {product?.name}
            </h2>

            <div className="content">
              <div className="content-left">
                <div className="content-images">
                  <div className="images-left">
                    {product?.images.map(image => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => handleSelectImage(image)}
                      >
                        <img
                          className="img-left"
                          src={`/_new/${image}`}
                          alt={product.name}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="images-right">
                    <img
                      className="img"
                      src={`/_new/${selectedImage}`}
                      alt="iphone 11 pro max gold"
                    />
                  </div>
                </div>

                <h3 className="content-title">About</h3>

                <div className="content-devider" />

                {product?.description.map(item => (
                  <div
                    key={item.title}
                    className="content-description"
                    data-cy="productDescription"
                  >
                    <h4 className="description-title">{item.title}</h4>

                    <p className="description">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="content-right">
                <div className="options">
                  <div className="options-info">
                    <div className="options-select">
                      <div className="options-label">
                        Available colors
                      </div>

                      <div className="container-select">
                        {product?.colorsAvailable.map(color => (
                          <Link
                            key={color}
                            to={`/phones/${newColorUrl}-${color}`}
                            className={classNames('color-wrapper', {
                              'color-wrapper-selected': product.color === color,
                            })}
                          >
                            <div className={`color ${color}`} />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="content-devider content-devider-right" />

                    <div className="options-select">
                      <div className="options-label">
                        Select capacity
                      </div>

                      <div className="container-select">
                        {product?.capacityAvailable.map(capacity => (
                          <Link
                            to={`/phones/${newCapacityUrl(capacity)}`}
                            key={capacity}
                            className={classNames('capacity', {
                              'capacity-selected': itemId
                                ?.includes(capacity.toLowerCase()),
                            })}
                          >
                            {capacity}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="content-devider" />

                    <div className="container-cart">
                      <div className="price">
                        <span className="price-actual">
                          {`$${product?.priceDiscount}`}
                        </span>
                        <span className="price-discount">
                          {`$${product?.priceRegular}`}
                        </span>
                      </div>

                      <div className="container-button">
                        {isAdded
                          ? (
                            <button
                              className="button-add is-button-active"
                              type="button"
                              onClick={handleAddToCart}
                            >
                              Added to cart
                            </button>
                          ) : (
                            <button
                              className="button-add"
                              type="button"
                              onClick={handleAddToCart}
                            >
                              Add to cart
                            </button>
                          )}

                        <button
                          type="button"
                          data-cy="addToFavorite"
                          className="button-favourites"
                          onClick={handleAddToFavourites}
                        >
                          {isAddedToFav
                            ? <Like />
                            : <AddToFavourites />}
                        </button>
                      </div>
                    </div>

                    <div className="specs">
                      <div className="specs-title">
                        <div className="options-label">Screen</div>
                        <div className="options-label">Resolution</div>
                        <div className="options-label">Processor</div>
                        <div className="options-label">RAM</div>
                      </div>

                      <div className="specs-values">
                        <div className="options-label">
                          {product?.screen}
                        </div>

                        <div className="options-label">
                          {product?.resolution}
                        </div>

                        <div className="options-label">
                          {product?.processor}
                        </div>

                        <div className="options-label">
                          {product?.ram}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="options-label options-id">
                    {`ID: ${product?.namespaceId}`}
                  </div>
                </div>

                <h3 className="content-title">Tech specs</h3>

                <div className="content-devider content-devider-right" />

                <div className="specs">
                  <div className="specs-lables">
                    <div className="specs-label">Screen</div>
                    <div className="specs-label">Resolution</div>
                    <div className="specs-label">Processor</div>
                    <div className="specs-label">RAM</div>
                    <div className="specs-label">Built in memory</div>
                    <div className="specs-label">Camera</div>
                    <div className="specs-label">Zoom</div>
                    <div className="specs-label">Cell</div>
                  </div>

                  <div className="specs-values">
                    <div className="specs-label value">
                      {product?.screen}
                    </div>

                    <div className="specs-label value">
                      {product?.resolution}
                    </div>

                    <div className="specs-label value">
                      {product?.processor}
                    </div>

                    <div className="specs-label value">
                      {product?.ram}
                    </div>

                    <div className="specs-label value">
                      {product?.capacity}
                    </div>

                    <div className="specs-label value">
                      {product?.camera}
                    </div>

                    <div className="specs-label value">
                      {product?.zoom}
                    </div>

                    <div className="specs-label value">
                      {product?.cell.join(' ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductSlider
              slider="item"
              title="You may also like"
              products={products}
            />
          </>
        )}
    </section>
  );
};

export default ItemPage;
