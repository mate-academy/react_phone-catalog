import styles from './Tech.module.scss';

import { Phone } from '../../types/Phone';
import { Accessoirs } from '../../types/Accesories';
import { Tables } from '../../types/Tablets';
import Skeleton from 'react-loading-skeleton';

interface Props {
  card: Phone | Accessoirs | Tables | null | undefined;
}

export const Tech: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.tech}>
      <h3 className={styles.tech__title}>Tech specs</h3>
      <hr />
      {card ? (
        <div className={styles.tech__list}>
          {'screen' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Screen</p>
              <p className={styles.tech__infoText}>{card.screen}</p>
            </div>
          )}
          {'resolution' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Resolution</p>
              <p className={styles.tech__infoText}>{card.resolution}</p>
            </div>
          )}
          {'processor' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Processor</p>
              <p className={styles.tech__infoText}>{card.processor}</p>
            </div>
          )}
          {'ram' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>RAM</p>
              <p className={styles.tech__infoText}>{card.ram}</p>
            </div>
          )}
          {'capacity' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Built in memory</p>
              <p className={styles.tech__infoText}>{card.capacity}</p>
            </div>
          )}
          {'camera' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Camera</p>
              <p className={styles.tech__infoText}>{card.camera}</p>
            </div>
          )}
          {'zoom' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Zoom</p>
              <p className={styles.tech__infoText}>{card.zoom}</p>
            </div>
          )}
          {'cell' in card && (
            <div className={styles.tech__infoBlock}>
              <p className={styles.tech__infoTitle}>Cell</p>
              <p className={styles.tech__infoText}>{card.cell.join(', ')}</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.tech__list}>
          <div className={styles.tech__infoBlock}>
            <p className={styles.tech__infoTitle}>Screen</p>
            <p className={styles.tech__infoText}>
              <Skeleton className={styles.tech__skeletonInfoText} />
            </p>
          </div>
          <div className={styles.tech__infoBlock}>
            <p className={styles.tech__infoTitle}>Resolution</p>
            <p className={styles.tech__infoText}>
              <Skeleton className={styles.tech__skeletonInfoText} />
            </p>
          </div>
          <div className={styles.tech__infoBlock}>
            <p className={styles.tech__infoTitle}>Processor</p>
            <p className={styles.tech__infoText}>
              <Skeleton className={styles.tech__skeletonInfoText} />
            </p>
          </div>
          <div className={styles.tech__infoBlock}>
            <p className={styles.tech__infoTitle}>RAM</p>
            <p className={styles.tech__infoText}>
              <Skeleton className={styles.tech__skeletonInfoText} />
            </p>
          </div>
          <div className={styles.tech__infoBlock}>
            <p className={styles.tech__infoTitle}>Built in memory</p>
            <p className={styles.tech__infoText}>
              <Skeleton className={styles.tech__skeletonInfoText} />
            </p>
          </div>
          <div className={styles.tech__infoBlock}>
            <p className={styles.tech__infoTitle}>Camera</p>
            <p className={styles.tech__infoText}>
              <Skeleton className={styles.tech__skeletonInfoText} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
