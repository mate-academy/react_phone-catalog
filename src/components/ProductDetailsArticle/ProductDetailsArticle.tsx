import { DescriptionSection } from '../../types/Product';
import './style.scss';

type ProductDetailsArticleProps = {
  article: DescriptionSection;
};

export const ProductDetailsArticle: React.FC<ProductDetailsArticleProps> = ({
  article,
}) => {
  const { text, title } = article;

  return (
    <div
      className="product-article"
    >
      <h4
        className="
        product-article__title
        title
        title--small"
      >
        {title}
      </h4>

      {text.map(p => (
        <p
          key={p}
          className="product-article__text"
        >
          {p}
        </p>
      ))}
    </div>
  );
};
