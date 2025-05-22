import React, { memo } from 'react';
import sectionTitleStyles from './SectionTitle.module.scss';

type Props = {
  title: string;
};

export const SectionTitle: React.FC<Props> = memo(({ title }) => {
  return <h3 className={sectionTitleStyles.title}>{title}</h3>;
});

SectionTitle.displayName = 'SectionTitle';
