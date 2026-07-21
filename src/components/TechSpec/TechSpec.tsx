import { SpecRow } from '../SpecRow/SpecRow';
import { TechSpecShort } from '../TechSpecShort/TechSpecShort';
import { Props as TechSpecShortProps } from '../TechSpecShort/TechSpecShort';
import styles from './TechSpec.module.scss';

interface Props extends TechSpecShortProps {
  capacity: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export const TechSpec = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}: Props) => {
  const currentTech = [
    { label: 'Built in memory', value: capacity },
    { label: 'Camera', value: camera },
    { label: 'Zoom', value: zoom },
    { label: 'Cell', value: cell.join(',') },
  ];

  return (
    <div className={styles.TechSpec}>
      <h2 className={styles.heading}>Tech specs</h2>
      <TechSpecShort
        screen={screen}
        resolution={resolution}
        processor={processor}
        ram={ram}
      />
      {currentTech
        .filter(spec => spec.value.length !== 0)
        .map(spec => (
          <SpecRow key={spec.label} label={spec.label} value={spec.value} />
        ))}
    </div>
  );
};
