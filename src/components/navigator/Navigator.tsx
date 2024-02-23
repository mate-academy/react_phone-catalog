import { useContext } from 'react';
import { StateContext } from '../../AppContext';
import './Navigator.scss';

type Props = {
  path: string,
};

// function capitalize(path: string) {
//   const parts = path.split('/');
//   const newarr = parts.map(part => {
//     const letter = part.substring(1);
//     const firstLetter = part.charAt(0);
//     const result = firstLetter.toLocaleUpperCase() + letter;

//     return result;
//   });

//   return newarr;
// }

export const Navigator: React.FC<Props> = ({ path }) => {
  const parts = path.split('/');
  const letter = parts[1].substring(1);
  const firstLetter = parts[1].charAt(0);
  const result = firstLetter.toLocaleUpperCase() + letter;
  const { state } = useContext(StateContext);
  const findPhone = state.products.find(elem => elem.id === +parts[2]);

  return (
    <div className="navigation-block">
      <div className="mr-8 navigator-image">
        <img
          src="./img/icons/Home.svg"
          className="bottom-range"
          alt="img"
        />
      </div>
      <div className="mr-8 navigator-image">
        <img src="./img/icons/arrowRight.svg" alt="img" />
      </div>
      <div className="mr-8 navigator-text">{result}</div>

      <div className="mr-8 navigator-image">
        <img src="./img/icons/arrowRight.svg" alt="img" />
      </div>
      <div className="navigator-text navigator-text-second">
        {findPhone?.name}
      </div>
    </div>
  );
};
