import React from 'react';
// import styles from './Main.module.scss';
import { SectionDashSlider } from './sectionDashSlider';
import { BrandNewModels } from './brandNewModels';

export const Main: React.FC = () => {
  return (
    <React.Fragment>
      {/* context */}
      <SectionDashSlider />
      <BrandNewModels />
      {/* context */}
    </React.Fragment>
  );
};
