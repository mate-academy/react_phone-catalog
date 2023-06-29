import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/product';
import { AddProductButtons } from '../AddProductButtons';
import './productItem.scss';

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
}

export const ProductItem: FC<Props> = ({
  product, addToCart, addToFavorites,
}) => {
  const {
    category,
    image,
    name,
    images,
    price,
    fullPrice,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
  } = product;

  console.log(priceRegular);

  const productFeatures = [
    {
      name: 'Screen',
      value: screen,
    },
    {
      name: 'Capacity',
      value: capacity,
    },
    {
      name: 'RAM',
      value: ram,
    },
  ];

  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className={`product product--${theme}`}>
      <Link
        to={`/${category || 'phones'}/${name.toLowerCase().split(' ').join('-')}`}
        className="product__link"
      >
        {images ? (
          <img className="product__image" src={`_new/${images[0]}`} alt="Phone" />
        ) : (
          <img className="product__image" src={`/public/_new/${image}`} alt="Phone" />
        )}
        <h2 className={`product__name product__name--${theme}`}>{name}</h2>
      </Link>

      <div className="product__prices">
        <p className={`product__price product__price--${theme}`}>
          {`$${!price ? priceDiscount : price}`}
        </p>
        <p className="product__full-price">{`$${!fullPrice ? priceRegular : fullPrice}`}</p>
      </div>

      <div className="product__info">
        {productFeatures.map(feature => (
          <div className="product__info-block" key={feature.name}>
            <p className="product__info-title">{feature.name}</p>
            <p className={`product__info-value product__info-value--${theme}`}>{feature.value}</p>
          </div>
        ))}
      </div>

      <AddProductButtons
        addToCart={addToCart}
        addToFavorites={addToFavorites}
        product={product}
      />
    </div>
  );
};
