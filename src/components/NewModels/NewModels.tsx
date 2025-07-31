import { getProducts } from '../../modules/shared/services/productService';
import { Arrow } from '../Arrow';
import { Card } from '../Card';
import styles from './NewModels.module.scss';

export const NewModels: React.FC = () => {
  function handleArrowClick(direction: 'left' | 'right') {
    console.log(direction);
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={`homeTitle`}>Brand new models</h2>

        <div className={styles.arrows}>
          <Arrow
            direction='left'
            isDisabled={false}
            onClick={() => handleArrowClick('left')}
          />
          <Arrow
            direction='right'
            isDisabled={false}
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className={styles.content}>
        {getProducts().filter(item => item.name.includes('14')).map((product) => (
          <Card card={product} />
        ))}
      </div>
    </section>
  );
}