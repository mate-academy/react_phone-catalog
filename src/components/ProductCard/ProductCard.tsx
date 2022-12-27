import { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { ProductCardButton } from '../ProductCardButton';
import { getProductDetails } from '../../api/products';
import { getProductLink } from '../../helpers/getProductsBy';
import { Error } from '../../types/Error';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    products,
    setSelectedProduct,
    setError,
    setIsLoading,
  } = useContext(Context);

  const {
    type,
    id,
    imageUrl,
    name,
    price,
    ram,
    capacity,
    screen,
    discount,
  } = product;

  const discountPrice = price - (price / 100) * discount;

  const currentProduct = products.find(
    productItem => productItem.id === id,
  );

  const handleGetProductDetails = async (productItemId: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const currentProductDetails = await getProductDetails(productItemId);

      setSelectedProduct(currentProductDetails);
    } catch {
      setError(Error.GET_PRODUCT_DETAILS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = useCallback(() => {
    if (currentProduct) {
      handleGetProductDetails(currentProduct.id);
    }
  }, [currentProduct]);

  return (
    <div className="product-card">
      <Link
        className="product-card__link"
        to={getProductLink(product)}
        onClick={() => handleCardClick()}
      />

      <div className="product-card__image">
        <img
          className="product-card__pic"
          src={`${imageUrl}`}
          alt={`${type}`}
        />
      </div>

      <h3 className="product-card__title">
        {name}
      </h3>

      <div className="product-card__price">
        <span className="product-card__new-price">
          {discount > 0
            ? `$${discountPrice}`
            : `$${price}`}
        </span>

        {discount > 0 && (
          <span className="product-card__old-price">
            {`$${price}`}
          </span>
        )}
      </div>

      <div className="product-card__features">
        <span className="product-card__feature-item">
          Screen

          <span className="product-card__feature-info">
            {screen}
          </span>
        </span>

        <span className="product-card__feature-item">
          Capacity

          <span className="product-card__feature-info">
            {capacity}
          </span>
        </span>

        <span className="product-card__feature-item">
          RAM

          <span className="product-card__feature-info">
            {ram}
          </span>
        </span>
      </div>

      <div className="product-card__buttons">
        <div className="card-buttons">
          <ProductCardButton
            product={product}
            type="cart"
            size="small"
          />

          <ProductCardButton
            product={product}
            type="favorite"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};
