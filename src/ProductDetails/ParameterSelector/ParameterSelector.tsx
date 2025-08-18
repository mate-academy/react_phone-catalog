import { TypeGadget } from './../../types/Gadget';
import { AvailableColors } from '../AvailableColors/AvailableColors';
import { Products } from './../../types/Products';
import style from './ParameterSelector.module.scss';
import { SelectCapacity } from '../SelectCapacity/SelectCapacity';
import { AddSelection } from './../../component/AddSelection/AddSelection';

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
    <div className={style['parameter-selector']}>
      <AvailableColors colors={colorsAvailable} currentColor={color} />

      <SelectCapacity capacity={capacityAvailable} activeCapacity={capacity} />

      <div className={style['parameter-selector__price']}>
        <p className={style['parameter-selector__price--discount']}>
          {priceDiscount}$
        </p>
        <p className={style['parameter-selector__price--full']}>
          {priceRegular}$
        </p>
      </div>

      <AddSelection
        product={products}
        className={style['parameter-selector__button']}
      />

      <ul className={style['parameter-selector__list']}>
        {details.map(property => (
          <li className={style['parameter-selector__item']} key={property.term}>
            <p className={style['parameter-selector__term']}>{property.term}</p>
            <p className={style['parameter-selector__desc']}>{property.desc}</p>
          </li>
        ))}
      </ul>

      <p className={style['parameter-selector__id']}>ID: {products.id}</p>
    </div>
  );
};
