/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { ProductDescriptionSection as DescriptionSection } from '@/modules/shared/utils/types';

import styles from './ProductAbout.module.scss';

const {
  about,
  aboutTitle,
  aboutSection,
  aboutSubTitle,
  aboutParagraph,
} = styles;

export const ProductAbout = (
  { description }: { description: DescriptionSection[] }
) => {
  return (
    <div className={about}>
      <h3 className={aboutTitle}>About</h3>

      {description.map((section: DescriptionSection, i: number) => (
        <div className={aboutSection} key={i}>
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
};
