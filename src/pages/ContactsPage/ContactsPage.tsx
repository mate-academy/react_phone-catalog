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
        <a href="tel:+380688362831">+380688362831</a>
      </p>
      <p>
        Viber/Telegram: +380688362831
      </p>
      <p>
        {'Email: '}
        <a href="mailto:info@example.com">lubomircucvara@gmail.com</a>
      </p>
      <p>
        {'GitHub: '}
        <a
          href="https://github.com/Liubomyr19"
          target="_blank"
          rel="noopener noreferrer"
        >
          Liubomyr19
        </a>
      </p>
    </div>
  );
};
