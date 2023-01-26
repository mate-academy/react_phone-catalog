import { FC, useContext } from 'react';
import cn from 'classnames';
import { Description } from '../../types/Description';
import { Styles } from '../../types/Styles';
import { ThemeContext } from '../../contexts/ThemeContext';

const styles: Styles = require('./ProductAbout.module.scss');

const {
  ProductAbout: productDescription,
  ProductAbout__title: descriptionTitle,
  'ProductAbout__title--dark': descriptionTitleDark,
  ProductAbout__section: descriptionSection,
  'ProductAbout__section-title': descriptionSectionTitle,
  ProductAbout__paragraph: descriptionParagraph,
  'ProductAbout__paragraph--dark': descriptionParagraphDark,
} = styles;

type Props = {
  className?: string,
  description: Description[],
};

export const ProductAbout: FC<Props> = ({ className = '', description }) => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        productDescription,
        className,
      )}
    >
      <h2 className={cn(
        descriptionTitle,
        { [descriptionTitleDark]: isThemeDark },
      )}
      >
        About
      </h2>

      {description.map(({ title, text }) => (
        <section
          className={descriptionSection}
          key={title}
        >
          <h3 className={descriptionSectionTitle}>
            {title}
          </h3>

          {text.map((paragraph) => (
            <p
              className={cn(
                descriptionParagraph,
                { [descriptionParagraphDark]: isThemeDark },
              )}
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
};

ProductAbout.defaultProps = {
  className: '',
};
