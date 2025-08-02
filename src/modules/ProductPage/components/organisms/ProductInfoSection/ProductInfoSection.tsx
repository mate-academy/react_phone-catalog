import React, { useMemo } from 'react';
import styles from './../../../ProductPage.module.scss';
import classNames from 'classnames';
import { HeartFilledIcon } from '../../../../../assets/icons/heart-filled-icon';
import { HeartIcon } from '../../../../../assets/icons/heart-icon';
import { Icon } from '../../../../shared/atoms/Icon';
import { Divider } from '../../../../shared/atoms/Divider';
import { Typography } from '../../../../shared/atoms/Typography';
import { ProductControls } from '../../../../shared/molecules/ProductControls';
import { ProductPrice } from '../../../../shared/molecules/ProductPrice';
import { ProductSpec } from '../../../../shared/molecules/ProductSpec';
import { CapacityButton } from '../../atoms/CapacityButton';
import { ColorButton } from '../../atoms/ColorButton/ColorButton';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { Product } from '../../../../../types/Product';
import { getVariantOptions } from '../../../../../helpers/getAvailabilityProducts';
import { toggleFavourite } from '../../../../../features/favouritesSlice';
import { add } from '../../../../../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { generateDeviceModel } from '../../../../../helpers/generateDeviceModel';
import { useTranslation } from 'react-i18next';
import { toast } from '../../../../NotificationToast';

type Props = {
  productDetails: ProductDetails;
  selectedProduct: Product;
};

export const ProductInfoSection: React.FC<Props> = ({
  productDetails,
  selectedProduct,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { favourites } = useAppSelector(state => state.favourites);
  const { cartItems } = useAppSelector(state => state.cart);
  const { products } = useAppSelector(state => state.products);

  const isInFavourites = useMemo(
    () => favourites.some(fav => fav.itemId === selectedProduct.itemId),
    [favourites, selectedProduct],
  );
  const isInCart = useMemo(
    () =>
      cartItems.some(cartItem => cartItem.itemId === selectedProduct.itemId),
    [cartItems, selectedProduct],
  );

  const { colorOptions, capacityOptions } = useMemo(
    () => getVariantOptions(productDetails, products),
    [productDetails, products],
  );

  const switchVariant = (newColor: string, newCapacity: string) => {
    const newItemId =
      `${productDetails.namespaceId}-${newCapacity}-${newColor}`.toLowerCase();

    if (products.find(product => product.itemId === newItemId)) {
      navigate(`/product/${newItemId}`);
    }
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(toggleFavourite(selectedProduct));
    toast({
      description: t(
        `notification.${isInFavourites ? 'remove' : 'add'}.favourites`,
        { name: selectedProduct.name },
      ),
    });
  };
  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(add(selectedProduct));
    toast({
      description: t(`notification.${isInCart ? 'remove' : 'add'}.cart`, {
        name: selectedProduct.name,
      }),
    });
  };

  const productModel = generateDeviceModel(selectedProduct.itemId);

  return (
    <div
      className={classNames(styles.product__interactive, styles.interactive)}
    >
      <div className={styles.interactive__colors}>
        <div className={styles.interactive__heading}>
          <Typography
            color="secondary"
            variant="small"
            className={styles.interactive__one}
          >
            {t('buttons.actions.product.colors')}
          </Typography>

          <Typography
            color="secondary"
            variant="small"
            className={styles.interactive__two}
          >
            ID: {productModel}
          </Typography>
        </div>
        <div className={styles.interactive__list}>
          {colorOptions.map(({ color, available }) => (
            <ColorButton
              key={color}
              isActive={color === productDetails?.color}
              isNotAvailable={!available}
              color={color}
              size="small"
              onClick={() => switchVariant(color, productDetails.capacity)}
            />
          ))}
        </div>
      </div>

      <div className={styles.interactive__buttons}>
        <div className={styles.interactive__buttons_up}>
          <Divider />
          <div className={styles.interactive__capacity}>
            <Typography color="secondary" variant="small">
              {t('buttons.actions.product.capacity')}
            </Typography>
            <div className={styles.interactive__list}>
              {capacityOptions.map(({ capacity, available }) => (
                <CapacityButton
                  key={capacity}
                  isAvailable={available}
                  isActive={capacity === productDetails?.capacity}
                  onClick={() => switchVariant(productDetails.color, capacity)}
                >
                  {capacity}
                </CapacityButton>
              ))}
            </div>
          </div>
          <Divider />
        </div>
        <div className={styles.interactive__buttons_middle}>
          <div className={styles.interactive__priceblock}>
            <ProductPrice
              price={productDetails?.priceDiscount}
              fullPrice={productDetails?.priceRegular}
              big
            />
            <ProductControls
              size="large"
              onAddToCart={addToCart}
              isInCart={isInCart}
              isFavourite={isInFavourites}
              onToggleFavourite={handleToggle}
              cartButtonText={t(
                `buttons.actions.${isInCart ? 'inCart' : 'toCart'}`,
              )}
              icon={
                <Icon>
                  {isInFavourites ? <HeartFilledIcon /> : <HeartIcon />}
                </Icon>
              }
            />
          </div>
        </div>
        <div className={styles.interactive__buttons_down}>
          <ProductSpec
            label={t('product.specifications.screen')}
            value={productDetails?.screen}
          />
          <ProductSpec
            label={t('product.specifications.resolution')}
            value={productDetails?.resolution}
          />
          <ProductSpec
            label={t('product.specifications.processor')}
            value={productDetails?.processor}
          />
          <ProductSpec
            label={t('product.specifications.ram')}
            value={productDetails?.ram}
          />
        </div>
      </div>
    </div>
  );
};
