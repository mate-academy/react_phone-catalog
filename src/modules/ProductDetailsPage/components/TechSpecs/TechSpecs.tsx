import React, { memo } from 'react';
import { ProductSpecs } from '../../../../components/ProductSpecs/ProductSpecs';
import techSpecsStyles from './TechSpecs.module.scss';
import { Spec } from '../../../../types/Spec';
import { ProductDetailed } from '../../../../types/ProductDetailed';
import classNames from 'classnames';
import { Divider } from '../../../../components/Divider/Divider';

type Props = {
  className?: string;
  selectedProduct: ProductDetailed;
};

export const TechSpecs: React.FC<Props> = memo(
  ({ className, selectedProduct }) => {
    const fullSpecs: Spec[] = [
      { label: 'Screen', value: selectedProduct?.screen },
      { label: 'Resolution', value: selectedProduct?.resolution },
      { label: 'Processor', value: selectedProduct?.processor },
      { label: 'Built in memory', value: selectedProduct?.capacity },
      { label: 'Camera', value: selectedProduct?.camera },
      { label: 'Zoom', value: selectedProduct?.zoom },
      { label: 'Cell', value: selectedProduct?.cell.join(', ') },
    ];

    return (
      <section className={classNames(className, techSpecsStyles.techSpecs)}>
        <div className={techSpecsStyles.techSpecs__container}>
          <h2 className={techSpecsStyles.techSpecs__title}>Tech specs</h2>
          <Divider />
        </div>
        <ProductSpecs specs={fullSpecs} />
      </section>
    );
  },
);

TechSpecs.displayName = 'TechSpecs';
