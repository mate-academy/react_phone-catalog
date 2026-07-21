import { SpecRow } from '../SpecRow/SpecRow';
import styles from './TechSpecShort.module.scss';

export interface Props {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
}

export const TechSpecShort = ({
  screen,
  resolution,
  processor,
  ram,
}: Props) => {
  const currentTech = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
  ];

  return (
    <div className={styles.TechSpecShort}>
      {currentTech.map(spec => (
        <SpecRow key={spec.label} label={spec.label} value={spec.value} />
      ))}
    </div>
  );
};
