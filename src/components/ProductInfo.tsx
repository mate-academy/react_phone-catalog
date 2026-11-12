import { LocalProduct, Phone } from '../interface/Product';
import { useEffect, useState } from 'react';

interface ProductInfoProps {
  realProduct: Phone;
  currentCapacity: string | undefined;
  setCurrentCapacity: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentColor: string | undefined;
  setCurrentColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  changeEffect: (nam: string) => void;
  productName: (nam: string) => void;
}

const ProductInfo = ({
  realProduct,
  currentCapacity,
  setCurrentCapacity,
  currentColor,
  setCurrentColor,
  changeEffect,
}: ProductInfoProps) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    setFavorite(
      favorites.some((item: LocalProduct) => item.id === realProduct.id),
    );
  }, [realProduct.name]);

  return (
    <div className="product__info">
      <h3 className="product__subtitle">Available colors</h3>
      <div className="product__colors">
        {realProduct.colorsAvailable?.map((color: string, i: number) => (
          <div
            key={i}
            className={
              currentColor?.toLowerCase() === color.toLowerCase()
                ? 'product__color product__color--active'
                : 'product__color'
            }
            onClick={() => {
              setCurrentColor(color);
            }}
          >
            <div
              className="product__circle"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        ))}
      </div>
      <div className="product__divisor"></div>
      <h3 className="product__subtitle">Select capacity</h3>
      <div className="product__capacities">
        {realProduct.capacityAvailable?.map((capacity: string, i: number) => {
          return (
            <div
              key={i}
              className={
                currentCapacity === capacity
                  ? 'product__capacity product__capacity--active'
                  : 'product__capacity'
              }
              onClick={() => setCurrentCapacity(capacity)}
            >
              <span>{capacity}</span>
            </div>
          );
        })}
      </div>
      <div className="product__divisor"></div>
      <h4 className="product__price">
        <span>${realProduct.priceDiscount}</span>{' '}
        <span className="product__subprice">${realProduct.priceRegular}</span>
      </h4>
      <div className="product__buttons">
        <button
          className="product__button"
          onClick={() => {
            const cart: LocalProduct[] = JSON.parse(
              localStorage.getItem('cart') || '[]',
            );

            if (!cart.some(item => item.id === realProduct.id)) {
              cart.push({
                id: realProduct.id,
                capacity: currentCapacity,
                color: currentColor,
              });
              localStorage.setItem('cart', JSON.stringify(cart));
            }

            changeEffect(realProduct.name);
          }}
        >
          Add to cart
        </button>
        <button
          className="product__favorite"
          onClick={() => {
            const favorites: LocalProduct[] = JSON.parse(
              localStorage.getItem('favorites') || '[]',
            );

            if (favorite) {
              const updatedFavorites = favorites.filter(
                item => item.id !== realProduct.id,
              );

              localStorage.setItem(
                'favorites',
                JSON.stringify(updatedFavorites),
              );
              setFavorite(false);
            } else {
              favorites.push({
                id: realProduct.id,
                capacity: currentCapacity,
                color: currentColor,
              });
              localStorage.setItem('favorites', JSON.stringify(favorites));
              setFavorite(true);
            }
          }}
        >
          <img
            src={
              favorite
                ? `${import.meta.env.VITE_PUBLIC_URL}/img/heart-full.svg`
                : `${import.meta.env.VITE_PUBLIC_URL}/img/heart.svg`
            }
            alt="Add to favorites"
          />
        </button>
      </div>
      <table className="product__table">
        <tr>
          <td>Screen</td>
          <td>{realProduct.screen}</td>
        </tr>
        <tr>
          <td>Resolution</td>
          <td>{realProduct.resolution}</td>
        </tr>
        <tr>
          <td>Processor</td>
          <td>{realProduct.processor}</td>
        </tr>
        <tr>
          <td>RAM</td>
          <td>{realProduct.ram}</td>
        </tr>
      </table>
    </div>
  );
};

export default ProductInfo;
