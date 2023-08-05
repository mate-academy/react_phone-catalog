import { FC } from 'react';

type Props = {
  setPopUpState: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PopUp: FC<Props> = ({ setPopUpState }) => {
  const handleClosePopUp = () => {
    setPopUpState(false);
  };

  return (
    <div className="pop-up">
      <div className="pop-up__content-pop-up content-pop-up">
        <h1 className="content-pop-up__title-message">
          We are sorry, but this feature is not implemented yet
        </h1>
        <button
          type="button"
          className="content-pop-up__close-button"
          onClick={handleClosePopUp}
        >
          <img src="images/icons/CloseButtonDark.svg" alt="Close" />
        </button>
      </div>
    </div>
  );
};
