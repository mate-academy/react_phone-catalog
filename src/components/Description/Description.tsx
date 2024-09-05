import React from 'react';
import styles from './Description.module.scss';
import classNames from 'classnames';

type DescriptionProps = {
  description: {
    map(
      arg0: (
        desc: { title: string; text: string[] },
        index: number,
      ) => import('react/jsx-runtime').JSX.Element,
    ): React.ReactNode;
  };
};

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <section className={classNames(styles.descriptionSection, styles.section)}>
      <h3 className={styles.sectionTitle}>About</h3>
      <div className={styles.divider}></div>

      {description.map(
        (desc: { title: string; text: string[] }, index: number) => (
          <article key={index} className={styles.descriptionSection}>
            <h4 className={styles.descriptionTitle}>{desc.title}</h4>
            {desc.text.map((paragraph, idx) => (
              <p key={idx} className={styles.descriptionText}>
                {paragraph}
              </p>
            ))}
          </article>
        ),
      )}
    </section>
  );
};

export default Description;
