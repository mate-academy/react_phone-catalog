import styles from './DeviceSpecs.module.scss';

interface DeviceSpecsProps {
  specs: {
    Screen: string;
    Resolution: string;
    Processor: string;
    Ram: string;
    Capacity: string;
    Camera: string;
    Zoom: string;
    Cell: string[];
  };
}

export const DeviceSpecs: React.FC<DeviceSpecsProps> = ({ specs }) => {
  return (
    <div className={styles.specsPage__Container}>
      <div className={styles.specsPage__Header}>
        <h1>Tech specs</h1>
      </div>
      <ul className={styles.specsList}>
        {Object.entries(specs).map(([key, value]) => (
          <li className={styles.specsList__Item} key={key}>
            <p className={styles.specsList__ItemKey}>{key}</p>
            <p className={styles.specsList__ItemValue}>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
