import { ProductDetail } from '../../pages/ProductDetails/ProductDetails';

import './detailsTextContent.scss';

export type TechSpecs =
  | 'screen'
  | 'resolution'
  | 'processor'
  | 'ram'
  | 'camera'
  | 'zoom'
  | 'cell';

interface Props {
  product: ProductDetail;
}

export const DetailsTextContent: React.FC<Props> = ({ product }) => {
  const techSpecs: TechSpecs[] = [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ];

  return (
    <div
      className="product-details-text-content
     product-details-text-content--margin"
    >
      <article className="product-details-text-conten__about">
        <h3 className="about-title">About</h3>

        {product.description.map(item => (
          <section key={item.title} className="description">
            <h3 className="description__title"> {item.title} </h3>
            <p className="description__paragraph">{item.text} </p>
          </section>
        ))}
      </article>

      <section className="tech-specs">
        <h3 className="about-title">Tech specs</h3>
        <div className="product-card-info product-card-info--margin">
          {techSpecs.map(char => (
            <div key={char} className="product-card-info-box">
              <div className="product-card-info-box__name">{char}:</div>
              <div className="product-card-info-box__ch">{product[char]}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
