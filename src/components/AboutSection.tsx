import React from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneInfo } from '../type/PhoneInfo';

type Props = {
  description: PhoneInfo;
};

export const AboutSection: React.FC<Props> = ({ description }) => {
  const { t } = useTranslation();

  return (
    <div className="about description__about" data-cy="productDescription">
      <h2 className="about__title">{t('about')}</h2>
      {description.description.map(section => (
        <div
          key={section.title}
          className="section description__section"
        >
          <h3 className="section__title">{section.title}</h3>
          <article className="section__text">
            {section.text.map(paragraph => (
              <p
                key={paragraph.length + +new Date()}
                className="section__paragraph"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      ))}
    </div>
  );
};
