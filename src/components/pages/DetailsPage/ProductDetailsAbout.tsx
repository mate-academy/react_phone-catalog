import { Details } from '../../../utils/types/Details';

/* eslint-disable jsx-a11y/click-events-have-key-events */
type Props = {
  details : Details,
};

export const ProductDetailsAbout:React.FC<Props> = ({ details }) => {
  return (
    <section className="details__about" data-cy="productDescription">
      <div className="details__about--title">About</div>
      {details.description.map(item => (
        <div className="details__about--content">
          <div className="details__about--content--title">
            {item.title}
          </div>
          <div className="details__about--content--description">
            {item.text}
          </div>
        </div>
      ))}

    </section>
  );
};
