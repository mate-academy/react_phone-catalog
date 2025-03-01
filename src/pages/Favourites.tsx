import ListOfFavourites from '../components/Main/ListOfFavourites/ListOfFavourites';
import '../styles/pages/Favourites.scss';

export const Favourites: React.FC = () => {
  const num = 5;

  return (
    <section className="favourites">
      <h1>Favourites</h1>
      <div>{num} items</div>
      <ListOfFavourites />
    </section>
  );
};

export default Favourites;
