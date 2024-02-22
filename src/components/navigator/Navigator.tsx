type Props = {
  path: string,
};

export const Navigator: React.FC<Props> = ({ path }) => {
  // const parts = path.split('/');
  // const letter = parts[1].slice(1);

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
      <div>{path}</div>
    </div>
  );
};
