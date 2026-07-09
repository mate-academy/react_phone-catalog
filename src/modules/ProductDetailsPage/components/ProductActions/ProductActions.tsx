import React, { useMemo } from 'react';
import styles from './ProductActions.module.scss';
import { Selector } from '../../../../components/Selector';
import { Button } from '../../../../components/Button';
import { Icon } from '../../../../components/Icon';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import { getSpecs } from '../../utils/getSpecs';
import { useNavigate } from 'react-router-dom';
import { useProductActions } from '../../../shared/hooks/useProductActions';
import classNames from 'classnames';

interface Props {
  product: ProductDetails;
}

export const ProductActions: React.FC<Props> = ({ product }) => {
  const { isInCart, isInFavorites, handleCartAction, handleFavoritesAction } =
    useProductActions(product);

  const navigate = useNavigate();

  const displayedSpecs = useMemo(() => {
    const allSpecs = getSpecs(product);

    return allSpecs.filter(spec => spec.value).slice(0, 4);
  }, [product]);

  const updateProductUrl = (newCapacity?: string, newColor?: string) => {
    const capacity = (newCapacity || product.capacity).toLowerCase();
    const color = (newColor || product.color).toLowerCase().replace(/\s+/g, '-');

    const newProductId = `${product.namespaceId}-${capacity}-${color}`;

    navigate(`/${product.category}/${newProductId}`);
  };

  const handleColorChange = (color: string) => updateProductUrl(undefined, color);
  const handleCapacityChange = (capacity: string) => updateProductUrl(capacity, undefined);

  return (
    <div className={styles.mainSpecs}>
      <div className={styles.selector}>
        <span className={classNames(styles.sectionLabel, 'small-text')}>Available colors</span>
        <Selector
          type="color"
          options={product.colorsAvailable}
          selectedOption={product.color}
          onSelect={handleColorChange}
        />
      </div>

      <div className={styles.selector}>
        <span className={classNames(styles.sectionLabel, 'small-text')}>Select capacity</span>
        <Selector
          type="text"
          options={product.capacityAvailable}
          selectedOption={product.capacity}
          onSelect={handleCapacityChange}
        />
      </div>

      <div className={styles.price}>
        <h2>{`$${product.priceDiscount || product.priceRegular}`}</h2>

        {product.priceDiscount && (
          <h2 className={styles.priceRegular}>{`$${product.priceRegular}`}</h2>
        )}
      </div>

      <div className={styles.buttonBlock}>
        <Button variant="primary" selected={isInCart} onClick={handleCartAction}>
          <div>{isInCart ? 'Added' : 'Add to cart'}</div>
        </Button>
        <Button variant="favorite" selected={isInFavorites} onClick={handleFavoritesAction}>
          <Icon variant="heart" selected={isInFavorites} />
        </Button>
      </div>

      <div>
        {displayedSpecs.map(({ label, value }) => (
          <div className={styles.specRow} key={label}>
            <span className="small-text">{label}</span>
            <span className={classNames(styles.specValue, 'small-text')}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
