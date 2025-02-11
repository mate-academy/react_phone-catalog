import React, { Fragment } from 'react';
import classNames from 'classnames';

import styles from './About.module.scss';

import { Description } from '@sTypes/Description';

import { SectionTitle } from '../SectionTitle';

type Props = {
  className?: string;
  description: Description[];
};

export const About: React.FC<Props> = ({ className, description }) => {
  return (
    <section className={classNames(className, styles.about)}>
      <SectionTitle title="About" />

      {description.map(item => (
        <article key={item.title} className={styles.about__description}>
          <h4>{item.title}</h4>

          <div className={styles.about__text}>
            {item.text.map((line, index, items) => (
              <Fragment key={index}>
                <p>{line}</p>
                {index !== items.length - 1 && <br />}
              </Fragment>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
};
