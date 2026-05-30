import { Specification } from '../Specification';

import { Item } from '../../types/Item';

import styles from './ProductSpecs.module.scss';
const { specs, specs__titleBlock, specs__title, specs__line, specs__group } =
  styles;

type ProductSpecsProps = {
  product: Item;
};

export const ProductSpecs = ({ product }: ProductSpecsProps) => {
  return (
    <div className={specs}>
      <div className={specs__titleBlock}>
        <h3 className={specs__title}>Tech specs</h3>

        <div className={specs__line} />
      </div>

      <div className={specs__group}>
        <Specification
          label="Screen"
          value={product.screen}
          context="spec__page"
        />
        <Specification
          label="Resolution"
          value={product.resolution}
          context="spec__page"
        />
        <Specification
          label="Processor"
          value={product.processor}
          context="spec__page"
        />
        <Specification label="RAM" value={product.ram} context="spec__page" />
        <Specification
          label="Built in memory"
          value={product.capacity}
          context="spec__page"
        />
        <Specification
          label="Camera"
          value={product.camera}
          context="spec__page"
        />
        <Specification label="Zoom" value={product.zoom} context="spec__page" />
        <Specification label="Cell" value={product.cell} context="spec__page" />
      </div>
    </div>
  );
};
