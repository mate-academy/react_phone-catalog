import React, { memo } from 'react';

import './ProductAbout.scss';

type Props = {
  description: { title: string; text: string[] }[];
};

export const ProductAbout: React.FC<Props> = memo(({ description }) => {
  return (
    <section
      className="ProductAbout ProductDetails__about"
      data-cy="productDescription"
    >
      <h2 className="ProductAbout__title">About</h2>
      <hr className="ProductAbout__divider" />
      {description.map(({ title, text }) => (
        <article key={title} className="ProductAbout__article">
          <h3 className="ProductAbout__subhead">{title}</h3>
          <div className="ProductAbout__textBlock">
            {text.map(paragraph => (
              <p key={paragraph.slice(0, 10)} className="ProductAbout__text">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
});
