import './ProductDescriptions.scss';
import '../../../styles/main.scss';
import { DescriptionPair } from '../../../types/DescriptionPair';

type Props = {
  descriptions: DescriptionPair[];
};

export const ProductDescriptions: React.FC<Props> = ({ descriptions }) => {
  return (
    <section className="product-descriptions">
      <div className="product-descriptions__top">
        <h3 className="product-descriptions__title title--3">About</h3>

        <hr className="product-descriptions__divider" />
      </div>

      {descriptions.map((pair: DescriptionPair) => (
        <div
          key={pair.title}
          className="description-pair product-descriptions__description-pair"
        >
          <h4 className="description-pair__title title--4">{pair.title}</h4>
          <div className="description-pair__info-wrapper">
            {pair.text.map((description: string, index) => (
              <p
                // Using an index here since it wouldn't make sense for the key to be a 200 char string
                key={index}
                className="description-pair__info body-text--14"
              >
                {description}
              </p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
