import { Phone } from '../../../../types/Phone';
import { Tablet } from '../../../../types/Tablet';
import { Accessory } from '../../../../types/Accessory';

type Device = Phone | Tablet | Accessory;
type DescriptionBlock = {
  title: string;
  text: string[];
};

export const AboutBlock = ({
  selectedProduct,
}: {
  selectedProduct: Device | undefined;
}) => {
  return (
    <>
      <div className="info-details__about">
        <p className="text-h3 about-title">About</p>
        <div className="details-info__configurate-line"></div>

        <div className="full-description">
          {selectedProduct?.description?.map((desc: DescriptionBlock) => (
            <div className="about-text" key={desc.title}>
              <p className="text-h4">{desc.title}</p>
              <p className="text-body secondary">{desc.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutBlock;
