import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/atoms';
import styles from './ContactsTemplate.module.scss';
import { useState } from 'react';
import type {
  ContactFormData,
  Developer,
} from '@/pages/ContactsPage/ContactsPage.types';
import { ArrowButton, TextButton } from '@/components/molecules';
import { Link } from 'react-router-dom';

type Props = {
  developersData: Developer[];
};

export const ContactsTemplate = ({ developersData }: Props) => {
  const { t } = useTranslation();

  const [openDevId, setOpenDevId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    'title': '',
    'e-mail': '',
    'text': '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(
    null,
  );

  const toggleCollapsible = (id: number) => {
    setOpenDevId((prev) => (prev === id ? null : id));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSaveStatus(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSend = () => {
    setIsSubmitted(true);

    if (
      !formData.title.trim() ||
      !formData['e-mail'].trim() ||
      !formData.text.trim()
    ) {
      return;
    }

    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem('contacts_messages') || '[]',
      );
      const existingMessages = Array.isArray(saved) ? saved : [];

      localStorage.setItem(
        'contacts_messages',
        JSON.stringify([...existingMessages, formData]),
      );
      setFormData({ 'title': '', 'e-mail': '', 'text': '' });
      setIsSubmitted(false);
      setSaveStatus('success');
    } catch (error) {
      console.error('Unable to save contact message:', error);
      setSaveStatus('error');
    }
  };
  return (
    <div className={styles.container}>
      <Typography
        variant="h3"
        className={styles.title}
      >
        {t('contactsPageTitle')}
      </Typography>

      <div className={styles.developersSection}>
        <Typography
          variant="h4"
          className={styles.sectionTitle}
        >
          {t('contactsDevelopers')}
        </Typography>
        <div className={styles.collapsiblesList}>
          {developersData.map((dev) => {
            const isOpen = openDevId === dev.id;
            return (
              <div
                key={dev.id}
                className={styles.collapsibleItem}
              >
                <button
                  type="button"
                  className={styles.collapsibleHeader}
                  onClick={() => toggleCollapsible(dev.id)}
                >
                  <Typography variant="bodytext">{dev.name}</Typography>
                  <ArrowButton
                    className={styles.arrow}
                    direction={`${isOpen ? 'up' : 'down'}`}
                  />
                </button>
                {isOpen && (
                  <div className={styles.collapsibleContent}>
                    <Typography variant="smalltext">
                      {t('contactsRole')}: {t(dev.role)}
                    </Typography>

                    {dev.info && (
                      <Typography variant="smalltext">{dev.info}</Typography>
                    )}

                    <Typography variant="smalltext">
                      <Link
                        to={dev.link || '#'}
                        className={styles.devLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </Link>
                    </Typography>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
        className={styles.form}
      >
        <Typography
          variant="h4"
          className={styles.sectionTitle}
        >
          {t('contactsFormTitle')}
        </Typography>
        <div className={styles.fieldWrapper}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('contactsNamePlaceholder')}
            className={`${styles.input} ${isSubmitted && !formData.title.trim() ? styles.errorInput : ''}`}
          />
          {isSubmitted && !formData.title.trim() && (
            <Typography
              variant="smalltext"
              className={styles.errorText}
            >
              {t('contactsRequired')}
            </Typography>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <input
            type="email"
            name="e-mail"
            value={formData['e-mail']}
            onChange={handleChange}
            placeholder={t('contactsEmailPlaceholder')}
            className={`${styles.input} ${isSubmitted && !formData['e-mail'].trim() ? styles.errorInput : ''}`}
          />
          {isSubmitted && !formData['e-mail'].trim() && (
            <Typography
              variant="smalltext"
              className={styles.errorText}
            >
              This field is required
            </Typography>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder={t('contactsMessagePlaceholder')}
            rows={9}
            className={`${styles.textarea} ${isSubmitted && !formData.text.trim() ? styles.errorInput : ''}`}
          />
          {isSubmitted && !formData.text.trim() && (
            <Typography
              variant="smalltext"
              className={styles.errorText}
            >
              This field is required
            </Typography>
          )}
        </div>

        {saveStatus && (
          <Typography
            variant="smalltext"
            className={
              saveStatus === 'success' ? styles.successText : styles.errorText
            }
            role="status"
          >
            {saveStatus === 'success' ?
              t('contactsSuccess')
            : t('contactsSaveError')}
          </Typography>
        )}

        <TextButton type="submit">{t('contactsSend')}</TextButton>
      </form>

      <div className={styles.contentWrapper}>
        <div className={styles.info}>
          <Typography variant="bodytext">{t('contactsAddress')}</Typography>
          <Typography variant="bodytext">
            localhostenterprises@whatevermail.com
          </Typography>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2660.782762464407!2d32.56954107619097!3d48.172267971247344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDjCsDEwJzIwLjIiTiAzMsKwMzQnMTkuNiJF!5e0!3m2!1suk!2sua!4v1792499880466!5m2!1suk!2sua"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={t('contactsMapTitle')}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
