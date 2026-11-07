import { Link } from 'react-router-dom';
import { HeadingWithCount } from '../HeadingWithCount';

type Props = {
  title: string;
  image: string;
  count: number;
  to: string;
};

export const CategoryCard = ({ title, image, count, to }: Props) => {
  return (
    <Link
      to={to}
      className="block min-w-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:border-none"
    >
      <img
        src={image}
        alt={title}
        className="aspect-square w-full object-cover"
      />
      <HeadingWithCount
        title={title}
        itemsCount={count}
        titleLevel="h3"
        className="mt-6"
      />
    </Link>
  );
};
