import { UseHooks } from '../../AppHooks';
import styles from './Description.module.scss';

export const Description = () => {
  const { currentDevice } = UseHooks();

  if (!currentDevice) {
    return null;
  }

  const entries = Object.entries(currentDevice);

  const filteredEntries = entries.slice(12);

  return (
    <div className={styles.description}>
      <div className={styles.description__about}>
        <h3>About</h3>
        <div className={styles.divider} />
        {currentDevice?.description.map(element => {
          return (
            <>
              <h4 className={styles.description__titles}>{element.title}</h4>
              <p className="body-text">{element.text}</p>
            </>
          );
        })}
      </div>
      <div className={styles.description__specs}>
        <h3>Tech Specs</h3>
        <div className={styles.divider} />
        <div className={styles.description__rows}>
          {filteredEntries.map(([key, value], index) => {
            return (
              <div className={styles.description__row} key={index}>
                <p className="body-text">{`${key[0].toUpperCase()}${key.slice(1)}`}</p>
                <p className="body-text-black">{`${value}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
