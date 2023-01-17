import { ProductSpecs } from '../../../types/ProductSpecs';

type Props = {
  product: ProductSpecs | undefined,
  imageSelector: number,
  setImageSelector: React.Dispatch<React.SetStateAction<number>>
};

export const ImagePart: React.FC<Props> = ({
  product,
  imageSelector,
  setImageSelector,
}) => (
  <div className="column is-half">
    <div className="columns">
      <div className="column is-one-quarter is-flex-mobile">
        {product?.images.slice(0, 3).map((image, i) => (
          <div
            key={product.id}
            className="box p-2 m-0 is-shadowless"
          >
            <button
              type="button"
              className="productDetails__image p-1"
              onClick={() => {
                setImageSelector(i);
              }}
            >
              <img src={`../_new/${image}`} alt={`${i}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="column">
        <div className="image">
          <img src={product?.images[imageSelector]} alt={`${imageSelector}`} />
        </div>
      </div>
    </div>
  </div>
);
