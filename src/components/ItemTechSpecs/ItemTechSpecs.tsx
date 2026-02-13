import { TechSpecs } from '../../types/TechSpecs';
import styles from './ItemTechSpecs.module.scss';

type Props = {
  techSpecs: TechSpecs;
};

export const ItemTechSpecs: React.FC<Props> = ({ techSpecs }) => {
  const options = Object.keys(techSpecs) as (keyof TechSpecs)[];

  const wordConvert = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div className={`${styles.techSpecs} body-text`}>
      {options.map(option => (
        <div key={option} className={styles.descriptionPair}>
          <p className="body-text grayText">{wordConvert(option)}</p>
          <p className="body-text">{techSpecs[option]}</p>
        </div>
      ))}
    </div>
  );
};
