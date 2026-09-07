/* eslint-disable import/extensions */
import { Description } from '@/types/Description';
import React from 'react';
import '@/styles/main.scss';
import styles from './About.module.scss';
import classNames from 'classnames';

interface Props {
  sections: Description[];
}

export const About: React.FC<Props> = ({ sections }) => {
  return sections.map((section: Description, i: number) => (
    <div key={i} className={styles.section}>
      <h4 className={styles.section__heading}>{section.title}</h4>
      {section.text.map((t: string, j: number) => (
        <p key={j} className={classNames(styles.section__text, 'text__body')}>
          {t}
          {j !== section.text.length - 1 && <>{'\n'}</>}
        </p>
      ))}
    </div>
  ));
};
