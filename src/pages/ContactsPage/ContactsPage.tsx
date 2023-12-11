import './ContactsPage.scss';

export const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <h1>Contact Information</h1>
      <p>
        {`If you have any questions about the Phone Catalog project or would 
    like to get in touch, please feel free to reach out.`}
      </p>
      <p>
        {'Phone: '}
        <a href="tel:+380635349175">+380635349175</a>
      </p>
      <p>
        Viber/Telegram: +380635349175
      </p>
      <p>
        {'Email: '}
        <a href="mailto:info@example.com">reseneweb@gmail.com</a>
      </p>
      <p>
        {'GitHub: '}
        <a
          href="https://github.com/reseneweb"
          target="_blank"
          rel="noopener noreferrer"
        >
          reseneweb
        </a>
      </p>
    </div>
  );
};
