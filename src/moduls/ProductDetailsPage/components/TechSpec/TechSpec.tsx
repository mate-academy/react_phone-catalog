import { Accessories } from '../../../../shared/types/Accessories';
import { PhonesTablets } from '../../../../shared/types/PhonesTablets';
import styles from './TechSpec.module.scss';

type Props = {
  product: PhonesTablets | Accessories;
};

export const TechSpec: React.FC<Props> = ({ product }) => {
  const specs = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
    { label: 'Cell', value: product?.cell.join(', ') },
  ];

  if (product.category === 'phones' || product.category === 'tablets') {
    specs.push(
      { label: 'Camera', value: (product as PhonesTablets).camera },
      { label: 'Zoom', value: (product as PhonesTablets).zoom },
    );
  }

  return (
    <section className={styles.tech}>
      <h3>Tech specs</h3>
      <hr />
      <ul className={styles.tech__list}>
        {specs.map(spec => (
          <li key={spec.label} className={styles.tech__item}>
            <p>{spec.label}</p>
            <p>
              <span>
                {spec.label === 'Capacity' || spec.label === 'RAM'
                  ? spec.value.replace('GB', ' GB')
                  : spec.value}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
