import React, { useState } from 'react';
import styles from './Contacts.module.scss';
import { Button } from '../../components/Button';

export const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert('Message sent!');

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="container">
      <h1>Contacts</h1>

      <div className={styles.content}>
        <div className={styles.infoBlock}>
          <div className={styles.card}>
            <h3>Phone</h3>
            <a href="tel:+383657556578">+383 65 755 65 78</a>
            <p className="body-text">Monday - Friday, 9:00 - 18:00</p>
          </div>

          <div className={styles.card}>
            <h3>Email</h3>
            <a href="mailto:support@gadget.com">support@gadget.com</a>
            <p className="body-text">We’ll answer within 24 hours</p>
          </div>

          <div className={styles.card}>
            <h3>Office</h3>
            <a
              href="https://maps.google.com/?q=Kyiv+Khreshchatyk+1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.addressLink}
            >
              <span>Kyiv, Khreshchatyk str. 1, 01001, Ukraine</span>
            </a>
          </div>
        </div>

        <div className={styles.formBlock}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Write to us</h2>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className="small-text">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange}
                id="name"
                placeholder="Mykola Symonenko"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className="small-text">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className="small-text">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <Button variant="primary" className={styles.submitBtn}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
