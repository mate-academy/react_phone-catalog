import { TypeGadget } from './../../types/Gadget';
import style from './ProductCharacteristics.module.scss';
import { Products } from './../../types/Products';

interface Props {
  products: Products;
  gadget: TypeGadget;
}

export const ProductCharacteristics: React.FC<Props> = ({ gadget }) => {
  const { name } = gadget;

  return (
    <section className={style.ProductCharacteristics}>
      <h2 className={style.ProductCharacteristics__title}>{name}</h2>
      <div></div>
    </section>
  );
};
