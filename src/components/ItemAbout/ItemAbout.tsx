import React from 'react';
import { Item } from '../../types/Item';
import styles from './ItemAbout.module.scss';

type Props = {
  item: Item | null;
};

export const ItemAbout: React.FC<Props> = ({ item }) => {
  return (
    <div>
      {item && (
        <div className={styles.container}>
          <section className={styles.about}>
            <h3>About</h3>
            <span></span>
            {item.description.map(i => (
              <div key={i.title}>
                <h4>{i.title}</h4>
                <p>{i.text}</p>
              </div>
            ))}
          </section>
          <section className={styles.specs}>
            <h3>Tech specs</h3>
            <span></span>
            <div className={styles.characteristic}>
              <p>Screen</p>
              <h6>{item.screen}</h6>
            </div>
            <div className={styles.characteristic}>
              <p>Resolution</p>
              <h6>{item.resolution}</h6>
            </div>
            <div className={styles.characteristic}>
              <p>Processor</p>
              <h6>{item.processor}</h6>
            </div>
            <div className={styles.characteristic}>
              <p>RAM</p>
              <h6>{item.ram}</h6>
            </div>
            <div className={styles.characteristic}>
              <p>Built in memory</p>
              <h6>{item.capacity}</h6>
            </div>
            {item.camera && (
              <div className={styles.characteristic}>
                <p>Camera</p>
                <h6>{item.camera}</h6>
              </div>
            )}
            {item.zoom && (
              <div className={styles.characteristic}>
                <p>Zoom</p>
                <h6>{item.zoom}</h6>
              </div>
            )}
            <div className={styles.characteristic}>
              <p>Cell</p>
              <h6>{item.cell[0]}</h6>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
