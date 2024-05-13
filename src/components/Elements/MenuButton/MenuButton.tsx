type Props = {
  handleOpen: () => void;
};

export const HamburgerMenu: React.FC<Props> = ({ handleOpen }) => {
  return (
    <button
      className="button-square button-square--mobile"
      onClick={handleOpen}
    >
      <div className="icon icon--menu "></div>
    </button>
  );
};
