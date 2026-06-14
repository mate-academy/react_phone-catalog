/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { ProductDescriptionSection as DescriptionSection } from '@/modules/shared/utils/types';

import styles from './ProductAbout.module.scss';
//#endregion

//#region STYLES
const {
  aboutContainer,
  aboutTitle,
  aboutSection,
  aboutSubTitle,
  aboutParagraph,
} = styles;
//#endregion

interface Props {
  description: DescriptionSection[];
}

export const ProductAbout: React.FC<Props> = ({ description }) => {
  //#region RENDER
  return (
    <div className={aboutContainer}>
      <h3 className={aboutTitle}>About</h3>

      {description.map((section: DescriptionSection) => (
        <div className={aboutSection} key={section.title}>
          <h4 className={aboutSubTitle}>{section.title}</h4>

          {section.text.map((paragraph: string, idx: number) => (
            <p className={aboutParagraph} key={idx}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
  //#endregion
};
