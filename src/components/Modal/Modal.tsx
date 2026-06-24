import React from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";

interface Props {
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<Props> = ({
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.overlay} role="presentation" onClick={onCancel}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={event => event.stopPropagation()}
      >
        <h3 className={classNames(styles.title, "text-h3")}>{title}</h3>
        <p className={classNames(styles.message, "text-body")}>{message}</p>
        <div className={styles.actions}>
          <button
            className={classNames(styles.cancel, "text-button")}
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={classNames(styles.confirm, "text-button")}
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
