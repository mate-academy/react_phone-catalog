import { ProductDetails } from '../../../../utils/types/ProductDetails';
import { ProductFeatures } from '../../../shared/ProductFeaturesTable';
import s from './ProductDesc.module.scss';

type Props = {
  product: ProductDetails;
};

export const ProductDesc: React.FC<Props> = ({ product }) => {
  const {
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = product;

  const features = [
    { name: 'Screen', value: screen },
    { name: 'Resolution', value: resolution },
    { name: 'Processor', value: processor },
    { name: 'RAM', value: ram },
    { name: 'Camera', value: camera },
    { name: 'Zoom', value: zoom },
    { name: 'Cell', value: cell },
  ];

  return (
    <>
      <section className={`${s.additionalInfo} ${s.aboutSection}`}>
        <h4 className={s.sectionTitle}>About</h4>

        <span className={s.divider}></span>

        {description.map(d => {
          const { title, text } = d;

          return (
            <article key={d.title} className={s.descriptionItem}>
              <h5 className={s.descriptionTitle}>{title}</h5>
              <p className={s.descriptionText}>{text}</p>
            </article>
          );
        })}

        <span></span>
      </section>

      <section className={`${s.additionalInfo} ${s.techSpecsSection}`}>
        <h4 className={s.sectionTitle}>Tech specs</h4>

        <span className={s.divider}></span>

        <ProductFeatures features={features} />
      </section>
    </>
  );
};
