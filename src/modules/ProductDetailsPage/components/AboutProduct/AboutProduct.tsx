import React from 'react';
import style from './AboutProduct.module.scss';
import { ProductDetails } from '@/types/Products';

type Props = {
  phone: ProductDetails;
}

export const AboutProduct: React.FC<Props> = ({phone}) => {
  return (
    <section className={style.aboutProduct}>
      <h1 className={style.sectionTitle}>About</h1>

      {phone.description.map((description, index) => (
        <article className={style.article} key={index}>
          <h2 className={style.articleTitle}>{description.title}</h2>
          {description.text.map((text, index) => (
            <p className={style.articleDescription} key={index}>
              {text}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
};
