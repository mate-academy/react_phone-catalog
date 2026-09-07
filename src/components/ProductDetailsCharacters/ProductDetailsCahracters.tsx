import { Link } from 'react-router-dom';
import { useState } from 'react'; // Імпортуємо useState
import { Accessory } from '../../types/AccessorieTypes';
import { Phone } from '../../types/PhoneTypes';
import { Tablet } from '../../types/TabletType';
import styles from '../ProductDetailsCharacters/ProductDetailsCharacters.module.scss';

type Props = {
  product: Phone | Tablet | Accessory;
};

export const ProductDetailsCharacters: React.FC<Props> = ({ product }) => {
  const [activeColor, setActiveColor] = useState<string | null>(product.color || null);
  const [activeCapacity, setActiveCapacity] = useState<string | null>(
    'capacity' in product && product.capacity ? product.capacity : null,
  );

  return (
    <>
      <div className={styles.availableColorsContainer}>
        <p className={styles.availableColors}>Available colors</p>
        <div className={styles.colorsContainer}>
          {product.colorsAvailable.map(color => {
            let displayColor = color;
            const capacityPart =
              'capacity' in product && product.capacity ? `-${product.capacity.toLowerCase()}` : '';
            const link = `/${product.category}/${product.namespaceId}${capacityPart}-${color.replace(/\s+/g, '-')}`;
            const isActive = activeColor === color;

            switch (color) {
              case 'midnight':
                displayColor = 'rgb(8,8,38)';
                break;
              case 'yellow':
                displayColor = 'rgb(255,249,82)';
                break;
              case 'purple':
                displayColor = 'rgb(233,194,255)';
                break;
              case 'gold':
                displayColor = 'rgb(236,214,182)';
                break;
              case 'sierrablue':
                displayColor = 'rgb(151,184,206)';
                break;
              case 'graphite':
                displayColor = 'rgb(71,74,81)';
                break;
              case 'blue':
                displayColor = 'rgb(10,97,138)';
                break;
              case 'rosegold':
                displayColor = 'rgb(233,188,180)';
                break;
              case 'spacegray':
                displayColor = 'rgb(65,74,76)';
                break;
              case 'starlight':
                displayColor = 'rgb(207,206,196)';
                break;
              case 'sky blue':
                displayColor = 'rgb(184,203,224)';
                break;
              case 'green':
                displayColor = 'rgb(200,211,171)';
                break;
              case 'rose gold':
                displayColor = 'rgb(243,195,210)';
                break;
              case 'space gray':
                displayColor = 'rgb(107,107,107)';
                break;
              default:
                break;
            }

            return (
              <Link
                to={link}
                key={color}
                className={`${styles.colorCircle} ${isActive ? styles.colorCircleActive : ''}`}
                style={{ backgroundColor: displayColor }}
                title={color}
                onClick={() => setActiveColor(color)}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.availableCapacityContainer}>
        <p className={styles.availableCapacity}>Select capacity</p>
        <div className={styles.availableCapacityButtons}>
          {product.capacityAvailable &&
            product.capacityAvailable.map(newCapacity => {
              const capacityPartForLink =
                'capacity' in product && product.capacity
                  ? `-${newCapacity.toLowerCase()}`
                  : `-${newCapacity.toLowerCase()}`;
              const link = `/${product.category}/${product.namespaceId}${capacityPartForLink}-${product.color.replace(/\s+/g, '-')}`;
              const isActiveCapacity = activeCapacity === newCapacity;

              return (
                <Link
                  to={link}
                  key={newCapacity}
                  className={`${styles.capacityButton} ${isActiveCapacity ? styles.capacityButtonActive : ''}`}
                  onClick={() => setActiveCapacity(newCapacity)}
                >
                  {newCapacity}
                </Link>
              );
            })}
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};
