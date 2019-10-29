import React from 'react';
import PropTypes from 'prop-types';

const SendEmail = ({ handleClose }) => (
  <div className="send_email">
    <div className="send-email_close">
      <button
        type="button"
        className="email__hide-send_email"
        onClick={handleClose}
      >
        <img

          src="img/close_icon.svg"
          alt="close window"
        />
      </button>

    </div>

    <img src="img/envelope.svg" alt="Check your email" />
    <h1 className="send-email_text">Thank you</h1>
    <p className="send-email_check">please Check your email</p>
    <p className="send__email_button">
      <button
        type="button"
        className="send-email_button"
        onClick={handleClose}
      >
        Ok, tnx
      </button>
    </p>
  </div>
);

SendEmail.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default SendEmail;
