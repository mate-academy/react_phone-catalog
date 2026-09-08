import React from 'react';

import type { DescriptionSection } from '../descriptionUtils';
import { cx } from './styles';

interface Props {
  sections: DescriptionSection[];
}

export const ProductAbout: React.FC<Props> = ({ sections }) => (
  <section className={cx('about')}>
    <h2 className={cx('section-title')}>About</h2>

    <div className={cx('about-text')}>
      {sections.map((section, index) => (
        <div className={cx('about-section')} key={section.title ?? index}>
          {section.title && <p className={cx('about-subtitle')}>{section.title}</p>}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p className={cx('about-paragraph')} key={`${paragraphIndex}-${paragraph}`}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  </section>
);
