import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Categories } from '../types/navigation';

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  title: string;
  categories: Categories[];
}

export const CategoriesProduct: React.FC<Props> = ({
  className = '',
  title,
  categories,
  ...rest
}) => {
  return (
    <section
      className={twMerge('padding-inline-sm flex flex-col gap-6', className)}
      {...rest}
    >
      <h3>{title}</h3>

      <div className="flex flex-col gap-8 md:flex-row">
        {categories.map(category => {
          const { id, image, imageAlt, link, description, amount } = category;

          return (
            <div key={id} className="flex flex-col gap-6">
              <Link to={link}>
                <img
                  src={image}
                  alt={imageAlt}
                  className="
                    aspect-square w-full duration-500 md:hover:scale-105
                  "
                />
              </Link>

              <div className="flex flex-col gap-1">
                <h4 className="font-bold">{description}</h4>
                <p className="text-ellipsis">{amount} models</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
