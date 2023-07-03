import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Product } from '../../utils/types/Product';
import { Details } from '../../utils/types/Details';
import { PageNavigation, ProductSlider, BlockTitle } from '../index';
import {
  ProductDetailsGalery, ProductDetailsAbout,
  ProductDetailsCharacteristics, ProductDetailsTechSpects,
} from '../Details/index';
import { getDetails } from '../../utils/getProducts';
import { DetailsLoader } from '../Details/DetailsLoader';

type Props = {
  products: Product[];
};

export const ProductPage: React.FC<Props> = ({ products }) => {
  const [details, setDetails] = useState<Details>();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const currentProduct = useMemo(() => {
    return products.find(product => product.itemId === id);
  }, [id, products]);

  useEffect(() => {
    const Id = setTimeout(() => {
      setIsLoading(true);
    }, 100);

    getDetails(id)
      .then((response) => setDetails(response))
      .finally(() => {
        clearInterval(Id);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <main>
      <div className={classnames(
        'block',
        { none: !isLoading },
      )}
      >
        <DetailsLoader />

      </div>
      <div className={`details ${details && !isLoading ? 'block' : 'none'}`}>
        <PageNavigation />
        <BlockTitle title={currentProduct?.name} subtitle={0} />
        <div className="details__blocks">
          {details && currentProduct
          && (
            <>
              <ProductDetailsGalery images={details?.images} />
              <ProductDetailsCharacteristics
                details={details}
                currentProduct={currentProduct}
              />
              <ProductDetailsAbout
                details={details}
              />
              <ProductDetailsTechSpects
                details={details}
              />

            </>
          )}

        </div>
        <ProductSlider products={products} title="You mau also like" />
      </div>

    </main>

  );
};
