import React from 'react';
import styles from './ProductAbout.module.scss';
import { Typography } from '@shared/ui/Typography';
import { Divider } from '@shared/ui/Divider';
import { ProductDescriptionSection } from 'src/types/ProductDetails';

type Props = {
  description: ProductDescriptionSection[];
};

export const ProductAbout: React.FC<Props> = ({ description }) => (
  <div className={styles.about}>
    <Typography variant="h3" className={styles.aboutTitle}>
      About
    </Typography>

    <div className={styles.aboutWrapper}>
      <Divider />

      {description.map(section => (
        <div key={section.title}>
          <Typography variant="h4" className={styles.deskriptionTitle}>
            {section.title}
          </Typography>

          <p className={styles.aboutText}>{section.text}</p>
        </div>
      ))}
    </div>
  </div>
);
