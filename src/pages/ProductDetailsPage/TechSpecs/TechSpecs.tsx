import { DetailedProduct } from '../../../types/DetailedProduct';
import { DetailedProductKeys } from '../../../types/DetailedProductKeys';
import './TechSpecs.scss';
import '../../../styles/main.scss';

type Props = {
  product: DetailedProduct;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  // Wanted specs
  const wantedSpecs = [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ];

  return (
    <section className="tech-specs section">
      <div className="tech-specs__top">
        <h3 className="tech-specs__title title--3">Tech specs</h3>
        <hr className="divider tech-specs__divider" />
      </div>

      <div className="info-pairs tech-specs__info-pairs">
        {wantedSpecs.map((spec: string) => {
          return spec in product ? (
            <div key={spec} className="info-pairs__pair">
              <p className="info-pairs__label body-text--14">{spec}</p>
              <p className="info-pairs__value body-text--14">
                {Array.isArray(product[spec as DetailedProductKeys])
                  ? (product[spec as DetailedProductKeys] as []).join(', ')
                  : (product[spec as DetailedProductKeys] as string)}
              </p>
            </div>
          ) : (
            false
          );
        })}
      </div>
    </section>
  );
};
