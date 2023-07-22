import React from 'react';
import { PhoneInfo } from '../type/PhoneInfo';

type Props = {
  description: PhoneInfo;
};

export const AboutSection: React.FC<Props> = ({ description }) => {
  return (
    <div className="about description__about" data-cy="productDescription">
      <h2 className="about__title">About</h2>
      {description.description.map(section => (
        <div
          key={section.title}
          className="section description__section"
        >
          <h3 className="section__title">{section.title}</h3>
          <article className="section__text">
            {section.text.map(paragraph => (
              <p
                key={paragraph.length + +new Date()}
                className="section__paragraph"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      ))}
    </div>
  );
};
