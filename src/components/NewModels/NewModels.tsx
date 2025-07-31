import { Arrow } from '../Arrow';
import styles from './NewModels.module.scss';

export const NewModels: React.FC = () => {
  function handleArrowClick(direction: 'left' | 'right') {
    console.log(direction);
  }

  return (
    <section>
      <div className={`${styles.newModels} ${styles.head}`}>
        <h2 className={` homeTitle`}>Brand new models</h2>

        <div className={styles.arrows}>
          <Arrow
            direction="left"
            isDisabled={true}
            onClick={() => handleArrowClick('left')}
          />
          <Arrow
            direction="right"
            isDisabled={false}
            onClick={() => handleArrowClick('right')}
          />
        </div>
      </div>

      <div className={styles.content}>
      </div>
    </section>
  );
}