import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { NewModels } from "../../components/NewModels";

export const HomePage: React.FC = () => {
  return (
    <main>
      <Header />
      <NewModels />
      <Categories />
    </main>
  );
}