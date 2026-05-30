import { Products } from '../../../types/Products';
import { TypeGadget } from '../../../types/Gadget';
import styles from './ParameterSelector.module.scss';
import { AvailableColors } from '../AvailableColors';
import { SelectCapacity } from '../SelectCapacity';
import { AddSelection } from '../../components/AddSelection/AddSelection';

interface Props {
  gadget: TypeGadget;
  products: Products;
}
export const ParameterSelector: React.FC<Props> = ({ gadget, products }) => {
  const {
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    screen,
    resolution,
    processor,
    ram,
  } = gadget;

  const details = [
    { term: 'Screen', desc: screen },
    { term: 'Resolution', desc: resolution },
    { term: 'Processor', desc: processor },
    { term: 'RAM', desc: ram },
  ];

  return (
    <div className={styles['parameter-selector']}>
      <AvailableColors colors={colorsAvailable} currentColor={color} />

      <SelectCapacity capacity={capacityAvailable} activeCapacity={capacity} />

      <div className={styles['parameter-selector__price']}>
        <p className={styles['parameter-selector__price--discount']}>
          {priceDiscount}$
        </p>
        <p className={styles['parameter-selector__price--full']}>
          {priceRegular}$
        </p>
      </div>

      <AddSelection
        product={products}
        className={styles['parameter-selector__button']}
      />

      <ul className={styles['parameter-selector__list']}>
        {details.map(property => (
          <li
            className={styles['parameter-selector__item']}
            key={property.term}
          >
            <p className={styles['parameter-selector__term']}>
              {property.term}
            </p>
            <p className={styles['parameter-selector__desc']}>
              {property.desc}
            </p>
          </li>
        ))}
      </ul>
      <p className={styles['parameter-selector__id']}>ID: {products.id}</p>
    </div>
  );
};
