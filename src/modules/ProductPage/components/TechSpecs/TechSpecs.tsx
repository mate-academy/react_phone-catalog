import { FC } from 'react';
import styles from './TechSpecs.module.scss';
import { SpecsList } from '@/modules/shared/components/SpecsList';
import { prepareProductSpecs } from '@/helpers/productHelpers';

interface Props {
  specs: Record<string, string>;
}

export const TechSpecs: FC<Props> = ({ specs }) => {
  const preparedSpecs = prepareProductSpecs(specs);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Tech specs</h2>

      <div className={styles.specs}>
        <SpecsList specs={preparedSpecs} />
      </div>
    </section>
  );
};
