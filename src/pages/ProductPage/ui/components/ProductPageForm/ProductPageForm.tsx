import { memo, useCallback, useMemo, useState } from 'react';
import cls from './productPageForm.module.scss';
import classNames from 'classnames';
import {
  Button,
  ButtonSize,
  ButtonTheme,
  FormItem,
  FormLine,
  RadioButton,
  RadioButtonTheme,
} from '../../../../../shared/ui/forms';
import { ProductDetails } from '../../../model/types/productDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import icons from '../../../../../shared/styles/icons.module.scss';
import { TechSpecs } from '../../../../../shared/ui/TechSpecs';
import { useToggleCardActions } from '../../../../../entities/Product';

interface Props {
  className?: string;
  product: ProductDetails;
}

export const ProductPageForm = memo(({ className, product }: Props) => {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    namespaceId,
    colorsAvailable,
    capacityAvailable,
    color,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    cartItem,
    favorite,
  } = product;

  const [favoriteItem, setFavoriteItem] = useState<boolean>(favorite);
  const [currentCartItem, setCurrentCartItem] = useState<boolean>(cartItem);

  const [toggleFavorite, toggleCart] = useToggleCardActions();

  const toggleFavoriteHandler = () => {
    setFavoriteItem(prev => !prev);
    toggleFavorite(itemId as string);
  };

  const toggleCartItemHandler = () => {
    setCurrentCartItem(prev => !prev);
    toggleCart(itemId as string);
  };

  const normalizeCapacityValue = (capacityValue: string) =>
    capacityValue.replace(/(\d+)([a-zA-Z]+)/, '$1 $2');

  const normalizePrice = (price: number) => '$' + price;

  const replaceProduct = useCallback(
    (newProductId: string) => {
      const pathSegments = location.pathname.split('/');
      const productIndex = pathSegments.findIndex(
        segment => segment === itemId,
      );

      if (productIndex !== -1) {
        pathSegments[productIndex] = newProductId;
      }

      const newPath = pathSegments.join('/');

      navigate(newPath);
    },
    [itemId, location.pathname, navigate],
  );

  const changeColorHandler = useCallback(
    (newColor: string) => {
      const newProductId = `${namespaceId}-${capacity.toLocaleLowerCase()}-${newColor}`;

      replaceProduct(newProductId);
    },
    [capacity, namespaceId, replaceProduct],
  );

  const changeCapacityHandler = useCallback(
    (newCapacity: string) => {
      const newProductId = `${namespaceId}-${newCapacity.toLocaleLowerCase()}-${color}`;

      replaceProduct(newProductId);
    },
    [color, namespaceId, replaceProduct],
  );

  const colors = useMemo(
    () =>
      colorsAvailable.map(colorAvailable => (
        <RadioButton
          key={colorAvailable}
          value={colorAvailable}
          color={colorAvailable}
          checked={color === colorAvailable}
          onChange={changeColorHandler}
          name="colors"
        />
      )),
    [changeColorHandler, color, colorsAvailable],
  );

  const capacityList = useMemo(
    () =>
      capacityAvailable.map(item => (
        <RadioButton
          key={item}
          value={item}
          text={normalizeCapacityValue(item)}
          checked={item === capacity}
          onChange={changeCapacityHandler}
          name="capacity"
          theme={RadioButtonTheme.SQUARE}
        />
      )),
    [capacity, capacityAvailable, changeCapacityHandler],
  );

  const techSpecsForm = { screen, resolution, processor, ram };

  return (
    <div className={className}>
      <form className={classNames(cls.productPageForm, className)}>
        <FormItem label="Available colors" className={cls.formItem}>
          <FormLine wrap>{colors}</FormLine>
        </FormItem>

        <FormItem label="Select capacity" className={cls.formItem}>
          <FormLine wrap>{capacityList}</FormLine>
        </FormItem>

        <FormItem>
          <FormLine>
            {priceDiscount ? (
              <>
                <span className={cls.pricePrimary}>
                  {normalizePrice(priceDiscount)}
                </span>
                <span className={cls.priceSecondary}>
                  {normalizePrice(priceRegular)}
                </span>
              </>
            ) : (
              <span className={cls.pricePrimary}>
                {normalizePrice(priceRegular)}
              </span>
            )}
          </FormLine>
          <FormLine>
            <Button
              onClick={toggleCartItemHandler}
              selected={currentCartItem}
              size={ButtonSize.FULL}
            >
              {currentCartItem ? 'Added to cart' : 'Add to cart'}
            </Button>
            <Button
              onClick={toggleFavoriteHandler}
              size={ButtonSize.L}
              className={classNames({
                [icons['_icon-heart']]: !favoriteItem,
                [icons['_icon-heart_like']]: favoriteItem,
              })}
              theme={ButtonTheme.SQUARE_FAV}
              selected={favoriteItem}
            ></Button>
          </FormLine>
        </FormItem>

        <FormItem>
          <TechSpecs techSpecs={techSpecsForm} />
        </FormItem>
      </form>
    </div>
  );
});
