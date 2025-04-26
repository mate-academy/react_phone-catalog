import './ProductContentTop.scss';
import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../../../types/ProductDetails';
import { Colors, colors } from '../../../../constants/colors';
import { GlobalContext } from '../../../../context/GlobalContext';
import { Icon } from '../../../shared/Icon';
import { icons } from '../../../../constants/iconsObject';
import { Product } from '../../../../types/Product';
import classNames from 'classnames';

const getProductBySelectedProductId = (
  products: Product[],
  selectedProductId: string,
) => {
  return products.find(product => product.itemId === selectedProductId);
};

type Props = {
  selectedProduct: ProductDetails;
  specificProducts: ProductDetails[];
};

export const ProductContentTop: FC<Props> = ({
  selectedProduct,
  specificProducts,
}) => {
  const navigate = useNavigate();

  const { allProducts, cart, favorites, toggleFavorites, addToCart, theme } =
    useContext(GlobalContext);

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const handleShoppingCart = useCallback(
    (currentProduct: ProductDetails) => {
      const productToAdd = getProductBySelectedProductId(
        allProducts,
        currentProduct.id,
      );

      if (productToAdd) {
        addToCart(productToAdd);
      }
    },
    [addToCart, allProducts],
  );

  const handleFavorites = useCallback(
    (currentProduct: ProductDetails) => {
      const favoriteProduct = getProductBySelectedProductId(
        allProducts,
        currentProduct.id,
      );

      if (favoriteProduct) {
        toggleFavorites(favoriteProduct);
      }
    },
    [allProducts, toggleFavorites],
  );

  const getLink = useCallback(
    (option: string, value: string) => {
      const {
        color: itemColor,
        namespaceId: itemNamespaceId,
        capacity: itemCapacity,
      } = selectedProduct;

      const el = specificProducts.find(({ color, namespaceId, capacity }) => {
        return (
          namespaceId === itemNamespaceId &&
          ((option === 'color' &&
            color === value &&
            capacity === itemCapacity) ||
            (option === 'capacity' &&
              capacity === value &&
              color === itemColor))
        );
      });

      return el?.id ?? '';
    },
    [selectedProduct, specificProducts],
  );

  const isInCart = useMemo(
    () => cart.some(item => item.id === selectedProduct.id),
    [cart, selectedProduct.id],
  );

  const isFavorites = useMemo(
    () => favorites.some(item => item.itemId === selectedProduct.id),
    [favorites, selectedProduct.id],
  );

  const handleSelectOption = (option: 'color' | 'capacity', value: string) => {
    const newLink = `/${selectedProduct.category}/${getLink(option, value)}`;

    navigate(newLink, { replace: true });
  };

  return (
    <div className="detailsPage__content-top">
      <div className="detailsPage__container-imageSlider">
        {selectedProduct.images.map((image, index) => (
          <div
            key={index}
            className={classNames('detailsPage__container-photos', {
              'detailsPage__container-photos--active': selectedPhoto === index,
            })}
          >
            <img
              src={`./${image}`}
              alt={`Thumbnail ${index + 1}`}
              className="detailsPage__photo"
              onClick={() => setSelectedPhoto(index)}
            />
          </div>
        ))}
      </div>

      <div className="detailsPage__photo-mask">
        {selectedProduct.images.map((image, index) => (
          <img
            key={index}
            src={`./${image}`}
            alt={`Selected Photo ${index + 1}`}
            className={classNames('detailsPage__image', {
              'detailsPage__image--active': selectedPhoto === index,
            })}
          />
        ))}
      </div>

      <div className="detailsPage__characteristics">
        {/* COLORS */}
        <div className="detailsPage__colors">
          <span className="detailsPage__colors-title detailsPage__info">
            Available colors
          </span>
          <ul className="detailsPage__colors-list">
            {selectedProduct.colorsAvailable.map(color => (
              <li
                key={color}
                className={classNames('detailsPage__color-item', {
                  'detailsPage__color-item--selected':
                    selectedProduct.color === color,
                })}
                onClick={() => handleSelectOption('color', color)}
                style={{ cursor: 'pointer' }}
              >
                <span
                  className="detailsPage__color-circle"
                  style={{
                    backgroundColor: colors[color as keyof Colors],
                  }}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="detailsPage__line"></div>

        {/* CAPACITY */}
        <div className="detailsPage__capacity">
          <span className="detailsPage__capacity-title detailsPage__info">
            Select capacity
          </span>
          <ul className="detailsPage__capacity-list">
            {selectedProduct.capacityAvailable.map(capacity => (
              <li
                key={capacity}
                className={classNames('detailsPage__capacity-item', {
                  'detailsPage__capacity-item--selected':
                    selectedProduct.capacity === capacity,
                })}
                onClick={() => handleSelectOption('capacity', capacity)}
                style={{ cursor: 'pointer' }}
              >
                <span
                  className={classNames('detailsPage__capacity-block', {
                    'detailsPage__capacity-block--selected':
                      selectedProduct.capacity === capacity,
                  })}
                >
                  {capacity.split('GB').join(' GB')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="detailsPage__line"></div>

        {/* PRICE */}
        <div className="detailsPage__container-price">
          <span className="detailsPage__price-discount">
            {`$${selectedProduct.priceDiscount}`}
          </span>
          <span className="detailsPage__price-regular">
            {`$${selectedProduct.priceRegular}`}
          </span>
        </div>

        {/* BUTTONS */}
        <div className="detailsPage__container-buttons">
          <button
            className={classNames(
              'detailsPage__button',
              'detailsPage__button-card',
              { 'detailsPage__button-card--active': isInCart },
            )}
            onClick={() => handleShoppingCart(selectedProduct)}
          >
            {isInCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            className={classNames(
              'detailsPage__button',
              'detailsPage__button-favorites',
              { 'detailsPage__button-favorites--active': isFavorites },
            )}
            onClick={() => handleFavorites(selectedProduct)}
          >
            {isFavorites ? (
              <Icon icon={icons.favorites__filled[theme]} />
            ) : (
              <Icon icon={icons.favorites[theme]} />
            )}
          </button>
        </div>

        {/* SPECIFICATIONS */}
        <div className="detailsPage__container-specifications">
          <div className="detailsPage__block">
            <span className="detailsPage__info">Screen</span>
            <span className="detailsPage__value">{selectedProduct.screen}</span>
          </div>
          <div className="detailsPage__block">
            <span className="detailsPage__info">Resolution</span>
            <span className="detailsPage__value">
              {selectedProduct.resolution}
            </span>
          </div>
          <div className="detailsPage__block">
            <span className="detailsPage__info">Processor</span>
            <span className="detailsPage__value">
              {selectedProduct.processor}
            </span>
          </div>
          <div className="detailsPage__block">
            <span className="detailsPage__info">RAM</span>
            <span className="detailsPage__value">{selectedProduct.ram}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
