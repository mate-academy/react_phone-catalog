import { useNavigate } from 'react-router-dom';
import { ColorRadio } from '../../../shared/components/ColorRadio';
import { Product } from '../../../shared/types/types';
import { separateValueFromUnit } from '../../../shared/functions';
import { DecorativeLine } from '../../../shared/components/DecorativeLine';
import styles from './ProductDetailsControls.module.scss';
import classNames from 'classnames';
import { TextRadio } from '../TextRadio/TextRadio';
import { Button } from '../../../shared/components/Button';
import { FavouriteButton } from '../../../shared/components/FavouriteButton';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { Category } from '../../../shared/types/enums';
import { useCart } from '../../../shared/components/Contexts/CartContext';
import { useMemo } from 'react';
import { getColorValue } from '../../functions';
import { ProductDetails } from '../../types';

type Props = {
  productDetails: ProductDetails;
  product: Product;
  className?: string;
};

export const ProductDetailsControls: React.FC<Props> = ({
  productDetails,
  product,
  className,
}) => {
  const { cart, handleProductAdd } = useCart();

  const {
    selectColor,
    selectCapacity,
    selectSize,
    screen: screenLabel,
    resolution: resolutionLabel,
    processor: processorLabel,
    ram: ramLabel,
    addToCart,
    addedToCart,
  } = useLanguage().localeTexts;

  const {
    namespaceId,
    category,
    screen,
    resolution,
    processor,
    capacity,
    ram,
    color,
    colorsAvailable,
    capacityAvailable,
  } = productDetails;

  const navigate = useNavigate();

  const replaceSpaceWithDash = (text: string): string =>
    text.split(' ').join('-');

  const getUnitValue = (unit: string): number => {
    switch (unit) {
      case 'GB':
        return 1;
      case 'TB':
        return 2;
      default:
        return 0;
    }
  };

  const compareCapacity = (
    firstCapacity: string,
    secondCapacity: string,
  ): number => {
    const firstCapacityInfo = separateValueFromUnit(firstCapacity).split(' ');
    const secondCapacityInfo = separateValueFromUnit(secondCapacity).split(' ');

    const firstCapacityUnit = getUnitValue(firstCapacityInfo[1]);
    const secondCapacityUnit = getUnitValue(secondCapacityInfo[1]);

    if (firstCapacityUnit !== secondCapacityUnit) {
      return firstCapacityUnit - secondCapacityUnit;
    } else {
      const firstCapacityValue = parseFloat(firstCapacityInfo[0]);
      const secondCapacityValue = parseFloat(secondCapacityInfo[0]);

      return firstCapacityValue - secondCapacityValue;
    }
  };

  const handleColorChange = (newColor: string) => {
    navigate(`../${[namespaceId, capacity.toLowerCase(), newColor].join('-')}`);
  };

  const handleCapacityChange = (newCapacity: string) => {
    navigate(
      `../${[namespaceId, newCapacity.toLowerCase(), replaceSpaceWithDash(color)].join('-')}`,
    );
  };

  const handleAddToCartButtonClick = () => {
    handleProductAdd(product);
  };

  const isInCart = useMemo(
    () => cart.some(productInCart => productInCart.id === product.itemId),
    [cart, product.itemId],
  );

  return (
    <section className={classNames(styles.ProductDetailsControls, className)}>
      <ColorRadio
        title={selectColor}
        options={colorsAvailable.sort().map(colorOption => ({
          label: colorOption,
          value: replaceSpaceWithDash(colorOption),
          colorValue: getColorValue(colorOption),
        }))}
        chosenColor={replaceSpaceWithDash(color)}
        onChange={handleColorChange}
      />

      <DecorativeLine />

      <TextRadio
        title={category === Category.Accessories ? selectSize : selectCapacity}
        options={capacityAvailable
          .sort(compareCapacity)
          .map(capacityOption => ({
            label: separateValueFromUnit(capacityOption),
            value: capacityOption,
          }))}
        chosenOption={capacity}
        onChange={handleCapacityChange}
      />

      <DecorativeLine className={styles.SecondLine} />

      <div className={styles.MainControls}>
        <div className={styles.Prices}>
          <strong className={styles.Price}>{`$${product.price}`}</strong>

          {product.price !== product.fullPrice && (
            <del
              data-content={`$${product.fullPrice}`}
              className={styles.Discount}
            >{`$${product.fullPrice}`}</del>
          )}
        </div>

        <div className={styles.Buttons}>
          <Button
            text={isInCart ? addedToCart : addToCart}
            onClick={handleAddToCartButtonClick}
            active={isInCart}
            className={styles.AddToCartButton}
          />

          <FavouriteButton
            product={product}
            className={styles.FavouriteButton}
          />
        </div>
      </div>

      <ul className={styles.Parameters}>
        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{screenLabel}</p>
          <p className={styles.ParameterValue}>{screen}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{resolutionLabel}</p>
          <p className={styles.ParameterValue}>{resolution}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{processorLabel}</p>
          <p className={styles.ParameterValue}>{processor}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{ramLabel}</p>
          <p className={styles.ParameterValue}>{separateValueFromUnit(ram)}</p>
        </li>
      </ul>
    </section>
  );
};
