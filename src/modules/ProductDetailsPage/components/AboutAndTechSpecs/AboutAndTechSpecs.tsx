import { About } from '../About/About';
import { TechSpecs } from '../TechSpecs';
import styles from './AboutAndTechSpecs.module.scss';

export const AboutAndTechSpecs = () => {
  return (
    <div className={styles.aboutAndTechSpecs}>
      <About />
      <TechSpecs />
    </div>
  );
};
