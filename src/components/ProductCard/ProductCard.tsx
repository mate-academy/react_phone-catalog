import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../helpers/types/ProductType';
import { BASE_URL } from '../../helpers/utils/constants';
import './ProductCard.scss';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { ButtonTexted } from '../../elements/ButtonTexted/ButtonTexted';
import { isProductFavorite } from '../../helpers/utils/checkProductStatus';
import { ProductsContext } from '../../store/ProductsContext';

type Props = {
  product: ProductType;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    favoriteProducts,
    setFavoriteProducts,
  } = useContext(ProductsContext);
  const {
    image,
    name,
    fullPrice,
    price,
  } = product;

  const details = ['Screen', 'Capacity', 'RAM'];

  function handleFavoriteClick(prod?: ProductType): void {
    if (!prod) {
      return;
    }

    if (isProductFavorite(favoriteProducts, prod)) {
      setFavoriteProducts(cur => cur.filter(item => item !== prod));
    } else {
      setFavoriteProducts(cur => [...cur, prod]);
    }
  }

  return (
    <Link
      to={`/${product.category}/${product.phoneId}`}
      className="productCard"
    >
      <div className="productCard__image-container">
        <img
          className="productCard__image"
          src={`${BASE_URL}${image}`}
          alt={name}
        />
      </div>

      <div className="productCard__content">
        <div className="productCard__name-container">
          <p className="productCard__name">{name}</p>
        </div>

        <div className="productCard__prices">
          <p className="productCard__price">{`$${price}`}</p>
          <p className="productCard__fullprice">{`$${fullPrice}`}</p>
        </div>

        <div className="productCard__line" />

        <div className="productCard__details">
          {details.map(detail => (
            <div key={detail} className="productCard__detail">
              <p className="productCard__detail-name">{detail}</p>
              <p className="productCard__detail-model">
                {product[detail.toLowerCase() as keyof ProductType]}
              </p>
            </div>
          ))}
        </div>

        <div className="productCard__buttons">

          <ButtonTexted
            text="Add to cart"
            textActive="Remove from cart"
            product={product}
          />

          <ButtonIcon
            type="event"
            shape="heart"
            dynamicClasses={['medium']}
            product={product}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => handleFavoriteClick(product)}
          />
        </div>
      </div>
    </Link>
  );
};
