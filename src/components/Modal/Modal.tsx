import classNames from "classnames";
import React, {useEffect, useState} from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const Modal: React.FC<Props> = ({isOpen, setIsOpen}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsVisible(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <>
      <div className="container">
        {isOpen && (
          <aside className="modal">
            <div
              className={classNames("modal__overlay", {
                "modal__overlay__is-show": isVisible,
              })}
            >
              <div
                className={classNames("modal__content", {
                  "modal__content__is-open": isVisible,
                })}
              >
                <img
                  className="modal__img"
                  src="./img/modal/modal.svg"
                  alt="teamwork"
                />
                <p className="modal__text">
                  Let’s make your project <strong>awesome</strong> with all the
                  features you <span>love</span> together
                </p>

                <button className="modal__btn" onClick={() => closeModal()}>
                  <img
                    className="modal__btn-img"
                    src="./img/modal/cross.svg"
                    alt="cross"
                  />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
};
