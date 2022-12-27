import { FC } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const Paragraph: FC<Props> = ({ selectedProductDetails }) => {
  return (
    <div className="about__subsection">
      <p className="about__paragraph">
        {selectedProductDetails.description}
      </p>
    </div>
  );
};
