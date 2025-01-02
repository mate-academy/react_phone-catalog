import './ProductContentTop.scss';
import { NavLink } from 'react-router-dom';
import { SpecificProduct } from '../../../../types/SpecificProduct';
import { useContext, useState } from 'react';
import { colors } from '../../../../constants/colors';
import { GlobalContext } from '../../../../store/GlobalContext';
import { Icon } from '../../../shared/Icon';
import { iconsObject } from '../../../../constants/iconsObject';
import { Product } from '../../../../types/Product';
import classNames from 'classnames';

const getProductBySelectedProductId = (
  products: Product[],
  selectedProductId: string,
) => {
  return products.find(product => product.itemId === selectedProductId);
};

type Props = {
  selectedProduct: SpecificProduct;
  specificProducts: SpecificProduct[];
};

export const ProductContentTop: React.FC<Props> = ({
  selectedProduct,
  specificProducts,
}) => {
  const { allProducts, cart, favorites, toggleFavorites, addToCart, theme } =
    useContext(GlobalContext);

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const handleShoppingCard = (currentProduct: SpecificProduct) => {
    const productToAdd = getProductBySelectedProductId(
      allProducts,
      currentProduct.id,
    );

    if (productToAdd) {
      addToCart(productToAdd);
    }
  };

  const handleFavorites = (currentProduct: SpecificProduct) => {
    const favoriteProduct = getProductBySelectedProductId(
      allProducts,
      currentProduct.id,
    );

    if (favoriteProduct) {
      toggleFavorites(favoriteProduct);
    }
  };

  const getLink = (option: string, value: string) => {
    const {
      color: itemColor,
      namespaceId: itemNamespaceId,
      capacity: itemCapacity,
    } = selectedProduct;

    const el = specificProducts.find(({ color, namespaceId, capacity }) => {
      return (
        namespaceId === itemNamespaceId &&
        ((option === 'color' && color === value && capacity === itemCapacity) ||
          (option === 'capacity' && capacity === value && color === itemColor))
      );
    });

    return el?.id ?? '';
  };

  const isInCart = cart.some(item => item.id === selectedProduct.id);

  const isFavorites = favorites.some(
    item => item.itemId === selectedProduct.id,
  );

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
              src={`/${image}`}
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
            src={`/${image}`}
            alt={`Selected Photo ${index + 1}`}
            className={classNames('detailsPage__image', {
              'detailsPage__image--active': selectedPhoto === index,
            })}
          />
        ))}
      </div>

      <div className="detailsPage__characteristics">
        <div className="detailsPage__colors">
          <span
            className="
              detailsPage__colors-title detailsPage__info"
          >
            Available colors
          </span>
          <ul className="detailsPage__colors-list">
            {selectedProduct.colorsAvailable.map(color => (
              <NavLink
                key={color}
                to={`/${selectedProduct.category}/${getLink('color', color)}`}
              >
                <li
                  key={color}
                  className={classNames('detailsPage__color-item', {
                    'detailsPage__color-item--selected':
                      selectedProduct.color === color,
                  })}
                >
                  <span
                    className="detailsPage__color-circle"
                    style={{ backgroundColor: colors[color] }}
                  ></span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="detailsPage__line"></div>

        <div className="detailsPage__capacity">
          <span
            className="
                detailsPage__capacity-title detailsPage__info"
          >
            Select capacity
          </span>
          <ul className="detailsPage__capacity-list">
            {selectedProduct.capacityAvailable.map(capacity => (
              <NavLink
                key={capacity}
                to={`/${selectedProduct.category}/${getLink('capacity', capacity)}`}
                style={{ textDecoration: 'none' }}
              >
                <li
                  key={capacity}
                  className={classNames('detailsPage__capacity-item', {
                    'detailsPage__capacity-item--selected':
                      selectedProduct.capacity === capacity,
                  })}
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
              </NavLink>
            ))}
          </ul>
        </div>

        <div className="detailsPage__line"></div>

        <div className="detailsPage__container-price">
          <span className="detailsPage__price-discount">
            {`$${selectedProduct.priceDiscount}`}
          </span>
          <span className="detailsPage__price-regular">
            {`$${selectedProduct.priceRegular}`}
          </span>
        </div>

        <div className="detailsPage__container-buttons">
          <button
            className={classNames(
              'detailsPage__button',
              'detailsPage__button-card',
              { 'detailsPage__button-card--active': isInCart },
            )}
            onClick={() => handleShoppingCard(selectedProduct)}
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
              <Icon icon={iconsObject.favorites__filled} />
            ) : theme === 'light' ? (
              <Icon icon={iconsObject.favorites} />
            ) : (
              <Icon icon={iconsObject.favorites_dark} />
            )}
          </button>
        </div>

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
