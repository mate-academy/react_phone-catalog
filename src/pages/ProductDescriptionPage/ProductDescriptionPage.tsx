/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, Suspense } from 'react';
import { Await, useLoaderData, useParams } from 'react-router-dom';
import { NavMap } from '../../components/NavMap';
import {
  ProductDescriptionCard,
} from '../../components/ProductDescriptionCard';
import { Loader } from '../../components/Loader';
import { ProductDescription } from '../../types/ProductDescription';
import { Product } from '../../types/Product';
import { Proposal } from '../../components/Proposal';
import { Styles } from '../../types/Styles';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorText } from '../../types/ErrorText';
import { UpperFirst } from '../../types/UpperFirst';

const styles: Styles = require('./ProductDescriptionPage.module.scss');

const upperFirst: UpperFirst = require(
  '../../../node_modules/lodash/upperFirst',
);

const {
  ProductDescriptionPage: page,
  ProductDescriptionPage__NavMap: navMap,
  ProductDescriptionPage__Proposal: proposal,
  ProductDescriptionPage__ProductDescriptionCard: card,
  ProductDescriptionPage__ErrorMessage: error,
} = styles;

type LaderData = {
  product: ProductDescription,
  currentProduct: Product,
  relatedProducts: Product[],
};

export const ProductDescriptionPage: FC = () => {
  const {
    product,
    currentProduct,
    relatedProducts,
  } = useLoaderData() as LaderData;

  const { category } = useParams();

  return (
    <main className={page}>
      <Suspense
        fallback={<Loader />}
      >
        <Await
          resolve={Promise.all([currentProduct, product])}
          errorElement={<></>}
        >
          {([curr]: [Product]) => (
            <NavMap
              className={navMap}
              navItems={[
                upperFirst(category || ''),
                curr.name,
              ]}
            />
          )}
        </Await>

        <Await
          resolve={Promise.all([currentProduct, product])}
          errorElement={(
            <ErrorMessage
              message={ErrorText.ProductNotFound}
              className={error}
              isBig
              warn
            />
          )}
        >
          <ProductDescriptionCard
            className={card}
          />
        </Await>

        <Await
          resolve={relatedProducts}
          errorElement={<></>}
        >
          <Proposal
            className={proposal}
          >
            You may also like
          </Proposal>
        </Await>
      </Suspense>
    </main>
  );
};
