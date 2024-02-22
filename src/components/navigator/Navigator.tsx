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

  return (
    <div className="navigation-block">
      <div>
        <img
          src="./img/icons/Home.svg"
          className="bottom-range"
          alt="img"
        />
      </div>
      <div>
        <img src="./img/icons/arrowRight.svg" alt="img" />
      </div>
      <div>{result}</div>
    </div>
  );
};
