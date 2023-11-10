import './ContactForm.scss';
import { useContext, useState } from 'react';
import {
  NotificationContext, NotificationStatus,
} from '../../storage/NotificationContext';
import { ModalContext } from '../../storage/ModalContext';

const regexName = /^[a-zA-Z]{3,20}$/;
const regexSurname = /^\w{3,20}$/;
const regexPhone = /^(\+?38)?\s?0\d{9}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm = () => {
  const { setNotification } = useContext(NotificationContext);
  const { setIsModalShow } = useContext(ModalContext);

  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [surName, setSurName] = useState('');
  const [hasSurNameError, setHasSurNameError] = useState(false);

  const [phone, setPhone] = useState('');
  const [hasPhoneError, setHasPhoneError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const reset = () => {
    setName('');
    setSurName('');
    setPhone('');
    setEmail('');
    setHasNameError(false);
    setHasSurNameError(false);
    setHasPhoneError(false);
    setHasEmailError(false);
  };

  const close = () => {
    reset();
    setIsModalShow(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    const nameIsValid = name.trim().length > 0
      && regexName.test(name);
    const surNameIsValid = surName.trim().length > 0
      && regexSurname.test(surName);
    const phoneIsValid = regexPhone.test(phone);
    const emailIsValid = regexEmail.test(email);

    setHasNameError(!nameIsValid);
    setHasSurNameError(!surNameIsValid);
    setHasPhoneError(!phoneIsValid);
    setHasEmailError(!emailIsValid);

    if (!nameIsValid
      || !surNameIsValid
      || !phoneIsValid
      || !emailIsValid
    ) {
      return;
    }

    setNotification({
      message: 'We will be in touch shortly',
      color: NotificationStatus.Success,
    });

    close();
  };

  return (
    <div className="contact-form">
      <form
        className="contact-form__form"
        onSubmit={handleSubmit}
      >
        <h2
          className="contact-form__title"
        >
          Contact Us
        </h2>
        <div className="contact-form__form">
          <div className="contact-form__field">
            <label
              className="contact-form__label"
              htmlFor="name"
            >
              Name
            </label>
            <div className="control">
              <input
                id="name"
                className="contact-form__input"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {hasNameError && (
              <p className="contact-form__error">
                Name must be at least 3 characters
              </p>
            )}
          </div>

          <div className="contact-form__field">
            <label
              className="contact-form__label"
              htmlFor="surname"
            >
              Surname
            </label>
            <div className="control">
              <input
                id="surname"
                className="contact-form__input"
                type="text"
                placeholder="Surname"
                name="surname"
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
              />
            </div>

            {hasSurNameError && (
              <p className="contact-form__error">
                Surname must be at least 3 characters
              </p>
            )}
          </div>

          <div className="contact-form__field">
            <label
              className="contact-form__label"
              htmlFor="phone"
            >
              Phone number
            </label>
            <div className="control">
              <input
                className="contact-form__input"
                id="phone"
                type="tel"
                placeholder="Phone number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {hasPhoneError && (
              <p className="contact-form__error">
                This phone is invalid
              </p>
            )}
          </div>

          <div className="contact-form__field">
            <label
              className="contact-form__label"
              htmlFor="email"
            >
              Email
            </label>
            <div className="control">
              <input
                className="contact-form__input"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {hasEmailError && (
              <p className="contact-form__error">
                This email is invalid
              </p>
            )}
          </div>
        </div>

        <div className="control">
          <button
            type="submit"
            className="contact-form__button"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
