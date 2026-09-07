import { useContext, useEffect, useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { ProductFull } from '../../../../types/Product_full';
import { ProductContext } from '../../../../store/ProductContext';
import { SpecList } from '../../../shared/SpecList/SpecList';
import { NavLink } from 'react-router-dom';
import styles from './MainInfo.module.scss';

type Props = {
  product: ProductFull;
};

const COLOR_MAP: Record<string, string> = {
  midnightgreen: 'darkgreen',
  spacegray: 'gray',
  midnight: 'darkblue',
  sierrablue: '#99b7e3',
  graphite: '#4b4b4b',
  spaceblack: '#1c1c1e',
  starlight: '#f5f5dc',
  'rose gold': '#b76e79',
  rosegold: '#b76e79',
  'sky blue': 'red',
};

export const MainInfo: React.FC<Props> = ({ product }) => {
  const { cartIds, handleCart, favsIds, handleFavs } =
    useContext(ProductContext);

  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    product.capacity,
  );

  useEffect(() => {
    setSelectedColor(product.color);
    setSelectedCapacity(product.capacity);
  }, [product.color, product.capacity]);

  return (
    <div className={styles.mainInfo}>
      <div className={styles.mainInfo__colors}>
        <p className={styles.mainInfo__colorsLabel}>Available colors</p>
        <ul className={styles.mainInfo__colorsList}>
          {product.colorsAvailable.map(color => (
            <li key={color} className={styles.mainInfo__colorsItem}>
              <NavLink
                onClick={e => selectedColor === color && e.preventDefault()}
                to={`/${product.category}/${product.namespaceId}-${product.capacity.toLowerCase()}-${color.replace(' ', '-')}`}
                style={{
                  backgroundColor: COLOR_MAP[color.toLowerCase()] ?? color,
                }}
                title={color}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.mainInfo__colorsLink} ${styles['mainInfo__colorsLink--active']}`
                    : styles.mainInfo__colorsLink
                }
              ></NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mainInfo__capacity}>
        <p className={styles.mainInfo__capacityLabel}>Select capacity</p>
        <ul className={styles.mainInfo__colorsList}>
          {product.capacityAvailable.map(capacity => (
            <li key={capacity} className={styles.mainInfo__capacityItem}>
              <NavLink
                onClick={e =>
                  selectedCapacity === capacity && e.preventDefault()
                }
                to={`/${product.category}/${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.mainInfo__capacityLink} ${styles['mainInfo__capacityLink--active']}`
                    : styles.mainInfo__capacityLink
                }
              >
                {capacity.replace('GB', ' GB')}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <h3 className={styles.mainInfo__price}>
        ${product.priceDiscount}{' '}
        <span className={styles.mainInfo__oldPrice}>
          ${product.priceRegular}
        </span>
      </h3>
      <div className={styles.mainInfo__buttons}>
        <Button
          textContent={
            cartIds.includes(product.id) ? 'Added to cart' : 'Add to cart'
          }
          className={
            [
              'cartBig',
              cartIds.includes(product.id) && 'cartBig--active',
            ].filter(Boolean) as string[]
          }
          onClick={() => handleCart(product)}
        />
        <Button
          textContent=""
          className={
            ['favBig', favsIds.includes(product.id) && 'favBig--active'].filter(
              Boolean,
            ) as string[]
          }
          onClick={() => handleFavs(product)}
        />
      </div>
      <SpecList product={product} specsToShow={4} />
    </div>
  );
};
