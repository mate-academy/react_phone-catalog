import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { HeadingLevel } from '../../types/HeadingLevel';
import { Title } from '../../components/Title';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/Product';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { cartSlice } from '../../features/cart';
import { favouriteSlice } from '../../features/favourite';
import { BackButton } from '../../components/BackButton';
import { useEffect, useState } from 'react';
import {
  getAccessories,
  getAllProducts,
  getPhones,
  getTablets,
} from '../../api/products';
import { ProductData } from '../../types/ProductData';

const colorMap: Record<string, string> = {
  'rose-gold': 'salmon',
  'sky-blue': 'skyblue',
  'space-gray': 'gray',
  graphite: 'SaddleBrown',
  sierrablue: 'CornflowerBlue',
};

export const ProductPage = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const favourite = useAppSelector(state => state.favourite);
  const { itemId } = useParams();
  const location = useLocation();
  const category = location.pathname.slice(1).split('/')[0];

  const isInCart = cart.some((item: Product) => item.itemId === product?.id);
  const isFavourite = favourite.some(
    (item: Product) => item.itemId === product?.id,
  );

  const mayLike = products.filter(
    (item: Product) => item.category === product?.category,
  );

  useEffect(() => {
    getAllProducts().then(setProducts);
    let fetchCategory = null;

    switch (category) {
      case 'tablets':
        fetchCategory = getTablets();
        break;
      case 'accessories':
        fetchCategory = getAccessories();
        break;
      case 'phones':
      default:
        fetchCategory = getPhones();
        break;
    }

    fetchCategory.then(response => {
      const productToShow: ProductData | undefined = response.find(
        (item: ProductData) => item.id === itemId,
      );

      setCategoryProducts(response);
      setProduct(productToShow || null);
    });
  }, [category, itemId]);

  const getColorLink = (color: string) => {
    const productToLink = categoryProducts.find(
      (item: ProductData) =>
        item.color.replace(' ', '-') === color &&
        item.capacity === product?.capacity &&
        item.category === product?.category &&
        item.namespaceId === product?.namespaceId,
    );

    return productToLink ? `/${product?.category}/${productToLink.id}` : '#';
  };

  const getCapacityLink = (capacity: string) => {
    return `/${product?.category}/${product?.id.replace(product?.capacity.toLowerCase(), capacity.toLowerCase())}`;
  };

  const handleAddToCart = () => {
    const good: Product | undefined = products.find(
      (item: Product) => item.itemId === product?.id,
    );

    if (good) {
      if (isInCart) {
        dispatch(cartSlice.actions.deleteFromCart(good));
      } else {
        dispatch(cartSlice.actions.addToCart(good));
      }
    }
  };

  const handleAddToFavourite = () => {
    const good: Product | undefined = products.find(
      (item: Product) => item.itemId === product?.id,
    );

    if (good) {
      if (isFavourite) {
        dispatch(favouriteSlice.actions.removeFromFavourite(good));
      } else {
        dispatch(favouriteSlice.actions.addToFavourite(good));
      }
    }
  };

  const colorsAvailable = () => {
    return product?.colorsAvailable.map(color => color.replace(' ', '-')) || [];
  };

  const getId = () => {
    return (
      products.find((item: Product) => item.itemId === product?.id)?.id ?? 0
    );
  };

  const getBackgroundColor = (color: string) => {
    return colorMap[color] || color;
  };

  return (
    <main>
      <Breadcrumbs />
      <BackButton />
      {product && (
        <>
          <Title level={HeadingLevel.h2}>{product.name}</Title>
          <div className="product-overview">
            <ProductSlider product={product} />
            <div className="main-information">
              <div className="main-information__item-id">ID: {getId()}</div>
              <div className="main-information__color">
                <h4 className="main-information__color__title">
                  Available colors
                </h4>
                <div className="main-information__color__picker">
                  {colorsAvailable().map((color, index) => (
                    <Link
                      to={getColorLink(color)}
                      key={index}
                      className={classNames('color-container', {
                        'color-container--active':
                          product.color.replace(' ', '-') === color,
                      })}
                      style={{ background: getBackgroundColor(color) }}
                    >
                      <div className="color-item"></div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="main-information__capacity">
                <h4 className="main-information__capacity__title">
                  Select capacity
                </h4>
                <div className="main-information__capacity__picker">
                  {product.capacityAvailable.map((capacity, index) => (
                    <Link
                      to={getCapacityLink(capacity)}
                      key={index}
                      className={classNames('capacity__item', {
                        'capacity__item--active': product.capacity === capacity,
                      })}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="main-information__price">
                <span className="regular-price">${product.priceDiscount}</span>
                <span className="full-price">${product.priceRegular}</span>
              </div>
              <div className="main-information__actions">
                <button
                  className={classNames('main-information__actions__add', {
                    'main-information__actions__add--selected': isInCart,
                  })}
                  onClick={handleAddToCart}
                >
                  {isInCart ? 'Remove from cart' : 'Add to cart'}
                </button>
                <div
                  className={classNames(
                    'main-information__actions__favourite',
                    {
                      'main-information__actions__favourite--selected':
                        isFavourite,
                    },
                  )}
                  onClick={handleAddToFavourite}
                >
                  {isFavourite ? (
                    <img src="./img/icons/heart-filled.svg" alt="Heart" />
                  ) : (
                    <img src="./img/icons/favourites-heart.svg" alt="Heart" />
                  )}
                </div>
              </div>
              <ul className="main-information__description">
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Screen
                  </span>
                  <span className="main-information__description__item__value">
                    {product.screen}
                  </span>
                </li>
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Capacity
                  </span>
                  <span className="main-information__description__item__value">
                    {product.capacity}
                  </span>
                </li>
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    Processor
                  </span>
                  <span className="main-information__description__item__value">
                    {product.processor}
                  </span>
                </li>
                <li className="main-information__description__item">
                  <span className="main-information__description__item__name">
                    RAM
                  </span>
                  <span className="main-information__description__item__value">
                    {product.ram}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Title level={HeadingLevel.h2}>You may also like</Title>
          <ProductsSlider products={mayLike} />
        </>
      )}
    </main>
  );
};
