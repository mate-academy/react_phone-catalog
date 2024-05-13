import './CategoryCard.scss';

type Props = {
  title: string;
  photoSrc: string;
  modelsAmount: number;
};

export const CategoryCard: React.FC<Props> = ({
  title,
  photoSrc,
  modelsAmount,
}) => {
  return (
    <article className="category">
      <img
        className="category__image"
        src={photoSrc}
        alt="Image of a product category"
      />

      <div className="category__info">
        <h3 className="category__title">{title}</h3>
        <p className="category__amount">Models: {modelsAmount}</p>
      </div>
    </article>
  );
};
