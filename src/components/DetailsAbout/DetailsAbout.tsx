import React from 'react';
import { Description } from '../../types/Description';

import './DetailsAbout.scss';

type Props = {
  description: Description[];
};

export const DetailsAbout: React.FC<Props> = ({ description }) => (
  <div className="about">
    <h3 className="about__title">About</h3>
    <div className="about__content">
      {description.map(article => (
        <article className="about__article" key={article.title}>
          <h4 className="about__subtitle">{article.title}</h4>
          {article.text.map(paragraph => (
            <p key={paragraph} className="about__text">
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </div>
  </div>
);
