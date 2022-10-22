import { bigTechSpecs, Details, smallTechSpecs } from '../../data/tech-specs';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
  title: string,
  baseClassName: string;
};
export const TechSpecs: React.FC<Props> = ({
  product,
  title,
  baseClassName,
}) => {
  let techSpecs: Details = [];

  if (!title) {
    techSpecs = smallTechSpecs(product);
  } else {
    techSpecs = bigTechSpecs(product);
  }

  return (
    <div data-cy="TechSpecs">
      <h2>{title}</h2>
      <div className="row" />
      <div className="details-table">
        <div className="details-table__grid">
          <div className="details-table__options">
            {techSpecs.map(item => (
              <span
                key={item.option}
                className={`
                  ${baseClassName} 
                  ${baseClassName}--light 
                  ${baseClassName}--huge
                `}
              >
                {item.option}
              </span>
            ))}
          </div>

          <div className="details-table__values">
            {techSpecs.map(item => (
              <span
                key={item.option}
                className={`
                  ${baseClassName} 
                  ${baseClassName}--huge
                `}
              >
                {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
