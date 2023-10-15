/* eslint-disable max-len */
import { useContext, useState } from 'react';
import { NotificationContext, NotificationStatus } from '../../storage/notificationContext';
import './contactForm.scss';

const regexName = /^[a-zA-Z]{3,20}$/;
const regexSurname = /^\w{3,20}$/;
const regexPhone = /^(\+?38)?\s?0\d{9}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexComment = /^.{10,100}$/;

export const ContactForm: React.FC = () => {
  const { setNotification } = useContext(NotificationContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCommentError('');
    setEmailError('');
    setNameError('');
    setPhoneError('');
    setSurnameError('');

    const testName = regexName.test(name.trim());
    const testSurname = regexSurname.test(surname.trim());
    const testPhone = regexPhone.test(phone.trim());
    const testEmail = regexEmail.test(email.trim());
    const testComment = regexComment.test(comment.trim());

    const success
      = testComment && testEmail && testName && testPhone && testSurname;

    if (!testName) {
      setNameError('Name must be between 3 and 20 characters');
    }

    if (!testSurname) {
      setSurnameError(
        'Surname must be between 3 and 20 characters and a single word',
      );
    }

    if (!testPhone) {
      setPhoneError(
        'Phone number must be in "0xxxxxxxxx" or "+380xxxxxxxxx" format',
      );
    }

    if (!testEmail) {
      setEmailError('Email must have "@" and "." symbols without spaces');
    }

    if (!testComment) {
      setCommentError('Comment must have between 10 and 100 characters');
    }

    if (!success) {
      return;
    }

    setNotification({
      message: 'We are sorry, but this feature is not implemented yet',
      color: NotificationStatus.Warning,
    });
  };

  return (
    <div className="contact-form">
      <h2 className="contact-form__title">Contact us</h2>

      <form className="contact-form__form" onSubmit={handleSubmit}>
        <div className="contact-form__set">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="contact-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <span className="contact-form__error">{nameError}</span>}
        </div>

        <div className="contact-form__set">
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className="contact-form__input"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {surnameError && <span className="contact-form__error">{surnameError}</span>}
        </div>

        <div className="contact-form__set">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="contact-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="contact-form__error">{emailError}</span>}
        </div>

        <div className="contact-form__set">
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            className="contact-form__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <span className="contact-form__error">{phoneError}</span>}
        </div>

        <div className="contact-form__set">
          <input
            type="text"
            name="comment"
            placeholder="Comment"
            className="contact-form__input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {commentError && <span className="contact-form__error">{commentError}</span>}
        </div>

        <button type="submit" className="contact-form__button">
          Send
        </button>
      </form>
    </div>
  );
};
