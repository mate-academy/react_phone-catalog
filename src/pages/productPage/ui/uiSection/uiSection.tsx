import React from 'react';
import { UISectionProps, techSpecUIBase } from '../../model';
import { UIOptionList, PurchaseBlock } from './ui';
import { InfiniteSlider } from '@widgets/slider';
import styles from '../../styles/uiSection/uiSection.module.scss';

type Props = {
  props: UISectionProps;
  SKU: string;
};

export const UISection = ({ props, SKU }: Props) => {
  return (
    <div className={styles['ui-container']}>
      <InfiniteSlider data={props.slider} />
      <div className={styles['ui-block']}>
        <span className={styles.sku}>{SKU}</span>
        <UIOptionList {...props.colorsOptions} />
        <UIOptionList {...props.capacityOptions} />
        <PurchaseBlock {...props.purchase} />
        <dl className={styles.descr}>
          {Object.entries(props.baseSpecs).map(([key, value]) => (
            <React.Fragment key={key}>
              <dt className={styles.descr__type}>
                {techSpecUIBase[key as keyof typeof techSpecUIBase]}
              </dt>
              <dd className={styles.descr__val}>{value}</dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
};
