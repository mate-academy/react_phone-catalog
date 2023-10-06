import { ProductDetails } from '../../../types/ProductDetails';
import {
  TextDescriptionTemplate,
} from '../TextDescription/TextDescriptionTemplate';

interface TechSpec {
  key: keyof ProductDetails;
  label: string;
}

type Props = {
  productInfo: ProductDetails,
  specs: TechSpec[],
};

export const TechSpecs: React.FC<Props> = ({ productInfo, specs }) => {
  const getValueFromLabel = (label: string) => {
    switch (label) {
      case 'Screen':
        return productInfo.screen;
      case 'Resolution':
        return productInfo.resolution;
      case 'Processor':
        return productInfo.processor;
      case 'RAM':
        return productInfo.ram;
      case 'Built in memory':
        return productInfo.capacity;
      case 'Camera':
        return productInfo.camera;
      case 'Zoom':
        return productInfo.zoom;
      case 'Cell':
        return productInfo.cell.join(' ');
      default:
        return '';
    }
  };

  return (
    <>
      {specs.map(spec => {
        return (
          <TextDescriptionTemplate
            key={spec.label}
            text={spec.label}
            value={getValueFromLabel(spec.label)}
          />
        );
      })}
    </>
  );
};
