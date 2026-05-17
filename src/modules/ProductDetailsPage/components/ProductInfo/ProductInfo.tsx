import { ProductSpecs, Spec } from '../../../../shared/components/ProductSpecs';
import { ProductDetails } from '../../../../types/Product';
import style from './ProductInfo.module.scss';

type Props = {
  productDetails: ProductDetails;
  productSpec: Spec[];
};

export const ProductInfo: React.FC<Props> = ({
  productDetails,
  productSpec,
}) => {
  return (
    <section className={style.productDescription}>
      <div className={style.about}>
        <h3 className={style.sectionTitle}>About</h3>
        {productDetails.description.map(detail => (
          <article key={detail.title}>
            <h4 className={style.descriptionTitle}>{detail.title}</h4>
            <p className={style.description}>{detail.text}</p>
          </article>
        ))}
      </div>

      <div className={style.techSpecs}>
        <h3 className={style.sectionTitle}>Tech specs</h3>
        {productSpec && productSpec.length > 0 && (
          <ProductSpecs specs={productSpec} />
        )}
      </div>
    </section>
  );
};
