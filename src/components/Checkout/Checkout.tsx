import { useState } from 'react';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { useFormHandling } from '../../forms/useFormHandling';
import { formFieldsData } from '../../forms/formFieldsValues';
import styles from './Checkout.module.scss';
import closeButton from '../../../public/img/icons/close-button-icon.svg';

interface CheckoutProcessProps {
  onClose: () => void;
}

export const CheckoutProcess: React.FC<CheckoutProcessProps> = ({
  onClose,
}) => {
  const [isSuccessMessageOpen, setIsSuccessMessageOpen] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(true);

  const {
    formValues,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateFieldsOnSubmit,
  } = useFormHandling();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateFieldsOnSubmit()) {
      return;
    }

    setIsCheckoutVisible(false);

    setTimeout(() => {
      setIsSuccessMessageOpen(true);
    }, 500);
  };

  if (!isCheckoutVisible) {
    return isSuccessMessageOpen ? <SuccessMessage /> : null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.container}>
          <button className={styles.closeButton} onClick={onClose}>
            <img
              src={closeButton}
              className={styles.closeImage}
              alt="Close modal"
            />
          </button>
          <h1 className={styles.title}>Payment & Delivery</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            {formFieldsData
              .slice(0, 5)
              .map(({ id, type, label, pattern, placeholder }) => (
                <div key={id} className={styles.inputGroup}>
                  <label htmlFor={id} className={styles.label}>
                    {label}
                  </label>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    pattern={pattern}
                    placeholder={placeholder}
                    className={`${styles.input} ${formErrors[id] ? styles.errorInput : ''}`}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    value={formValues[id] || ''}
                  />
                  {formErrors[id] && (
                    <span className={styles.errorText}>{formErrors[id]}</span>
                  )}
                </div>
              ))}
            <div className={styles.row}>
              {formFieldsData
                .slice(5)
                .map(({ id, type, label, pattern, maxLength, placeholder }) => (
                  <div key={id} className={styles.group}>
                    <label htmlFor={id} className={styles.label}>
                      {label}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      required
                      pattern={pattern}
                      maxLength={maxLength}
                      placeholder={placeholder}
                      className={`${styles.input} ${formErrors[id] ? styles.errorInput : ''}`}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      value={formValues[id] || ''}
                    />
                    {formErrors[id] && (
                      <span className={styles.errorText}>{formErrors[id]}</span>
                    )}
                  </div>
                ))}
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.button}>
                Complete Purchase
              </button>
            </div>
          </form>

          {isSuccessMessageOpen && <SuccessMessage />}
        </div>
      </div>
    </div>
  );
};
