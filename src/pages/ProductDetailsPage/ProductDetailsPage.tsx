import { Link, useParams } from 'react-router-dom';
import './ProductDetailsPage.scss';
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { BASE_URL, getCurrentProduct, getSuggestedProducts } from '../../api';
import { Loader } from '../../components/Loader';
import { ProductDetails } from '../../type/ProductDetails';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../type/Product';
import { Back } from '../../components/Back';
import { CartContext } from '../../components/CartContext/CartContext';
import { Message } from '../../type/Message';
import { NoProduct } from '../../components/NoProduct';
import { OrderedProduct } from '../../type/OrderedProduct';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const selectedId = productId || '';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentItem, setCurrentItem] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [recommendedItems, setRecommendedItems] = useState<Product[] | []>([]);

  const {
    orderedProducts,
    setOrderedProducts,
    setMessage,
    favoriteProducts,
    setFavoriteProducts,
    products,
  } = useContext(CartContext);

  const toggleColorProduct = (product: string | undefined, color: string) => {
    if (product) {
      const arrayParameters = product.split('-').slice(0, -1);

      arrayParameters.push(color);

      return arrayParameters.join('-');
    }

    return '';
  };

  const toggleCapacityProduct = (
    product: string | undefined,
    capacity: string,
  ) => {
    if (product) {
      const arrayParameters = product.split('-');

      arrayParameters.splice(-2, 1, capacity.toLocaleLowerCase());

      return arrayParameters.join('-');
    }

    return '';
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getCurrentProduct(selectedId)
      .then(setCurrentItem)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));

    getSuggestedProducts()
      .then(setRecommendedItems);
  }, [selectedId]);

  const isProductOrdered = (
    listProducts: OrderedProduct[],
    product: ProductDetails,
  ) => listProducts.some(item => item.product === product.name);

  const isFavoriteProduct = (
    listProducts: Product[],
    product: ProductDetails,
  ) => listProducts.some(item => item.name === product.name);

  const handleAddProductToCart = () => {
    // setIsSelected(!isSelected);
    if (currentItem) {
      const isProductInCart = isProductOrdered(orderedProducts, currentItem);

      setMessage(isProductInCart ? Message.DeleteProduct : Message.AddProduct);

      setOrderedProducts(items => {
        return isProductInCart
          ? items.filter(item => item.product !== currentItem.name)
          : [
            ...items,
            {
              id: items.reduce((max, item) => (
                item.id > max ? item.id : max
              ), 0) + 1,
              quantity: 1,
              product: currentItem.name,
            },
          ];
      });
    }
  };

  const handleAddProductToFavorites = () => {
    const currentProduct = products.find(
      item => item.name === currentItem?.name,
    );

    if (currentProduct) {
      const isProductInFavorites = favoriteProducts.some(
        item => item.id === currentProduct.id,
      );

      setMessage(isProductInFavorites ? Message.Dislike : Message.Like);

      setFavoriteProducts(items => {
        return (isProductInFavorites && currentProduct)
          ? items.filter(item => item.id !== currentProduct.id)
          : [...items, currentProduct];
      });
    }
  };

  return (
    <div className="container">
      <div className="product-details">
        <section className="page__section">
          <Breadcrumbs name={currentItem?.name} />
        </section>
        <Back />
        {isLoading && <Loader />}

        {isError && (
          <NoProduct />
        )}

        {!isLoading && !isError && currentItem && (
          <>
            <section className="product-details__section page__section ">
              <h1 className="product-details__product-name">
                {currentItem.name}
              </h1>
            </section>

            <section className="product-details__section page__section">
              <div className="product-details__grid">
                <ul className="product-details__small-photo-block">
                  {currentItem.images.map(photo => (
                    <li className="product-details__photo-item" key={photo}>
                      <button
                        type="button"
                        className={cn('product-details__button', {
                          'product-details__button--selected':
                            selectedImage !== ''
                              ? selectedImage === photo
                              : currentItem.images[0] === photo,
                        })}
                        onClick={() => setSelectedImage(photo)}
                      >
                        <img
                          className="product-details__button-photo"
                          src={BASE_URL + photo}
                          alt={`${currentItem.name}`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="product-details__big-photo-block">
                  <img
                    className="product-details__big-photo"
                    src={`${BASE_URL}${selectedImage !== '' ? selectedImage : currentItem.images[0]}`}
                    alt={`${currentItem.name}`}
                  />
                </div>
                <div className="product-details__info-block">
                  <div className="product-details__info-container">
                    <div className="product-details__info-container-selectors">
                      <p className="product-details__parameter-name">
                        Available colors
                      </p>
                      <ul className="product-details__parameters-container">
                        {currentItem.colorsAvailable.map(color => (
                          <li
                            className="product-details__parameter-item"
                            key={color}
                          >
                            <Link
                              className={cn(
                                `product-details__color--${color} product-details__color-link`, {
                                  'product-details__color-link--selected':
                                    currentItem.color === color,
                                },
                              )}
                              to={`../${toggleColorProduct(productId, color)}`}
                              aria-label={`${color}`}
                              onClick={() => setSelectedImage('')}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="product-details__info-container-selectors">
                      <p className="product-details__parameter-name">
                        Select capacity
                      </p>
                      <ul className="product-details__parameters-container">
                        {currentItem.capacityAvailable.map(capacityProduct => (
                          <li
                            className="product-details__parameter-item"
                            key={capacityProduct}
                          >
                            <Link
                              className={cn(
                                'product-details__capacity-link', {
                                  'product-details__capacity-link--selected':
                                    currentItem.capacity === capacityProduct,
                                },
                              )}
                              to={`../${toggleCapacityProduct(productId, capacityProduct)}`}
                              aria-label={`${capacityProduct}`}
                              onClick={() => setSelectedImage('')}
                            >
                              {capacityProduct}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="product-details__info-container">
                    {
                      currentItem.priceRegular - currentItem.priceDiscount > 0
                        ? (
                          <div className="product-details__prices">
                            <div className="
                              product-details__price
                              product-details__price--sale
                             "
                            >
                              {`$${currentItem.priceDiscount}`}
                            </div>
                            <div className="
                              product-details__price
                              product-details__price--full
                            "
                            >
                              {`$${currentItem.priceRegular}`}
                            </div>
                          </div>
                        ) : (
                          <div className="product-details__prices">
                            <div className="
                              product-details__price
                              product-details__price--sale
                            "
                            >
                              {`$${currentItem.priceRegular}`}
                            </div>
                          </div>
                        )
                    }

                    <div className="product-details__buttons">
                      <button
                        type="button"
                        className={cn('product-details__add-to-cart', {
                          'product-details__add-to-cart--selected':
                            isProductOrdered(orderedProducts, currentItem),
                        })}
                        onClick={handleAddProductToCart}
                      >
                        {isProductOrdered(orderedProducts, currentItem)
                          ? 'Added to cart'
                          : 'Add to cart'}
                      </button>

                      <button
                        type="button"
                        className="product-details__favourite"
                        onClick={handleAddProductToFavorites}
                      >
                        <span
                          aria-label="Heart Like"
                          className={cn('icon', {
                            'icon--favourites':
                              !isFavoriteProduct(favoriteProducts, currentItem),
                            'icon--favourites-filled':
                              isFavoriteProduct(favoriteProducts, currentItem),
                          })}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="product-details__info-container">
                    <div className="product-details__info">
                      <p className="product-details__info-title">
                        Screen
                      </p>
                      <p className="product-details__info-text">
                        {currentItem.screen}
                      </p>
                    </div>

                    <div className="product-details__info">
                      <p className="product-details__info-title">
                        Resolution
                      </p>
                      <p className="product-details__info-text">
                        {currentItem.resolution}
                      </p>
                    </div>

                    <div className="product-details__info">
                      <p className="product-details__info-title">
                        Processor
                      </p>
                      <p className="product-details__info-text">
                        {currentItem.processor}
                      </p>
                    </div>
                    <div className="product-details__info">
                      <p className="product-details__info-title">
                        RAM
                      </p>
                      <p className="product-details__info-text">
                        {currentItem.ram}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </section>
            <section
              className="product-details__section page__section"
              data-cy="productDescription"
            >
              <div className="product-details__grid">
                <div className="product-details__about-block">
                  <h2 className="product-details__title-block">
                    About
                  </h2>
                  <ul className="product-details__about-list">
                    {currentItem.description.map(description => (
                      <li
                        className="product-details__about-item"
                        key={description.title}
                      >
                        <h3 className="product-details__about-title">
                          {description.title}
                        </h3>
                        <p className="product-details__about-text">
                          {description.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-details__tech-block">
                  <h2 className="
                    product-details__title-block
                    product-details__title-block--tech
                  "
                  >
                    Tech specs
                  </h2>

                  <ul className="product-details__tech-list">
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Screen
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.screen}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Resolution
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.resolution}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Processor
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.processor}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        RAM
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.ram}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Built in memory
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.capacity}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Camera
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.camera}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Zoom
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.zoom}
                      </p>
                    </li>
                    <li className="product-details__tech-item">
                      <p className="product-details__tech-title">
                        Cell
                      </p>
                      <p className="product-details__tech-text">
                        {currentItem.cell}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="product-details__section page__section">
              <ProductsSlider
                title="You may also like"
                products={recommendedItems}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};
