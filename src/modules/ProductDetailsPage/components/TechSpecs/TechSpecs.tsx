import React from 'react';
import classNames from 'classnames';

import { SectionTitle } from '../SectionTitle';
import { Characteristics } from '@components/Characteristics';

import styles from './TechSpecs.module.scss';

type Props = {
  className?: string;
  specs: [string, string][];
};

export const TechSpecs: React.FC<Props> = ({ className, specs }) => {
  return (
    <section className={classNames(className, styles['tech-specs'])}>
      <SectionTitle title="Tech Specs" />
      <Characteristics characteristics={specs} bodyText removePadding />
    </section>
  );
};
