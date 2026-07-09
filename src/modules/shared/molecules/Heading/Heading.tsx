import React from 'react';
import styles from './Heading.module.scss';
import { Typography } from '../../atoms/Typography';

type Props = {
  title: string;
  subtitle?: string;
  title_tag?: 'h1' | 'h2' | 'h3' | 'h4';
};

export const Heading: React.FC<Props> = ({
  title,
  subtitle,
  title_tag = 'h1',
}) => (
  <div className={styles.heading}>
    <Typography variant={title_tag} tag={title_tag}>
      {title}
    </Typography>
    {subtitle && (
      <Typography
        variant="body"
        tag="span"
        color="secondary"
        className={styles.heading__subtitle}
      >
        {subtitle}
      </Typography>
    )}
  </div>
);
