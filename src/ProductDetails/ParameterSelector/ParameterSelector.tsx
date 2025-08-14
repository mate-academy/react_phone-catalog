import { TypeGadget } from './../../types/Gadget';
import { AvailableColors } from '../AvailableColors/AvailableColors';
import { Products } from './../../types/Products';
import style from './ParameterSelector.module.scss';

interface Props {
  gadget: TypeGadget;
  products: Products;
}

export const ParameterSelector: React.FC<Props> = ({ gadget, products }) => {
  const { colorsAvailable, color } = gadget;

  return (
    <div className={style['parameter-selector']}>
      <AvailableColors colors={colorsAvailable} currentColor={color} />
      <p className={style['parameter-selector__id']}>ID: {products.id}</p>
    </div>
  );
};
