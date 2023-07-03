import { Details } from '../../utils/types/Details';

/* eslint-disable jsx-a11y/click-events-have-key-events */
type Props = {
  details : Details,
};

const itemsForTech
= ['Screen',
  'Resolution',
  'Processor',
  'RAM',
  'Built in memory',
  'Camera',
  'Zoom',
  'Cell'];

export const ProductDetailsTechSpects:React.FC<Props> = ({
  details,
}) => {
  const cell = [details?.cell.join(',')];

  return (
    <section className="details__Tech-specs">
      <div className="details__about--title">Tech specs</div>
      {details && itemsForTech.map(item => (
        <div className="card__characteristics--item" key={item}>
          <div className="card__characteristics--title">{item }</div>
          <div className="card__characteristics--characteristic">
            {item === 'Cell'
              ? cell
              : details[item.toLocaleLowerCase()]}
          </div>
        </div>
      ))}
    </section>
  );
};
