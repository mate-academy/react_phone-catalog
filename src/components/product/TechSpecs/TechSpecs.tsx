import './TechSpecs.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

export const TechSpecs: React.FC<Props> = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}) => {
  const { t } = useTranslation();

  const specs = [
    { label: t('product.screen'), value: screen },
    { label: t('product.resolution'), value: resolution },
    { label: t('product_details.processor'), value: processor },
    { label: t('product.ram'), value: ram },
    { label: t('product.capacity'), value: capacity },
    { label: t('product_details.camera'), value: camera },
    { label: t('product_details.zoom'), value: zoom },
    { label: t('product_details.cell'), value: cell?.join(', ') },
  ];

  return (
    <div className="TechSpecs">
      <h3 className="TechSpecs__title">{t('product_details.tech_specs')}</h3>

      {specs.map(
        (spec) =>
          spec.value && (
            <p
              className="TechSpecs__item"
              key={spec.label}
            >
              <span className="TechSpecs__name">{spec.label}</span>
              <span className="TechSpecs__value">{spec.value}</span>
            </p>
          ),
      )}
    </div>
  );
};
