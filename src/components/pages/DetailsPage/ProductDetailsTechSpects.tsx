import { Details } from '../../../utils/types/Details';
import { itemsForTech } from '../../../utils/listsNames';
import { Characteristics } from '../../Characteristics';

/* eslint-disable jsx-a11y/click-events-have-key-events */
type Props = {
  details : Details,
};

export const ProductDetailsTechSpects:React.FC<Props> = ({
  details,
}) => (
  <section>
    <div className="details__about--title">Tech specs</div>
    {details && <Characteristics details={details} items={itemsForTech} />}
  </section>
);
