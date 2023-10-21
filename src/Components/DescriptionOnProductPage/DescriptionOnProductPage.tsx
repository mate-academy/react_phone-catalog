import { DetailsOfProducts } from '../../types/DetailsOfProduct';
import './DescriptionOnProductPage.scss';

type PropTypes = {
  product: DetailsOfProducts;
};

export const DescriptionOnProductPage: React.FC<PropTypes> = ({
  product,
}) => {
  const {
    resolution,
    screen,
    processor,
    ram,
    zoom,
    camera,
    description,
  } = product;

  return (
    <>
      <div className="description__secondary-left">
        <h2 className="description__secondary-title">About</h2>
        <ul
          className="description__general-info-list"
          data-cy="productDescription"
        >
          {description.map(desc => {
            const { title, text } = desc;

            return (
              <li className="description__general-info-item">
                <h3 className="description__general-info-title">
                  {title}
                </h3>
                <article className="description__general-text">
                  {text}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="description__secondary-right">
        <h2 className="description__secondary-title">Tech specs</h2>
        <div className="description__desc">
          <div className="description__box-left">
            <p className="description__desc-title">Screen</p>
            <p className="description__desc-title">Resolution</p>
            <p className="description__desc-title">Processor</p>
            <p className="description__desc-title">RAM</p>
            <p className="description__desc-title">Camera</p>
            <p className="description__desc-title">Zoom</p>
          </div>
          <div className="description__box-right">
            <p className="description__desc-char">{screen}</p>
            <p className="description__desc-char">{resolution}</p>
            <p className="description__desc-char">{processor}</p>
            <p className="description__desc-char">{ram}</p>
            <p className="description__desc-char">{zoom}</p>
            <p className="description__desc-char">{camera}</p>
          </div>
        </div>
      </div>
    </>
  );
};
