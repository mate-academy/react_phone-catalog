import { IProductDetails } from '../../types';

import './ProductDescriptionSection.scss';

type Props = {
  productDetails: IProductDetails;
};

export const ProductDescriptionSection: React.FC<Props> = ({
  productDetails,
}) => {
  return (
    <section className="product-detailed-info" data-cy="productDescription">
      <h2 className="product-detailed-info__title">About</h2>

      {productDetails.description.map(el => (
        <article className="product-detailed-info__article" key={el.text}>
          <h3 className="product-detailed-info__article-title">{el.title}</h3>

          <p className="product-detailed-info__article-text">{el.text}</p>
        </article>
      ))}
    </section>
  );
};
