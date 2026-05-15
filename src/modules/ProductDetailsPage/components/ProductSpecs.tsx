import React from 'react';

import type { ProductSpec } from './ProductSummary';
import { cx } from './styles';

interface Props {
  specs: ProductSpec[];
}

export const ProductSpecs: React.FC<Props> = ({ specs }) => (
  <section className={cx('tech')}>
    <h2 className={cx('section-title')}>Tech specs</h2>

    <dl className={cx('tech-specs')}>
      {specs.map(spec => (
        <div className={cx('spec-row')} key={spec.label}>
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
