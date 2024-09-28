import React, { useEffect, useState } from 'react';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Products } from '../../types/products';
import { useLocalStorage } from '../../LocaleStorage';

type Product = Phone | Tablet | Accessory;

type Props = {
  product: Product;
}

export const DetailsCard: React.FC<Props> = ({ product }) => {
  const [cart, setCart] = useLocalStorage<Products[]>('cart', [])
  const [favorites, setFavorites] = useLocalStorage<Products[]>('favorites', [])

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [products, setProducts] = useState<Products[]>([]);

  const handleMemoryChange = (newCapacity: string) => {
    let updatedURL;

    if (product.category === 'accessories') {
      updatedURL = `/${product.category}/${product.namespaceId}-${newCapacity}-${product.color.replace(/\s+/g, '-')}`;
    } else {
      updatedURL = `/${product.category}/${product.namespaceId}-${newCapacity}-${product.color}`;
    }

    navigate(updatedURL);
  };

  const handleColorChange = (color: string) => {
    let updatedURL;

    updatedURL = `/${product.category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(updatedURL);
  };


  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [product])

  const toogleFavoritesOfDetails = (productId: string) => {
    const productToAdd = products.find(el => el.itemId === productId);

    const isInCart = favorites.some(el => el.id === productToAdd?.id);

    if (isInCart) {
      // Если товар уже в корзине, удаляем его
      setFavorites(favorites.filter(el => el.id !== productToAdd?.id));
    } else if (productToAdd) {
      // Если товара нет в корзине, добавляем его
      setFavorites([...cart, productToAdd]);
    }
  }

  const toogleCartOfDetails = (productId: string) => {
    const productToAdd = products.find(el => el.itemId === productId);

    const isInCart = cart.some(el => el.id === productToAdd?.id);

    if (isInCart) {
      // Если товар уже в корзине, удаляем его
      setCart(cart.filter(el => el.id !== productToAdd?.id));
    } else if (productToAdd) {
      // Если товара нет в корзине, добавляем его
      setCart([...cart, productToAdd]);
    }
  };

  return (
    <>
      <h1 className="details__text">{product.name}</h1>

      <div className="qwerty">
        <div className="details__image--more">
          {product.images.map(img => (
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => { setSelectedImage(img) }}
              key={img}
              className="details__image--more__img"
              src={img}
              alt="image"
            />
          ))}
        </div>

        <div className="details__image">
          <img src={selectedImage} alt="image" />
        </div>

        <div className='q'>
          <div className="details-flex">
            <p className="details-flex-text">Aviables colors</p>
          </div>

          <div className="details__colors-container">
            {product.colorsAvailable.map(color => (
              <div
                onClick={() => { handleColorChange(color) }}
                key={color}
                className="details__color"
                style={{ backgroundColor: color, width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }}
              />
            ))}
          </div>

          <div className="card__line"></div>

          <p className="details-flex-text">Select capacity</p>

          <div className='flex-capacity'>
            {product.capacityAvailable.map((el) => (
              <div key={`${product.id}-${el}`} style={{ cursor: 'pointer' }} onClick={() => handleMemoryChange(el.toLowerCase())}
                className={
                  classNames({
                    'capacity-default': el !== product.capacity,
                    'capacity': el === product.capacity,
                  })}
              >
                <div className="capacity-text">
                  {el}
                </div>
              </div>
            ))}
          </div>

          <div className="card__line"></div>

          <p className="card__price-regular">{`${product.priceDiscount}$`}</p>

          <div className="card__buy">
            <button
              onClick={() => { toogleCartOfDetails(product.id) }}
              className={`${cart.some(el => el.itemId === product.id) ? 'added-to-cart' : 'card__buy-cart'}`}
            >
              {cart.some(el => el.itemId === product.id) ? 'Added to cart' : 'Add to cart'}
            </button>
            <img onClick={() => { toogleFavoritesOfDetails(product.id) }}
              className='page-home-card__favorite' src="./img/add-to-cart.svg" alt="favorite" />
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="card__ram">
              <p className="card__ram-name">Screen</p>
              <p className="card__ram-info">{product.screen}</p>
            </div>

            <div className="card__ram">
              <p className="card__ram-name">Resolution</p>
              <p className="card__ram-info">{product.resolution}</p>
            </div>

            <div className="card__ram">
              <p className="card__ram-name">Processor</p>
              <p className="card__ram-info">{product.processor}</p>
            </div>

            <div className="card__ram">
              <p className="card__ram-name">RAM</p>
              <p className="card__ram-info">{product.ram}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
