import { useAppContext } from "../../../context/AppContext";
import HomeCategory from "./HomeCategory";

const HomeCategories = () => {
  const { categories } = useAppContext();

  return (
    <section>
      <h2 className="mb-6">Shop by category</h2>
      <div className="grid h-fit grid-cols-1 grid-rows-3 gap-4 small:grid-cols-3 small:grid-rows-1">
        {categories.map((category) => (
          <HomeCategory key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
