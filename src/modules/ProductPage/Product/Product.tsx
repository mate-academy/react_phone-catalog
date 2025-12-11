import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Product.module.scss';
import { Phone } from '../../../Types/type';
import UseCatalogData from '../../Hooks/UseCatalogData';

interface ProductProps {
  productScreen: string;
  productRam: string;
  productProcessor: string;
  productResolution: string;
  capacity: string[];
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favouriteButton: Set<string>;
  itemsInCart: Phone[];
}

export const Product = ({
  productScreen,
  productRam,
  productProcessor,
  productResolution,
  capacity,
  toggleInCart,
  toggleFavourite,
  favouriteButton,
  itemsInCart,
}: ProductProps) => {
  const [productImages, setProductImages] = useState<string[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const [image, setImage] = useState<string | undefined>();
  const [colors, setColors] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState<number>();
  const [productDiscount, setProductDiscount] = useState<number>();
  const [currentProduct, setCurrentProduct] = useState<Phone | null>(null);
  const [availableCapacity, setAvailableCapacity] = useState<string>('');

  const { products, loading } = UseCatalogData();
  // const location = useLocation();

  const isFavourite = currentProduct
    ? favouriteButton.has(currentProduct.id)
    : false;
  const IsInCart = itemsInCart.some(item => item.id === currentProduct?.id);

  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find((item: Phone) => item.id === productId);

      if (product) {
        setCurrentProduct(product);
        setProductImages(product.images);
        setImage(product.images[0]);
        setColors(product.colorsAvailable);
        setProductPrice(product.priceRegular);
        setProductDiscount(product.priceDiscount);
        setAvailableCapacity(product.capacity);
      }
    }
  }, [productId, products]);

  function findPriceByCapacity(selectedCapacity: string) {
    if (!currentProduct) {
      return;
    }

    const reletedCapacity = products.filter(
      item => item.namespaceId === currentProduct.namespaceId,
    );

    const productCapacity = reletedCapacity.find(
      item =>
        item.capacity.trim().toLowerCase() ===
          selectedCapacity.trim().toLowerCase() &&
        item.color === currentProduct.color,
    );

    if (productCapacity) {
      setCurrentProduct(productCapacity);
      setProductPrice(productCapacity.priceRegular);
      setProductDiscount(productCapacity.priceDiscount);
      setAvailableCapacity(productCapacity.capacity);
    }
  }

  function findColor(selectedColor: string) {
    if (!currentProduct) {
      return;
    }

    const reletedColor = products.filter(
      item => item.namespaceId === currentProduct.namespaceId,
    );

    const productColor = reletedColor.find(
      item =>
        item.color === selectedColor &&
        item.capacity.trim().toLowerCase() ===
          currentProduct.capacity.trim().toLowerCase(),
    );

    if (productColor) {
      setCurrentProduct(productColor);
      setColors(productColor.colorsAvailable);
      setProductImages(productColor.images);
      setImage(productColor.images[0]);
      setAvailableCapacity(productColor.capacity);
    }
  }

  const mainImage = (selectedImage: string) => {
    setImage(selectedImage);
  };

  if (loading) {
    return (
      <section className={style.product}>
        <p>Loading product details...</p>{' '}
      </section>
    );
  }

  if (!currentProduct) {
    return (
      <section className={style.product}>
        <p>Product not found.</p>{' '}
      </section>
    );
  }

  return (
    <section className={`${style.product} ${style['product--margin']}`}>
      {' '}
      <div className={style.product__images}>
        {' '}
        <div className={style.product__images__available}>
          {' '}
          {productImages.map((img: string, index) => (
            <img
              key={index}
              src={img}
              alt={`thumbnail-${index}`}
              className={`
 ${style['product__images__available--image']}
 ${image === img ? style['product__images__available--image--active'] : ''} // Активний клас для мініатюр
`}
              onClick={() => mainImage(img)}
            />
          ))}{' '}
        </div>{' '}
        <div className={style.product__images__image}>
          {' '}
          <img
            src={image}
            alt="product"
            className={style['product__images__image--main']}
          />{' '}
        </div>{' '}
      </div>{' '}
      <div className={style.product__cart}>
        {' '}
        <div className={style.product__cart__top}>
          {' '}
          <p className={style.product__cart__top__name}>
            Available colors
          </p>{' '}
          <p className={style.product__cart__top__id}>
            ID: {currentProduct.id}{' '}
          </p>{' '}
        </div>{' '}
        <div className={style.product__cart__colors}>
          {' '}
          {colors.map((color, index) => {
            return (
              <div
                key={index}
                className={`
${style.product__cart__colors__color}
${currentProduct.color === color ? style['product__cart__colors__color--active'] : ''} // Активний клас для кольору
`}
                style={{ backgroundColor: color }}
                onClick={() => findColor(color)}
              />
            );
          })}{' '}
        </div>
        <hr className={style['product__cart--line']} />{' '}
        <p className={style.product__cart__top__name}>Select capacity</p>{' '}
        <div className={style.product__cart__capacity}>
          {' '}
          {capacity.map((cap: string, index) => {
            const normalizedCurrent = availableCapacity.trim().toLowerCase();
            const normalizedCap = cap.trim().toLowerCase();
            const isActive = normalizedCurrent === normalizedCap;

            return (
              <button
                key={index}
                className={`
									${style['product__cart__capacity--available']}
									${isActive ? style['product__cart__capacity--active'] : ''} // ОНОВЛЕНО: Використовуємо --active
 								`}
                onClick={() => findPriceByCapacity(cap)}
              >
                {cap}{' '}
              </button>
            );
          })}{' '}
        </div>
        <hr className={style['product__cart--line']} />{' '}
        <div className={style.product__cart__prices}>
          {' '}
          <h4 className={style.product__cart__prices__price}>
            ${productDiscount}{' '}
          </h4>{' '}
          <h4 className={style.product__cart__prices__discount}>
            ${productPrice}{' '}
          </h4>{' '}
        </div>{' '}
        <div className={style.product__cart__buttons}>
          {' '}
          <button
            className={style.product__cart__buttons__button__add}
            onClick={() => currentProduct && toggleInCart(currentProduct)}
          >
            {IsInCart ? 'In a cart' : 'Add to cart'}{' '}
          </button>{' '}
          <button
            className={style.product__cart__buttons__button__favourites}
            onClick={() => currentProduct && toggleFavourite(currentProduct)}
            disabled={!currentProduct}
          >
            {' '}
            <span
              className={`
							${style['product__cart__buttons__button__favourites--heart']}
							${isFavourite ? style['product__cart__buttons__button__favourites--heart--active'] : ''}
							`}
            />{' '}
          </button>{' '}
        </div>{' '}
        <div className={style.product__cart__description}>
          {' '}
          <p className={style.product__cart__description__screen}>
            Screen
          </p>{' '}
          <p className={style['product__cart__description__screen--number']}>
            {productScreen}{' '}
          </p>{' '}
        </div>{' '}
        <div className={style.product__cart__description}>
          {' '}
          <p className={style.product__cart__description__resolution}>
            Resolution{' '}
          </p>{' '}
          <p
            className={style['product__cart__description__resolution--number']}
          >
            {productResolution}{' '}
          </p>{' '}
        </div>{' '}
        <div className={style.product__cart__description}>
          {' '}
          <p className={style.product__cart__description__processor}>
            Processor{' '}
          </p>{' '}
          <p className={style['product__cart__description__processor--number']}>
            {productProcessor}{' '}
          </p>{' '}
        </div>{' '}
        <div className={style.product__cart__description}>
          <p className={style.product__cart__description__ram}>RAM</p>{' '}
          <p className={style['product__cart__description__ram--number']}>
            {productRam}{' '}
          </p>{' '}
        </div>{' '}
      </div>{' '}
    </section>
  );
};
