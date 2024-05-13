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
      {/* <CategoryImage photoSrc={photoSrc} /> */}
      <div className="category__image-wrapper">
        <img
          className="category__image"
          src={photoSrc}
          alt="Image of a product category"
        />
      </div>

      <div className="category__info">
        <h3 className="category__title">{title}</h3>
        <p className="category__amount">Models: {modelsAmount}</p>
      </div>
    </article>
  );
};
