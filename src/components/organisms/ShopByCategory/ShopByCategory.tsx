import { Typography } from '../../atoms/Typography/Typography';
import { CategoryCard } from '../../molecules/CategoryCard';

type Category = {
  title: string;
  image: string;
  count: number;
  to: string;
};

type Props = {
  categories: Category[];
};

export const ShopByCategory = ({ categories }: Props) => {
  return (
    <section>
      <Typography
        level="h2"
        className="mb-6 "
      >
        Shop by category
      </Typography>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 ">
        {categories.map((category) => (
          <CategoryCard
            key={category.to}
            {...category}
          />
        ))}
      </div>
    </section>
  );
};
