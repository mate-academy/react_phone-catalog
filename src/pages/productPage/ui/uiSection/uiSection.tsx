import { UISectionProps, techSpecUIBase } from '../../model';
import { UIOptionList, PurchaseBlock } from '.';
import { InfiniteSlider } from '@widgets/infiniteSlider';
import { Product } from '@shared/types';
import styles from '../../styles/uiSection.module.scss';

type Props = {
  prod: Product;
  props: UISectionProps;
  onLink: (e: React.MouseEvent, link: string) => void;
  SKU: string;
};

export const UISection = ({ prod, props, onLink, SKU }: Props) => {
  return (
    <div className={styles['ui-container']}>
      <InfiniteSlider data={prod} />
      <section className={styles['ui-block']}>
        <span className={styles.sku}>{SKU}</span>
        <UIOptionList {...props.colorsOptions} onLink={onLink} />
        <UIOptionList {...props.capacityOptions} onLink={onLink} />
        <PurchaseBlock {...props.purchase} />
        <dl className={styles.descr}>
          {Object.entries(props.baseSpecs).map(([key, value]) => (
            <div key={key} className={styles.descr__container}>
              <dt className={styles.descr__type}>
                {techSpecUIBase[key as keyof typeof techSpecUIBase]}
              </dt>
              <dd className={styles.descr__val}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};
