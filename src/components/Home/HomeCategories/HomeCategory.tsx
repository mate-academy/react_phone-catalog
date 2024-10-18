import { Link } from "react-router-dom";
import { Category } from "../../../types/category";

type Props = {
  category: Category;
};

const HomeCategory = ({ category }: Props) => {
  const { name, img, array, backgroundColor, to } = category;

  return (
    <article className="flex flex-col gap-6">
      <Link
        to={to}
        style={{
          backgroundColor: backgroundColor,
        }}
        className="overflow-hidden rounded-xl"
      >
        <img
          src={img}
          alt={name}
          className="ease aspect-square w-full cursor-pointer object-cover object-left-top duration-300 hover:scale-110"
        />
      </Link>
      <div>
        <h4>{name}</h4>
        <p className="text-bodyText text-sec">{`${array.length} models`}</p>
      </div>
    </article>
  );
};

export default HomeCategory;
