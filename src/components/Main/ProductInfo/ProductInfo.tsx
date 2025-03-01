/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { ProductMainInfoProps } from '../../../types/TProductCard';
import '../ProductCard/ProductCard.scss';
import { StyledButton } from '../ProductCard/vars';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { useProducts } from '../../../context/ProductsContext';
import { useParams } from 'react-router-dom';

export const ProductInfo: React.FC<ProductMainInfoProps> = ({ showFullPrice }) => {
  const { category, itemId } = useParams<{ category: string; itemId: string }>();
  const { products } = useProducts();
  const widthButton = '200px';

  const product = products.find(
    product => product.id === Number(itemId) && product.category === category,
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const images =
    product.images && Array.isArray(product.images)
      ? product.images.map((image: string) => ({
          original: `/${image}`, // Переконайтеся, що шлях правильний
          thumbnail: `/${image}`, // Переконайтеся, що шлях правильний
        }))
      : [];

  return (
    <section className="product-info">
      <article className="product-info__head">
        <h2 className="product-info__name">{product.name}</h2>
        <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
      </article>
      <article className="product-info__body">
        <div className="product-info__colors">
          <h5 className="product-colors__label">Available colors</h5>
          <h5 className="product-colors__id">ID: {product.id}</h5>
        </div>
        <hr />
        <div className="product-info__memory">
          <h5 className="product-info__label">Available memory</h5>
          <ul>
            {product.capacityAvailable?.map((capacity: string) => (
              <li key={capacity}>
                <button>{capacity}</button>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="product-card__prices">
          <h3 className="product-card__price">${product.priceDiscount}</h3>
          {showFullPrice && <h3 className="product-card__fullprice">${product.priceRegular}</h3>}
        </div>
        <div className="product-card__buttons">
          <StyledButton className="product-card__add-to-cart" width={widthButton}>
            Add to cart
          </StyledButton>
          <button className="product-card__wishlist">
            <img src="./img/icons/Favourites.png" alt="Add to wishlist" />
          </button>
        </div>
      </article>
    </section>
  );
};
