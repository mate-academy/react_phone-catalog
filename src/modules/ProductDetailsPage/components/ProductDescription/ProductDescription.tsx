import React from 'react';
import styles from './ProductDescription.module.scss';

type Props = {
  description: {
    title: string;
    text: string;
  }[];
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
    camera?: string;
    zoom?: string;
    cell: string[];
  };
};

export const ProductDescription: React.FC<Props> = ({ description, specs }) => {
  return (
    <section className={styles.descriptionSection}>
      <div className={styles.about}>
        <h2 className={styles.title}>About</h2>

        <div className={styles.divider} />

        {description.map(({ title, text }, index) => (
          <div key={index} className={styles.textBlock}>
            <h3 className={styles.subtitle}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </div>
        ))}
      </div>

      <div className={styles.specs}>
        <h2 className={styles.title}>Tech specs</h2>

        <div className={styles.divider} />

        <ul className={styles.specsList}>
          <li>
            <span>Screen</span>
            <span>{specs.screen}</span>
          </li>
          <li>
            <span>Resolution</span>
            <span>{specs.resolution}</span>
          </li>
          <li>
            <span>Processor</span>
            <span>{specs.processor}</span>
          </li>
          <li>
            <span>RAM</span>
            <span>{specs.ram}</span>
          </li>
          {specs.camera &&
            <li>
              <span>Camera</span>
              <span>{specs.camera}</span>
            </li>
          }
          {specs.zoom &&
            <li>
              <span>Zoom</span>
              <span>{specs.zoom}</span>
            </li>
          }
          <li>
            <span>Cell</span>
            <span>{specs.cell.join(', ')}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
