import './AboutProduct.scss';

import React from 'react';

type Props = {
  description: {
    title: string,
    text: string[],
  }[],
};

export const AboutProduct: React.FC<Props> = ({ description }) => {
  return (
    <ul className="AboutProduct">
      {description.map(article => (
        <li
          className="AboutProduct__article"
          key={article.title}
          data-cy="productDescription"
        >
          <h3 className="AboutProduct__article-title">
            {article.title}
          </h3>
          <p className="AboutProduct__article-paragraph">
            {article.text.map(text => (
              <span key={text.length}>
                {text}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
};
