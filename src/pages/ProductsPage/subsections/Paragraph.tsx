import { FC } from 'react';
import { ProdcutDetails } from 'src/types/ProductDetails';
import { generateKey } from 'src/utils/helpers/generateKey';

type Props = {
  selectedProductDetails: ProdcutDetails,
};

export const Paragraph: FC<Props> = ({ selectedProductDetails }) => {
  const detailsArr = selectedProductDetails.description;

  return (
    <>
      {detailsArr.map((el) => {
        const { title, text } = el;
        const key = generateKey(title);

        return (
          <div key={key} className="about__subsection">
            <h1 className="about__subtitle">{title}</h1>
            <p className="about__paragraph">
              {text}
            </p>
          </div>
        );
      })}
    </>
  );
};
