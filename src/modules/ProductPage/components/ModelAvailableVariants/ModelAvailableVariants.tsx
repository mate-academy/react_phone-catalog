import styles from './ModelAvailableVariants.module.scss';
import { modelColors } from '../../../shared/constants/ModelColors';
import { Model } from '../../../shared/types/Model';

type Props = {
  text: string;
  variantsAvailble: string[];
  setModelVariant: (value: string) => void;
  className: string;
  model: Model;
};

export const ModelAvailbleVariants: React.FC<Props> = ({
  text,
  variantsAvailble,
  setModelVariant,
  className,
  model,
}) => {
  function addSpace(value: string) {
    let numberPart = '';
    let letterPart = '';

    for (const char of value) {
      if (char >= '0' && char <= '9') {
        numberPart += char;
      } else {
        letterPart += char;
      }
    }

    return `${numberPart} ${letterPart}`;
  }

  return (
    <div className={styles.variant}>
      <p className={styles.variant__text}>{text}</p>
      <div className={styles.variant__buttons}>
        {variantsAvailble?.map(variant => {
          const isActive =
            (className === 'color' && model.color === variant) ||
            (className === 'capacity' && model.capacity === variant);

          return (
            <button
              key={variant}
              onClick={() => model && setModelVariant(variant)}
              className={`${className === 'color' ? styles.variant__color : styles.variant__capacity} ${isActive ? styles[`variant__${className}--active`] : ''}`}
              style={{
                backgroundColor:
                  className === 'color' && modelColors[variant]
                    ? modelColors[variant]
                    : undefined,
              }}
            >
              {className === 'capacity' && addSpace(variant)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
