import { ProductTechSpec } from '../../../../helpers/types/ProductTechSpec';
import { ProductSpec } from './ProductSpec';

type ProductSpecsListProps = {
  specs: ProductTechSpec[]
  isBig: boolean
  listClasses: string
};

export const ProductSpecsList = (
  { specs, isBig, listClasses }: ProductSpecsListProps,
) => (
  <ul className={listClasses}>
    {specs.map(spec => {
      const { name, value } = spec;

      if (value) {
        return (
          <ProductSpec
            key={name}
            name={name}
            value={value}
            isBig={isBig}
          />
        );
      }

      return undefined;
    })}
  </ul>
);
