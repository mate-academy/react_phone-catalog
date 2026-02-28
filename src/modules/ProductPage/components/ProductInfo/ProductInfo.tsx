import { FC } from 'react';
import styles from './ProductInfo.module.scss';
import { ProductDescriptions } from '../../../../types/ProductDescriptions';

type Props = {
  description: ProductDescriptions[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  memory: string;
  camera: string;
  zoom: string;
  cell: string[];
};

export const ProductInfo: FC<Props> = ({
  description,
  screen,
  resolution,
  processor,
  ram,
  memory,
  camera,
  zoom,
  cell,
}) => {
  return (
    <div className={styles.product__info}>
      <div className={styles.about}>
        <h4 className={styles.label}>About</h4>
        <div className={styles.line}></div>
        <div className={styles.paragraphs}>
          {description.map((desc: ProductDescriptions, index) => (
            <article key={index} className={styles.paragraph}>
              <h4 className={styles.paragraph__title}>{desc.title}</h4>
              <div className={styles.paragraph_texts}>
                {desc.text.map((p, indexP) => (
                  <span key={indexP} className={styles.paragraph__text}>
                    {p}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.tech}>
        <h4 className={styles.label}>Tech specs</h4>
        <div className={styles.line}></div>
        <div className={styles.text__content}>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Screen</h6>
            <p className={styles.desc__text}>{screen}</p>
          </div>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Resolution</h6>
            <p className={styles.desc__text}>{resolution}</p>
          </div>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Processor</h6>
            <p className={styles.desc__text}>{processor}</p>
          </div>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>RAM</h6>
            <p className={styles.desc__text}>{ram}</p>
          </div>
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Built in memory</h6>
            <p className={styles.desc__text}>{memory}</p>
          </div>
          {camera && (
            <div className={styles.desc}>
              <h6 className={styles.desc__name}>Camera</h6>
              <p className={styles.desc__text}>{camera}</p>
            </div>
          )}
          {zoom && (
            <div className={styles.desc}>
              <h6 className={styles.desc__name}>Zoom</h6>
              <p className={styles.desc__text}>{zoom}</p>
            </div>
          )}
          <div className={styles.desc}>
            <h6 className={styles.desc__name}>Cell</h6>
            <div className={styles.desc__text}>{cell.join(',')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
