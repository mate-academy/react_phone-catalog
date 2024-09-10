import { Description } from '../../types/Description';

import styles from './ProductAbout.module.scss';
const {
  about,
  about__titleBlock,
  about__title,
  about__line,
  about__section,
  about__sectionTitle,
  about__text,
} = styles;

export const ProductAbout = ({ description }: Description) => {
  return (
    <div className={about}>
      <div className={about__titleBlock}>
        <h3 className={about__title}>About</h3>

        <div className={about__line} />
      </div>

      {description.map((section, index) => (
        <div key={index} className={about__section}>
          <h4 className={about__sectionTitle}>{section.title}</h4>

          {section.text.map((text, index) => (
            <p key={index} className={about__text}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
