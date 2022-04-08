import { FunctionComponent } from 'react';

// Styles
import './Total.scss';

// Components

import { PrimaryButton } from '../PrimaryButton';

type Props = {
  totalSum: number;
  productsCount: number;
};

export const Total: FunctionComponent<Props> = ({ totalSum, productsCount }) => (
  <div className="Total">
    <div className="Total__sum">
      <h2 className="Total__title">{`$${totalSum}`}</h2>

      <p>{`Total for ${productsCount} ${productsCount > 1 ? 'items' : 'item'}`}</p>
    </div>

    <div className="Total__button">
      <PrimaryButton selected={false} callback={() => {}}>
        Checkout
      </PrimaryButton>
    </div>
  </div>
);
