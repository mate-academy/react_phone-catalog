import { Accessories } from '../../../types/AccessoriesType';
import { Phone } from '../../../types/PhoneType';
import { Tablet } from '../../../types/TabletType';

type Props = {
  device: Phone | Tablet | Accessories | null | undefined;
};

export const AboutProduct: React.FC<Props> = ({ device }) => {
  return (
    <div className="about-product">
      <div className="about-product__title">About</div>
      <div className="grey-line"></div>
      <div className="about-product__content">
        {device?.description.map(loadedDescription => {
          return (
            <div
              className="about-product__description"
              key={loadedDescription.title}
            >
              <h4
                className="
                about-product__description__title
              "
              >
                {loadedDescription.title}
              </h4>
              <div
                className="
          about-product__description__text-block

          "
              >
                {loadedDescription.text.map((text: string) => {
                  return (
                    <p
                      className="
                      about-product__description__text
                    "
                      key={text}
                    >
                      {text}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
