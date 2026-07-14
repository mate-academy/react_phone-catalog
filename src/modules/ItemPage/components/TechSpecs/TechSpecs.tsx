import { ShortSpec } from '../../../shared/components/ShortSpec';
import { SpecItem } from '../../../shared/components/ShortSpec/types';
import styles from './TechSpecs.module.scss';

interface Props {
  specList: SpecItem[];
}

export const TechSpecs: React.FC<Props> = ({ specList }) => {
  return (
    <section className={styles['tech-specs']}>
      <h3 className={styles['tech-specs__title']}>Tech specs</h3>

      <ShortSpec
        className={styles['tech-specs__short-spec']}
        specList={specList}
      />
    </section>
  );
};
