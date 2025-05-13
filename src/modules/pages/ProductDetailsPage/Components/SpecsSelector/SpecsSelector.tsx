import classNames from 'classnames';
import { Item } from '../../../../../types/item';
import styles from './SpecsSelector.module.scss';
import AddButtons from '../../../../shared/components/AddButtons';
// eslint-disable-next-line max-len
import { capitalize } from '../../../../shared/components/CategoryPage/CategoryPage';

type Props = {
  item: Item;
  handleSpecChange: (
    item: Item,
    { color, storage }: { color?: string; storage?: string },
  ) => void;
};

type ColorMap = {
  [key: string]: string;
};

export const SpecsSelector: React.FC<Props> = ({ item, handleSpecChange }) => {
  const colors: ColorMap = {
    black: '#000000',
    green: '#28a745',
    yellow: '#fff1ba',
    purple: '#c37fde',
    red: '#dc3545',
    spacegray: '#575553',
    midnightgreen: '#4a544c',
    gold: '#FCDBC1',
    white: '#f8ebe1',
    rosegold: '#ecc5bc',
    midnight: '#1a222b',
    sierrablue: '#9dbad5',
    graphite: '#464541',
  };

  type StringSpecKey = 'screen' | 'resolution' | 'processor' | 'ram';

  const descriptionSpecs: StringSpecKey[] = [
    'screen',
    'resolution',
    'processor',
    'ram',
  ];

  return (
    <div className={styles.selector}>
      <div className={styles.selector__controls}>
        <span>
          <p className={`small--text ${styles.smallText}`}>Available colors</p>
          <div className={styles.selector__colors}>
            {item.colorsAvailable.map((color, i) => {
              return (
                <div
                  key={i}
                  style={{ backgroundColor: colors[color] || color }}
                  className={classNames(styles['selector__colors--color'], {
                    [styles['selector__colors--color--active']]:
                      color === item.color,
                  })}
                  onClick={() => handleSpecChange(item, { color: color })}
                />
              );
            })}
          </div>
        </span>
        <hr />
        <span>
          <p className={`small--text ${styles.smallText}`}>Select capacity</p>
          <div className={styles.selector__storage}>
            {item.capacityAvailable.map((storage, i) => {
              return (
                <div
                  key={i}
                  className={classNames(styles['selector__storage--item'], {
                    [styles['selector__storage--item--active']]:
                      storage === item.capacity,
                  })}
                  onClick={() => handleSpecChange(item, { storage: storage })}
                >
                  {storage}
                </div>
              );
            })}
          </div>
        </span>
        <hr />
      </div>
      <div className={styles.selector__buttons}>
        <div className={styles.selector__price}>
          <h3>{`$${item.priceDiscount}`}</h3>
          <h3
            className={styles['selector__price--discount']}
          >{`$${item.priceRegular}`}</h3>
        </div>
        <AddButtons />
      </div>
      <div className={styles.selector__description}>
        {descriptionSpecs.map((spec, i) => (
          <div key={i} className={styles['selector__description--item']}>
            <p
              className="small--text"
              style={{ color: 'rgba(137, 147, 154, 1)' }}
            >
              {spec === 'ram' ? spec.toUpperCase() : capitalize(spec)}
            </p>
            <p className={styles['selector__description--specsText']}>
              {item[spec]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecsSelector;
