import React from 'react';
import aboutStyles from './About.module.scss';
import classNames from 'classnames';
import { Description } from '../../../../types/ProductDetailed';

type Props = {
  className?: string;
  description: Description[];
};

export const About: React.FC<Props> = ({ description, className }) => {
  return (
    <section className={classNames(className, aboutStyles.about)}>
      <div className={aboutStyles.about__container}>
        <h2 className={aboutStyles.about__title}>About</h2>
        <hr className="horizontal-line" />
      </div>
      {description.map(({ title, text }, index) => (
        <article className={aboutStyles.about__item} key={index}>
          <h3 className={aboutStyles.about__itemTitle}>{title}</h3>
          {text.map((paragraph, i) => (
            <p className={aboutStyles.about__itemParagraph} key={i}>
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
};
