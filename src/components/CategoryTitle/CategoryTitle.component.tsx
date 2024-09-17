type Props = {
  title: string;
  productsCount: number;
};

export const CategoryTitle: React.FC<Props> = ({ title, productsCount }) => {
  return (
    <article className="categoryTitle">
      <h1>{title}</h1>
      <span>
        {productsCount} {title === 'Favorites' ? 'item(s)' : 'model(s)'}
      </span>
    </article>
  );
};
