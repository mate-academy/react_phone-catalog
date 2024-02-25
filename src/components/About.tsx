import React from 'react';

import '../styles/About.scss';
import { Description } from '../types/ProductDetails';

interface Props {
  description: Description[]
}

export const About: React.FC<Props> = ({ description }) => (
  <div className="about">
    <h3 className="about__title">
      About
    </h3>

    {description.map(item => {
      const { title, text } = item;

      return (
        <div className="about__block" key={title}>
          <h4 className="about__paragraph-title">
            {title}
          </h4>

          <div className="about__paragraph-block">
            {text.map(paragraph => (
              <p
                key={paragraph.slice(0, 5)}
                className="about__paragraph"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );
    })}

  </div>
);
