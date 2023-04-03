import { DescriptionSection } from '../../types/Product';
import { ProductDetailsArticle } from '../ProductDetailsArticle';
import './style.scss';

type ProductDetailsAboutProps = {
  articles: DescriptionSection[],
};

export const ProductDetailsAbout: React.FC<ProductDetailsAboutProps> = ({
  articles,
}) => {
  return (
    <div className="product-about">
      {articles.map(article => (
        <div key={article.title} className="product-about__article">
          <ProductDetailsArticle article={article} />
        </div>
      ))}
    </div>
  );
};
