import { NavLink, useParams } from 'react-router-dom';
import { ProductDetails } from '../../../../types/ProductDeatils';
import './ProductDetailsCard.scss';
import FavoriteIcon from './../../../../img/favorites-icon.png';
import FavoriteFilledIcon from './../../../../img/favorite-filled-icon.png';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../CartPage/components/CartContext/CartContext';
// eslint-disable-next-line max-len
import { useFavorites } from '../../../FavoritesPage/FavoritesContext/FavoritesContext';

type Props = {
  product: ProductDetails;
  mainImage: string | null;
  setMainImage: (mainImage: string | null) => void;
  usualProduct: Product;
};

export const ProductDetailsCard: React.FC<Props> = ({
  product,
  mainImage,
  setMainImage,
  usualProduct,
}) => {
  const { productId, category } = useParams();

  const generateNumericId = (str: string): number => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash);
  };

  const generatedId = generateNumericId(
    `${product.namespaceId}-${product.capacity}-${product.color}`,
  );

  const { cart, addToCart, removeCompletely } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const itemInCart = cart.find(item => item.id === usualProduct.id);

  const handleClick = () => {
    if (itemInCart) {
      removeCompletely(usualProduct.id);
    } else {
      addToCart(usualProduct);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isFavorite(usualProduct.id)) {
      removeFavorite(usualProduct.id);
    } else {
      addFavorite(usualProduct);
    }
  };

  return (
    <section className="product-details">
      <h2 className="section-title">{product.name}</h2>
      <div className="product-details__row">
        <div className="product-details__col">
          <div className="product-details__gallery">
            <div className="product-details__thumbnails">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={mainImage === img ? 'active-thumbnail' : ''}
                  alt="phone-thumbnails"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            {mainImage && (
              <div className="product-details__img">
                <img src={mainImage} alt="phone-image" />
              </div>
            )}
          </div>
        </div>
        <div className="product-details__col">
          <div className="product-details__colors">
            <div className="product-details__colors-title">
              Available colors
            </div>
            <div className="product-details__colors-options">
              {product.colorsAvailable.map((color, i) => (
                <NavLink
                  to={`/${category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`}
                  key={i}
                  className={`product-details__color ${productId?.includes(color.toLowerCase()) ? 'active-color' : ''}`}
                  style={{ backgroundColor: color }}
                >
                  <div className="product-details__panel"></div>
                </NavLink>
              ))}
            </div>
            <div className="product-details__id product-details__id--mobile">
              id: {generatedId}
            </div>
          </div>
          <div className="product-details__capacities">
            <div className="product-details__capacities-title">
              Select capacity
            </div>
            <div className="product-details__capacities-options">
              {product.capacityAvailable.map((capacity, i) => (
                <NavLink
                  key={i}
                  to={`/${category}/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`}
                  className={`product-details__capacity ${productId?.includes(capacity.toLowerCase()) ? 'active-capacity' : ''}`}
                >
                  {capacity}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="product-details__prices">
            <div className="product-details__price">
              ${product.priceRegular}
            </div>
            <div className="product-details__discount">
              ${product.priceDiscount}
            </div>
          </div>
          <div className="product-details__buttons">
            <div
              className={`product-details__add ${itemInCart ? 'product-details__add-active' : ''}`}
              onClick={() => handleClick()}
            >
              {itemInCart ? 'Added' : 'Add to cart'}
            </div>
            <div
              className={`product-details__favorite ${isFavorite(usualProduct.id) ? 'product-details__favorite-filled' : ''}`}
              onClick={e => handleFavoriteClick(e)}
            >
              {isFavorite(usualProduct.id) ? (
                <img src={FavoriteFilledIcon} alt="heart-icon" />
              ) : (
                <img src={FavoriteIcon} alt="heart-icon" />
              )}
            </div>
          </div>
          <div className="product-details__specs">
            <div className="product-details__spec">
              <div className="product-details__spec-title">Screen</div>
              <div className="product-details__spec-text">{product.screen}</div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Resolution</div>
              <div className="product-details__spec-text">
                {product.resolution}
              </div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Processor</div>
              <div className="product-details__spec-text">
                {product.processor}
              </div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">RAM</div>
              <div className="product-details__spec-text">{product.ram}</div>
            </div>
          </div>
        </div>
        <div className="product-details__col">
          <div className="product-details__id product-details__id--dekstop">
            id: {generatedId}
          </div>
        </div>
      </div>
      <div className="product-details__description">
        <div className="product-details__about">
          <div className="product-details__about-title">About</div>
          {product.description.map((section, index) => (
            <div className="product-details__about-description" key={index}>
              <div className="product-details__description-title">
                {section.title}
              </div>
              <div className="product-details__description-text">
                {section.text.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="product-details__tech">
          <div className="product-details__tech-title">Tech specs</div>
          <div className="product-details__specs">
            <div className="product-details__spec">
              <div className="product-details__spec-title">Screen</div>
              <div className="product-details__spec-text">{product.screen}</div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Resolution</div>
              <div className="product-details__spec-text">
                {product.resolution}
              </div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Processor</div>
              <div className="product-details__spec-text">
                {product.processor}
              </div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">RAM</div>
              <div className="product-details__spec-text">{product.ram}</div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Built in memory</div>
              <div className="product-details__spec-text">
                {product.capacity}
              </div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Camera</div>
              <div className="product-details__spec-text">{product.camera}</div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Zoom</div>
              <div className="product-details__spec-text">{product.zoom}</div>
            </div>
            <div className="product-details__spec">
              <div className="product-details__spec-title">Cell</div>
              <div className="product-details__spec-text">
                {product.cell.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
