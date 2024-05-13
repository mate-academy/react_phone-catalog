import './CategoryImage.scss';

type Props = {
  photoSrc: string;
};

export const CategoryImage: React.FC<Props> = ({ photoSrc }) => {
  return (
    <div className="category-image">
      <img
        className="category-image__image"
        src={photoSrc}
        alt="Image of a product category"
      />
    </div>
  );
};
