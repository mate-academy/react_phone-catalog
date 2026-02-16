import { ProductDetails } from '../../../types/ProductDetails';
import styles from './ProductDescription.module.scss';

type Props = {
  details: ProductDetails;
};

export const ProductDescription = ({ details }: Props) => {
  return (
    <div className={styles.description_container}>
      <div className={styles.description_about}>
        <h3 className={styles.description_title}>About</h3>
        <div className={styles.description_divide_line}></div>
        <div className={styles.description_content}>
          {details.description.map(section => (
            <div key={section.title}>
              <h4 className={styles.section_title}>{section.title}</h4>

              {section.text.map((paragraph, index) => (
                <p className={styles.section_paragraph} key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.description_tech}>
        <h3 className={styles.description_title}>Tech specs</h3>
        <div className={styles.description_divide_line}></div>
        <div className={styles.description__specs}>
          <dl>
            <dt>Screen</dt>
            <dd>{details.screen}</dd>
            <dt>Resolution</dt>
            <dd>{details.resolution}</dd>
            <dt>Processor</dt>
            <dd>{details.processor}</dd>
            <dt>RAM</dt>
            <dd>{details.ram}</dd>
            <dt>Capacity</dt>
            <dd>{details.capacity}</dd>
            {details.category !== 'accessories' && (
              <>
                <dt>Camera</dt>
                <dd>{details.camera}</dd>

                <dt>Zoom</dt>
                <dd>{details.zoom}</dd>
              </>
            )}
            <dt>Cell</dt>
            <dd>{details.cell}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};
