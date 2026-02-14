import styles from './ProductCharacteristics.module.scss';
import { Products } from '../../../types/Products';
import { TypeGadget } from '../../../types/Gadget';
import { ProductPhoto } from '../ProductPhoto';
import { ParameterSelector } from '../ParameterSelector';
import { About } from '../About';
import { TechSpecs } from '../TechSpecs';

interface Props {
  products: Products;
  gadget: TypeGadget;
}

export const ProductCharacteristics: React.FC<Props> = ({
  products,
  gadget,
}) => {
  const {
    name,
    capacity,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    cell,
  } = gadget;

  const descriptionProduct = [
    { title: 'Sreen', value: screen },
    { title: 'Resolution', value: resolution },
    { title: 'Processor', value: processor },
    { title: 'RAM', value: ram },
    { title: 'Built in memory', value: capacity },
    'camera' in gadget && { title: 'Camera', value: gadget.camera },
    'zoom' in gadget && { title: 'Zoom', value: gadget.zoom },
    { title: 'Cell', value: cell },
  ].filter(Boolean) as { title: string; value: string }[];

  return (
    <section className={styles['product-characteristics']}>
      <h2 className={styles['product-characteristics__title']}>{name}</h2>

      <div className={styles['product-characteristics__details']}>
        <ProductPhoto photos={images} />
        <ParameterSelector gadget={gadget} products={products} />
        <About description={description} />
        <TechSpecs techSpecs={descriptionProduct} />
      </div>
    </section>
  );
};
