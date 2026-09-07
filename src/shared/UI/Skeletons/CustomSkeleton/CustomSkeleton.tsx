import React, { HtmlHTMLAttributes } from 'react';
import styles from './CustomSkeleton.module.scss';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  classNames?: string;
}

export const CustomSkeleton: React.FC<Props> = ({ classNames }) => (
  <div className={`${styles.block} ${styles.pulsate} ${classNames}`}></div>
);
