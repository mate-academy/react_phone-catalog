import { Link } from 'react-router-dom';

type Props = {
  modelQuantity: number;
  name: string;
  background: string;
  image: string;
  alt: string;
  categoryRoute: string;
};
// sm:w-48 sm:h-64 lg:w-80 lg:h-[390px]

const CategoryBox: React.FC<Props> = ({
  modelQuantity,
  name,
  background,
  image,
  alt,
  categoryRoute,
}) => {
  return (
    <Link to={`/${categoryRoute}`}>
      <div
        className=" justify-between  size-auto sm:min-w-52
       sm:h-[262px] lg:w-[25rem] lg:h-[443px] gap-4 
        flex flex-col"
      >
        <div
          className={`size-80 transition-all hover:scale-[1.05] w-fit ${background}  overflow-hidden `}
        >
          <img
            className="relative top-14 left-16 sm:top-10 
            sm:left-12 lg:top-20 lg:left-20"
            src={image}
            alt={alt}
          />
        </div>
        <div>
          <h2 className="text-xl">{name}</h2>
          <p className="text-gray-400 text-sm">{`${modelQuantity} models`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryBox;
