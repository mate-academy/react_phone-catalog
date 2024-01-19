type CategoryProps = {
  name: string
  imagePath: string
  productsCount: number
};

export const Category = ({ name, imagePath, productsCount }: CategoryProps) => {
  const countText = `${productsCount} models`;

  return (
    <div className="category">
      <img
        className="category__image"
        src={imagePath}
        alt={name}
      />

      <h3 className="category__name">{name}</h3>

      <p className="category__count">{countText}</p>
    </div>
  );
};
