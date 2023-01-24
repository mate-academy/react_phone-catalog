/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, Suspense } from 'react';
import { Await, useLoaderData, useParams } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { ErrorText } from '../../types/ErrorText';
import { Product } from '../../types/Product';
import { Styles } from '../../types/Styles';
import { CatalogPage } from '../CatalogPage/CatalogPage';

const styles: Styles = require('./CatalogPageWrapper.module.scss');

const {
  CatalogPageWrapper__ErrorMessage: error,
} = styles;

export const CatalogPageWrapper: FC = () => {
  const { products } = useLoaderData() as { products: Product[] };
  const { category } = useParams();

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={products}
        errorElement={(
          <ErrorMessage
            warn
            isBig
            className={error}
            message={ErrorText.PageLoad}
          />
        )}
      >
        <CatalogPage key={category} />
      </Await>
    </Suspense>
  );
};
