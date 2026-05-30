import React, { memo } from 'react';
import aboutStyles from './About.module.scss';
import classNames from 'classnames';
import { Description } from '../../../../types/ProductDetailed';
import { Divider } from '../../../../components/Divider/Divider';

type Props = {
  className?: string;
  description: Description[];
};

export const About: React.FC<Props> = memo(({ description, className }) => {
  return (
    <section className={classNames(className, aboutStyles.about)}>
      <div className={aboutStyles.about__container}>
        <h3 className={aboutStyles.about__title}>About</h3>
        <Divider />
      </div>
      {description.map(({ title, text }, index) => (
        <article className={aboutStyles.about__item} key={index}>
          <h4 className={aboutStyles.about__itemTitle}>{title}</h4>
          {text.map((paragraph, i) => (
            <p className={aboutStyles.about__itemParagraph} key={i}>
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
});

About.displayName = 'About';
