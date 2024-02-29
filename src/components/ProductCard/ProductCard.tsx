import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { CardProduct, Product } from '../../types/Product';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';
import { setDataToLocalStorage } from '../../utils/LocalStorage';

type Props = {
  product: Product;
  carousel?: number;
};

export const ProductCard: React.FC<Props> = ({
  product,
  carousel,
}) => {
  const {
    cart,
    favorite,
    setCart,
    setSelectedId,
    addToFavorite,
  } = useContext(PhoneCatalogContext);

  const [isFavorite, setIsFavorite] = useState(favorite
    .some((favProduct) => favProduct.phoneId === product.phoneId));

  const [isAdded, setIsAdded] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  const addToCart = (p: Product, event: React.MouseEvent) => {
    const cartProduct: CardProduct = { ...p, quantity: 1 };
    const findItem = cart.find((item) => item.id === p.id);

    event.stopPropagation();

    if (findItem) {
      findItem.quantity += 1;
      setDataToLocalStorage('cart', cart);
    }

    if (!findItem) {
      setCart((prev) => [...prev, cartProduct]);
      setDataToLocalStorage('cart', cart);
    }

    setIsAdded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newTimeout = setTimeout(() => {
      setIsAdded(false);
    }, 1000);

    timeoutRef.current = newTimeout;
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedId(itemId);
    navigate(`/phones/${itemId}`);
  };

  useEffect(() => {
    setIsFavorite(favorite
      .some((favProduct) => favProduct.phoneId === product.phoneId));
  }, [favorite]);

  return (
    <div
      className="productCard"
      style={{
        transform: `translateX(${carousel}px)`,
      }}
      role="link"
      tabIndex={0}
      onClick={() => handleItemSelect(product.phoneId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
          handleItemSelect(product.phoneId);
        }
      }}
    >
      <div className="productCard__image">
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${product.image}`}
          alt={product.name}
          className="productCard__image__img"
        />
      </div>
      <div className="productCard__name primary">
        {product.name}
      </div>
      <div className="
      productCard__price
      bold
      primary
      "
      >
        {`$${product.price}`}
        <span
          className="productCard__price--discounted"
        >
          {`$${product.fullPrice}`}
        </span>
      </div>

      <ul className="productCard__specs__block">
        <li className="productCard__specs__block__item primary-color">
          <span>Screen</span>
          {product.screen}
        </li>
        <li className="productCard__specs__block__item primary-color">
          {product.capacity && (
            <>
              <span>Capacity</span>
              {product.capacity}
            </>
          )}
        </li>
        <li className="productCard__specs__block__item primary-color">
          {product.ram && (
            <>
              <span>RAM</span>
              {product.ram}
            </>
          )}
        </li>
      </ul>
      <div className="productCard__buttons">
        <button
          type="button"
          className={cn('productCard__button medium',
            { productCard__button__added: isAdded })}
          onClick={(event) => addToCart(product, event)}
        >
          Add to cart
        </button>
        <button
          type="button"
          className="productCard__button__favorite"
          onClick={(e) => addToFavorite(product, e)}
        >
          <div className={cn('icon',
            {
              favoriteSelected: isFavorite,
              favorite: !isFavorite,
            })}
          />
        </button>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  carousel: 0,
};
