import { useTranslationState } from '../../stateManagers/languageState';
import type { Gadget } from '../../types/gadgets';
import './Description.scss';

interface DescriptionProps {
  gadget: Gadget | null;
}

export const Description: React.FC<DescriptionProps> = ({ gadget }) => {
  const { translate } = useTranslationState();

  return (
    <section className="description-block">
      {gadget?.description.map(({ title, text }, index) => (
        <article
          key={index}
          className="article"
        >
          <h4 className="description-block__title">{translate(title)}</h4>

          {text.map((paragraph, i) => (
            <span
              className="description-block__text body-text"
              key={i}
            >
              {translate(paragraph)}
            </span>
          ))}
        </article>
      ))}
    </section>
  );
};
