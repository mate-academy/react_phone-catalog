import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import productsFromServer from '../../api/products.json';
import { Product } from '../../types/Product';
import { ProductSlider } from '../ProductSlider';
import { FavouritesContext } from '../../context/FavouritesContext';
import { BackButton } from '../BackButton';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Product;
  category: string;
  parentClassName?: string;
  products: Product[];
};

export const ProductDetails: React.FC<Props> = ({
  product,
  category,
  parentClassName = '',
  products,
}) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  useEffect(() => {
    setCurrentImage(product.images[0]);
  }, [product]);

  const handleGetRandomProducts = useCallback(() => {
    const numbers: number[] = [];

    const eachNum: number[] = [];

    for (let i = 0; i < products.length; i++) {
      eachNum.push(i);
    }

    function generate(maxNum: number) {
      return Math.floor(Math.random() * maxNum);
    }

    for (let i = 1; i <= 8; i++) {
      const number = generate(eachNum.length);

      numbers.push(eachNum[number]);
      eachNum.splice(number, 1);
    }

    const result = numbers.map(num => products[num]);

    return result;
  }, [products]);

  const randomProducts = useMemo(
    () => handleGetRandomProducts(),
    [handleGetRandomProducts],
  );

  const params = useMemo(
    () => [
      { id: 1, title: 'Screen', param: product.screen },
      { id: 2, title: 'Resolution', param: product.resolution },
      { id: 3, title: 'Processor', param: product.processor },
      { id: 4, title: 'RAM', param: product.ram },
    ],
    [product],
  );

  const techSpecs = useMemo(
    () => [
      ...params,
      { id: 5, title: 'Built in memory', param: product.capacity },
      { id: 6, title: 'Camera', param: product.camera ?? 'none' },
      { id: 7, title: 'Zoom', param: product.zoom ?? 'none' },
      { id: 8, title: 'Cell', param: product.cell.join(', ') },
    ],
    [product, params],
  );

  const colors = products.filter(
    currentProduct =>
      currentProduct.namespaceId === product.namespaceId &&
      currentProduct.capacity === product.capacity,
  );

  const capacities = products
    .filter(
      currentProduct =>
        currentProduct.namespaceId === product.namespaceId &&
        currentProduct.color === product.color,
    )
    .sort((a, b) => Number.parseInt(a.capacity) - Number.parseInt(b.capacity));

  const productId = productsFromServer.find(
    prod => prod.itemId === product.id,
  )?.id;

  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cart, setCart } = useContext(CartContext);

  const handleAddFavourite = () => {
    if (favourites.filter(fav => fav.id === product.id).length > 0) {
      setFavourites(favourites.filter(fav => fav.id !== product.id));
    } else {
      setFavourites([...favourites, product]);
    }
  };

  const handleAddToCart = () => {
    if (cart.filter(crt => crt.id === product.id).length <= 0) {
      setCart([...cart, { ...product, count: 1 }]);
    } else {
      setCart(cart.filter(crt => crt.id !== product.id));
    }
  };

  return (
    <div
      className={classNames('product-details', {
        [`${parentClassName}__product-details`]: parentClassName,
      })}
    >
      <BackButton url={category} parentClassName="product-details" />
      <h2 className="product-details__title">{product.name}</h2>
      <div className="product-details__visible-content">
        <div className="product-details__images">
          <div className="product-details__images-buttons">
            {product.images.map(image => (
              <img
                key={image}
                src={`${process.env.PUBLIC_URL}/${image}`}
                className={classNames('product-details__image-button', {
                  'product-details__image-button--selected':
                    image === currentImage,
                })}
                alt="image"
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/${currentImage}`}
            className="product-details__image"
          ></img>
        </div>
        <div className="product-details__params">
          <p className="product-details__param-text small-text">
            Available colors
          </p>
          <p className="product-details__id small-text">
            ID: {productId ?? -1}
          </p>
          <div className="product-details__colors">
            {colors.map(color => (
              <Link
                style={{ backgroundColor: color.color }}
                key={color.color}
                className={classNames('product-details__color', {
                  'product-details__color--selected':
                    product.color === color.color,
                })}
                to={`/${category}/${color.id}`}
              ></Link>
            ))}
          </div>
          <div className="product-details__capacity-block">
            <p className="product-details__param-text small-text">
              Select capacity
            </p>
            <div className="product-details__capacities">
              {capacities.map(capacity => (
                <Link
                  key={capacity.capacity}
                  className={classNames('product-details__capacity body-text', {
                    'product-details__capacity--selected':
                      product.capacity === capacity.capacity,
                  })}
                  to={`/${category}/${capacity.id}`}
                >
                  {capacity.capacity}
                </Link>
              ))}
            </div>
          </div>
          <div className="product-details__price-block">
            <div className="product-details__prices">
              {product.priceDiscount ? (
                <Fragment>
                  <h2 className="product-details__price">
                    ${product.priceDiscount}
                  </h2>
                  <p className="product-details__old-price">
                    ${product.priceRegular}
                  </p>
                </Fragment>
              ) : (
                <h2 className="product-details__price">
                  ${product.priceRegular}
                </h2>
              )}
            </div>
            <div className="product-details__buttons">
              <button
                onClick={handleAddToCart}
                className={classNames('product-details__button button', {
                  'button--disabled':
                    cart.filter(crt => crt.id === product.id).length > 0,
                })}
              >
                {cart.filter(crt => crt.id === product.id).length > 0
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>
              <button
                onClick={handleAddFavourite}
                className={classNames(
                  'product-details__favourite-button favourite-button',
                  {
                    'favourite-button--active':
                      favourites.filter(fav => fav.id === product.id).length >
                      0,
                  },
                )}
              />
            </div>
          </div>
          <div className="product-details__params-block">
            {params.map(param => (
              <div key={param.id} className="product-details__product-params">
                <p className="product-details__param-name small-text">
                  {param.title}
                </p>
                <p className="product-details__param small-text">
                  {param.param}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="product-details__description">
        <div className="product-details__description-about">
          <h3 className="product-details__description-title">About</h3>
          {product.description.map(dscr => (
            <Fragment key={dscr.title}>
              <h4 className="product-details__description-small-title">
                {dscr.title}
              </h4>
              {dscr.text.map(text => (
                <p
                  key={text}
                  className="product-details__description-text body-text"
                >
                  {text}
                </p>
              ))}
            </Fragment>
          ))}
        </div>
        <div className="product-details__description-tech-specs">
          <h3 className="product-details__description-title">Tech specs</h3>
          <div className="product-details__description-params">
            {techSpecs.map(tSpec => (
              <div
                key={tSpec.id}
                className="product-details__description-param-block"
              >
                {/* eslint-disable-next-line max-len */}
                <p className="product-details__description-param-name body-text">
                  {tSpec.title}
                </p>
                <p className="product-details__description-param body-text">
                  {tSpec.param}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductSlider
        parentClassName="product-details"
        products={randomProducts}
        title="You may also like"
      />
    </div>
  );
};
