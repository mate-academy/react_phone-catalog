import { TypeGadget } from './../../types/Gadget';
import style from './ProductCharacteristics.module.scss';
import { Products } from './../../types/Products';
import { ProductPhoto } from '../ProductPhoto';
import { ParameterSelector } from '../ParameterSelector/ParameterSelector';

interface Props {
  products: Products;
  gadget: TypeGadget;
}

export const ProductCharacteristics: React.FC<Props> = ({
  gadget,
  products,
}) => {
  const { name, images } = gadget;

  return (
    <section className={style.ProductCharacteristics}>
      <h2 className={style.ProductCharacteristics__title}>{name}</h2>
      <div className={style.ProductCharacteristics__details}>
        <ProductPhoto photos={images} />
        <ParameterSelector gadget={gadget} products={products} />
      </div>
    </section>
  );
};
