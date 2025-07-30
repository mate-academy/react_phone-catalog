import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';
import type { Gadget } from '../../types/gadgets';
import { helperToCreateTechSpecs } from '../../utils/helperToCreateTechSpecs';
import './TechSpecs.scss';

interface TechSpecsProps {
  gadget: Gadget | null;
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ gadget }) => {
  const { translate } = useTranslationState();
  const { theme } = useThemeState();
  if (!gadget) {
    return null;
  }

  const techSpecs = helperToCreateTechSpecs(gadget);
  console.log(techSpecs);

  return (
    <section className={`techspecs techspecs--${theme}`}>
      <dl className="techspecs__list">
        {Object.entries(techSpecs).map(([spec, value]) => (
          <div
            className="techspecs__row"
            key={spec}
          >
            <dt className="techspecs__name button-text">
              {translate(`${spec}`)}
            </dt>
            <dd className="techspecs__value body-text">
              {spec === 'cell' ?
                Array.isArray(value) ?
                  value.join(', ')
                : value
              : value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
