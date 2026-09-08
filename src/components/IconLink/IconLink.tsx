import React from 'react';
import styles from './IconLink.module.scss';
import { TransitionLink } from '../TransitionLink';

interface Props {
  to: string;
  iconSrc: string;
  alt: string;
  className?: string;
}

export const IconLink: React.FC<Props> = ({ to, iconSrc, alt, className }) => (
  <TransitionLink to={to} className={`${styles.iconLink} ${className || ''}`}>
    <div
      className={styles.iconWrapper}
      style={{ backgroundImage: `url(${iconSrc})` }}
      aria-label={alt}
    />
  </TransitionLink>
);
