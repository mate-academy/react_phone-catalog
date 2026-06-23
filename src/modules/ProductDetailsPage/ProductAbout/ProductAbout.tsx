import React from 'react';

import styles from './ProductAbout.module.scss';

type Description = {
  title: string;
  text: string | string[];
};

type Props = {
  description: Description[];
};

export const ProductAbout: React.FC<Props> = ({ description }) => {
  return (
    <div className={styles.aboutBlock}>
      <div className={styles.titleBlock}>
        <h3>About</h3>
      </div>

      {description.map((desc, index) => (
        <div key={index} className={styles.descriptionSection}>
          <h4>{desc.title}</h4>
          {Array.isArray(desc.text) ? (
            desc.text.map((paragraph, pIndex) => (
              <p className={styles.descriptText} key={pIndex}>
                {paragraph}
              </p>
            ))
          ) : (
            <p className={styles.descriptText}>{desc.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};
