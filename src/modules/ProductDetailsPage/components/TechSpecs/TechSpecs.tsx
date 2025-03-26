import React from 'react';
import style from './TechSpecs.module.scss';
import { ProductDetails } from '@/types/Products';

type Props = {
  phone: ProductDetails;
}

export const TechSpecs: React.FC<Props> = ({phone}) => {
  return (
    <section className={style.aboutProduct}>
      <h1 className={style.sectionTitle}>Tech specs</h1>

      <article>
        <div className={style.phoneDescription}>
          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Screen</p>
            <p className={style.propertieDescription}>{phone.screen}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Resolution</p>
            <p className={style.propertieDescription}>{phone.resolution}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Processor</p>
            <p className={style.propertieDescription}>{phone.processor}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>RAM</p>
            <p className={style.propertieDescription}>{phone.ram}</p>
          </div>

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Built in memory</p>
            <p className={style.propertieDescription}>{phone.capacity}</p>
          </div>

          {phone.camera && (
            <div className={style.phoneProperties}>
              <p className={style.propertieTitle}>Camera</p>
              <p className={style.propertieDescription}>{phone.camera}</p>
            </div>
          )}

          {phone.zoom && (
            <div className={style.phoneProperties}>
              <p className={style.propertieTitle}>Zoom</p>
              <p className={style.propertieDescription}>{phone.zoom}</p>
            </div>
          )}

          <div className={style.phoneProperties}>
            <p className={style.propertieTitle}>Cell</p>
            <p className={style.propertieDescription}>{phone.cell.join(', ')}</p>
          </div>
        </div>
      </article>
    </section>
  );
};
