import { Section } from './components/Section';
import { TechSpecItem } from './components/TechSpecItem';
import { ProductContentBottomProps, TechSpec } from './types/types';
import './ProductContentBottom.scss';

const formatTechSpecValue = (value: string | string[]): string => {
  return Array.isArray(value) ? value.join(', ') : value;
};

export const ProductContentBottom: React.FC<ProductContentBottomProps> = ({
  selectedProduct,
}) => {
  const techSpecs: TechSpec[] = [
    { label: 'Screen', value: selectedProduct.screen ?? '' },
    { label: 'Resolution', value: selectedProduct.resolution ?? '' },
    { label: 'Processor', value: selectedProduct.processor ?? '' },
    { label: 'RAM', value: selectedProduct.ram ?? '' },
    { label: 'Built in memory', value: selectedProduct.capacity ?? '' },
    { label: 'Camera', value: selectedProduct.camera ?? '' },
    { label: 'Zoom', value: selectedProduct.zoom ?? '' },
    { label: 'Cell', value: selectedProduct.cell ?? [] },
  ];

  return (
    <div className="detailsPage__content-buttom">
      <Section title="About" className="detailsPage__block-about">
        <div className="detailsPage__description">
          {selectedProduct.description.map((chunk, index) => (
            <div className="detailsPage__section" key={index}>
              <span className="detailsPage__section-title">{chunk.title}</span>
              <span className="detailsPage__section-description">
                {chunk.text}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tech specs" className="detailsPage__block-techSpecs">
        <div className="detailsPage__techSpecs-content">
          {techSpecs.map(({ label, value }) => (
            <TechSpecItem
              key={label}
              label={label}
              value={formatTechSpecValue(value)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};
