import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { ICartItem, IProduct, IProductDetails } from '../../types';
import { Price } from '../Price';
import { BuyButtons } from '../BuyButtons';
import { TechSpecs } from '../TechSpecs';
import { getColor, getNewProductPath } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartActions from '../../slices/cartSlice';
import * as favouritesActions from '../../slices/favouritesSlice';

import './ProductInfoSection.scss';

type Props = {
  product: IProduct;
  productDetails: IProductDetails;
};

export const ProductInfoSection: React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector(state => state.cartItems);
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const availableColors: string[] = productDetails.colorsAvailable;
  const availableCapacities: string[] = productDetails.capacityAvailable;

  const currentCartItem = useMemo(
    () => cartItems.find(item => item.product.itemId === product.itemId),
    [cartItems, product],
  );
  const hasInFavourites = useMemo(
    () => !!favouritesItems.find(item => item.itemId === product.itemId),
    [favouritesItems, product],
  );
  const smallTechSpecs = useMemo(
    () => ({
      Screen: productDetails.screen,
      Resolution: productDetails.resolution,
      Processor: productDetails.processor,
      RAM: productDetails.ram,
    }),
    [productDetails],
  );

  const selectNewProduct = useCallback(
    (capacity: string, color: string) => {
      navigate(getNewProductPath(productDetails.namespaceId, capacity, color));
    },
    [navigate, productDetails],
  );

  const handleAddToCart = useCallback(() => {
    if (currentCartItem) {
      dispatch(cartActions.deleteItem(currentCartItem.id));
    } else {
      const cartItem: ICartItem = {
        id: String(new Date().valueOf()),
        quantity: 1,
        product,
      };

      dispatch(cartActions.addItem(cartItem));
    }
  }, [dispatch, product, currentCartItem]);

  const handleAddToFavorites = useCallback(() => {
    if (hasInFavourites) {
      dispatch(favouritesActions.deleteItem(product.itemId));
    } else {
      dispatch(favouritesActions.addItem(product));
    }
  }, [dispatch, hasInFavourites, product]);

  useEffect(() => {
    setSelectedColor(productDetails.color || '');
    setSelectedCapacity(productDetails.capacity || '');
  }, [productDetails]);

  return (
    <section className="product-info">
      <div className="product-info__main">
        {!!availableColors.length && (
          <div className="product-info__available-colors">
            <div className="product-info__titles-container">
              <p className="product-info__title">Available colors</p>
              <p
                className="
                  product-info__id
                  product-info__id--on-small-screens
                "
              >
                {`ID: ${product.id}`}
              </p>
            </div>

            <div className="available-colors">
              {availableColors.map(color => (
                <span
                  key={color}
                  className={cn(
                    'available-colors__circle',
                    'available-colors__circle--big',
                    {
                      'available-colors__circle--selected':
                        color === selectedColor,
                    },
                  )}
                  role="presentation"
                  onClick={() => selectNewProduct(selectedCapacity, color)}
                >
                  <span
                    className="
                        available-colors__circle
                        available-colors__circle--small
                        "
                    style={{ backgroundColor: getColor(color) }}
                  />
                </span>
              ))}
            </div>
          </div>
        )}

        {!!availableCapacities.length && (
          <div className="product-info__capacity">
            <p className="product-info__title">Select capacity</p>

            <div className="capacities">
              {availableCapacities.map(capacity => (
                <span
                  key={capacity}
                  className={cn('capacities__item', {
                    'capacities__item--selected': capacity === selectedCapacity,
                  })}
                  role="presentation"
                  onClick={() => selectNewProduct(capacity, selectedColor)}
                >
                  {`${capacity}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {product && (
          <div className="product-info__buy">
            <Price
              discountPrice={product.price}
              fullPrice={product.fullPrice}
              priceFontSize={32}
            />
            <BuyButtons
              containerHeight={48}
              add={handleAddToCart}
              isAddButtonSelected={!!currentCartItem}
              like={handleAddToFavorites}
              isFavoriteButtonSelected={hasInFavourites}
            />
          </div>
        )}

        <TechSpecs classNames="product-info__specs" specs={smallTechSpecs} />
      </div>

      <p className="product-info__id">{`ID: ${product.id}`}</p>
    </section>
  );
};
