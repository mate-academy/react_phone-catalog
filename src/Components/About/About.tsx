import React from 'react';

export const AboutMe: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Про мене</h1>

      {/* Аватар */}
      <img
        src="./img/product-not-found.png"
        alt="Мій аватар"
        style={styles.avatar}
      />

      {/* Опис */}
      <p style={styles.description}>
        Привіт! Мене звати Богдан Калитовський, я студент Львівської
        політехніки. Цікавлюся програмуванням, веб-розробкою та новими
        технологіями 🚀
      </p>

      {/* Відео */}
      <div style={styles.block}>
        <h2>Моє відео</h2>
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/aOE3CLYCx-k"
          title="Embedded Systems: Powering the Future of Technology"
          allowFullScreen
        ></iframe>
      </div>

      {/* Карта */}
      <div style={styles.block}>
        <h2>Моє місце навчання</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.307430996646!2d24.018004576501647!3d49.83968367147907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c65f4f4ab%3A0x4bb7d1a22a9a8db3!2sLviv%20Polytechnic%20National%20University!5e0!3m2!1sen!2sua!4v1695740388000!5m2!1sen!2sua"
          width="100%"
          height="400"
          style={styles.iframe}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Lviv Polytechnic Map"
        ></iframe>
      </div>
    </div>
  );
};

// стилі inline
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#d6c5c5ff',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
  },
  avatar: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #444',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    marginBottom: '40px',
  },
  block: {
    marginBottom: '40px',
  },
  iframe: {
    borderRadius: '12px',
    border: 'none',
  },
};
