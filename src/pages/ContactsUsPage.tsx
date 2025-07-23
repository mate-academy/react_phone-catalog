import { useState } from 'react';
import { FacebookIcon } from '../images/icons/FacebookIcon';
import { GithubIcon } from '../images/icons/GithubIcon';
import { InstagramIcon } from '../images/icons/InstagramIcon';
import { WhatsUpIcon } from '../images/icons/WhatsUpIcon';
import { useLanguage } from '../context/language/useLanguage';
import { contactsUsPageDictionary } from '../i18n/contactsUsPageDictionary';

export const ContactsUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { currentLanguage } = useLanguage();
  const translations = contactsUsPageDictionary[currentLanguage];

  const isFormValid = name.trim() && email.trim() && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    console.log({ name, email, message });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-form-background dark:bg-dark-background">
      <div
        className="w-full"
        style={{ minHeight: 400, maxHeight: 500 }}
      >
        <iframe
          title="Google map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.2934367580833!2d30.49326942304257!3d50.448647338856176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce8b1ccce8d9%3A0x3a7222e0f6ae376c!2z0J3QsNGG0LjQvtC90LDQu9GM0L3Ri9C5INGG0LjRgNC6INCj0LrRgNCw0LjQvdGL!5e0!3m2!1suk!2sua!4v1752049122996!5m2!1suk!2sua"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex justify-center">
        <section className="w-full max-w-4xl px-4 sm:px-8 mt-8 mb-16">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary dark:text-dark-primary">
              {translations.title}
            </h2>
            <div className="h-1 w-24 bg-elements dark:bg-dark-elements mb-8" />

            <div className="flex flex-col md:flex-row gap-12 w-full">
              <div className="flex-1 flex flex-col items-start gap-4">
                <div className="flex gap-5 text-xl">
                  <a href="#">
                    <FacebookIcon
                      width="20px"
                      height="20px"
                      color="black"
                    />
                  </a>
                  <a href="#">
                    <InstagramIcon
                      width="20px"
                      height="20px"
                      color="black"
                    />
                  </a>
                  <a href="#">
                    <WhatsUpIcon
                      width="20px"
                      height="20px"
                      color="black"
                    />
                  </a>
                  <a href="#">
                    <GithubIcon
                      width="20px"
                      height="20px"
                      color="black"
                    />
                  </a>
                </div>
                <p className="text-primary dark:text-dark-primary text-sm">
                  {translations.socialText}
                </p>
                <div className="text-primary dark:text-dark-primary text-base font-medium">
                  {translations.phone}
                </div>
                <div
                  className="text-primary dark:text-dark-primary text-base font-medium"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {translations.address}
                </div>
                <div className="text-primary dark:text-dark-primary text-base font-medium">
                  {translations.email}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex-1 flex flex-col gap-4"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder={translations.placeholderName}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="flex-1 border border-elements dark:border-dark-elements rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-form-focus dark:focus:ring-dark-form-focus bg-form-background dark:bg-dark-form-background text-primary dark:text-dark-primary"
                  />
                  <input
                    type="email"
                    placeholder={translations.placeholderEmail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 border border-elements dark:border-dark-elements rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-form-focus dark:focus:ring-dark-form-focus bg-form-background dark:bg-dark-form-background text-primary dark:text-dark-primary"
                  />
                </div>
                <textarea
                  placeholder={translations.placeholderMessage}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="border border-elements dark:border-dark-elements rounded px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-form-focus dark:focus:ring-dark-form-focus resize-none bg-form-background dark:bg-dark-form-background text-primary dark:text-dark-primary"
                />

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`self-end px-8 py-2 rounded transition
                  ${
                    isFormValid
                      ? 'bg-primary dark:bg-dark-primary text-white dark:text-black hover:bg-secondary dark:hover:bg-dark-secondary cursor-pointer'
                      : 'bg-elements dark:bg-dark-elements text-secondary dark:text-dark-secondary cursor-not-allowed'
                  }`}
                >
                  {translations.buttonSend}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
