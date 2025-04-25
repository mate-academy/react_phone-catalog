import React, { useEffect, useState } from 'react';
import style from './ProductOptions.module.scss';
import favouriteIcon from '../../../../shared/icons/favourites-heart-like.svg';
import addedFavouriteIcon from '../../../../shared/icons/favourites-filled-heart-like.svg';
import { Product, ProductDetails } from '@/types/Products';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { fetchProducts } from '@/utils/fetchProduct';

type Props = {
  phone: ProductDetails;
  color: string;
  capacity: string;
  productSection: string;
};

export const ProductOptions: React.FC<Props> = ({ phone, color, capacity, productSection }) => {
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>();

  useEffect(() => {
    fetchProducts().then(data => {
      const product = data.find((item: Product) => item.itemId === phone.id);

      setCurrentProduct(product);
    });
  }, [phone.id]);

  const navigate = useNavigate();

  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, addToCart, favourite, toggleFavourite } = cartContext;

  const isCartAdd = cart.some(item => item.id === currentProduct?.id);
  const isCartFavourite = favourite.some(item => item.id === currentProduct?.id);

  const handleColorChange = (namespaceId: string, newColor: string) => {
    const newId = `${namespaceId}-${capacity}-${newColor.replace(/\s/g, '-')}`;

    navigate(`/${productSection}/${newId}`);
  };

  const handleCapacityChange = (namespaceId: string, newCapacity: string) => {
    const newId = `${namespaceId}-${newCapacity}-${color}`;

    navigate(`/${productSection}/${newId}`);
  };

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct, true);
    } else {
      console.error('Product is not loaded yet');
    }
  };

  const handleAddToFavourite = () => {
    if (currentProduct) {
      toggleFavourite(currentProduct, true);
    }
  };

  /// hex space gray color #717378

  console.log(color);

  return (
    <div className={style.rightSide}>
      <div className={style.colorProduct}>
        <p className={style.titleSection}>Available colors</p>
        <div className={style.colorList}>
          {phone.colorsAvailable.map((color, index) => (
            <button
              onClick={() => handleColorChange(phone.namespaceId, color)}
              key={index}
              className={
                phone.color === color ? `${style.colorItemActive}` : `${style.colorButton}`
              }
              title={color}
            >
              <span className={style.colorItem} style={{ backgroundColor: color }}></span>
            </button>
          ))}
        </div>
      </div>

      <div className={style.capacityProduct}>
        <p className={style.titleSection}>Select capacity</p>
        <div className={style.colorList}>
          {phone.capacityAvailable.map((capacity, index) => (
            <button
              className={phone.capacity === capacity ? `${style.selectActive}` : `${style.select}`}
              key={index}
              onClick={() => handleCapacityChange(phone.namespaceId, capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      <div className={style.priceProduct}>
        <div className={style.price}>
          <p className={style.priceRegular}>${phone.priceDiscount}</p>
          <p className={style.priceDiscount}>${phone.priceRegular}</p>
        </div>

        <div className={style.phoneFooter}>
          {isCartAdd ? (
            <button className={style.addedCart} disabled>
              Added
            </button>
          ) : (
            <button className={style.addToCart} onClick={handleAddToCart}>
              Add to cart
            </button>
          )}

          <div
            className={isCartFavourite ? `${style.favoriteActive}` : `${style.favorite}`}
            onClick={handleAddToFavourite}
          >
            <img
              src={isCartFavourite ? addedFavouriteIcon : favouriteIcon}
              alt="favourite icon"
              className={style.favouriteIcon}
            />
          </div>
        </div>

        <div className={style.phoneDescription}>
          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Screen</p>
            <p className={style.propertieDescription}>{phone.screen}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Resolution</p>
            <p className={style.propertieDescription}>{phone.resolution}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Processor</p>
            <p className={style.propertieDescription}>{phone.processor}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>RAM</p>
            <p className={style.propertieDescription}>{phone.ram}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
