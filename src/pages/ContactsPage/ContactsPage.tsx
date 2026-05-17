import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './contacts.module.scss';
import { BackButton } from '@components/ui/Buttons/Back/BackButton';
const base = import.meta.env.BASE_URL;

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  email: string;
  linkedin: string;
  github: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Maksym Pukas',
    role: 'Team Lead · Full-Stack Developer',
    photo: `${base}img/profile/Maksym.jpg`,
    email: 'maksym.pukas.fs@gmail.com',
    linkedin: 'https://www.linkedin.com/in/maksym-pukas-74a3383ab/',
    github: 'https://github.com/MaksOther',
  },
  {
    name: 'Ruslan Zavadskyi',
    role: 'Product Manager · Full-Stack Developer',
    photo:
      'https://media.mate.academy/fit-in/128x128/users/172623/avatars/current-1748715857382.jpg',
    email: 'ruslan.zavadskyi.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ruslan-zavadskyi-ba9309220/',
    github: 'https://github.com/Etwaiz',
  },
  {
    name: 'Tetiana Sobolieva',
    role: 'Full-Stack Developer',
    photo:
      'https://media.licdn.com/dms/image/v2/D4E03AQF_fuZentFH3g/profile-displayphoto-crop_800_800/B4EZxb310eJoAI-/0/1771067891360?e=1775692800&v=beta&t=Mq9C3rR5M2oQ-Av2AbrzQHHGK04E-9WNbnvcnu6RA6s',
    email: 'tetaina.sobolieva.s@gmail.com',
    linkedin: 'https://www.linkedin.com/in/fd-tetiana-sobolieva/',
    github: 'https://github.com/TetianaSobolieva',
  },
  {
    name: 'Hanna Torianyk',
    role: 'Frontend Developer',
    photo: `${base}img/profile/Hanna.jpg`,
    email: 'torianykhanna@gmail.com',
    linkedin: 'https://www.linkedin.com/in/hanna-torianyk/',
    github: 'https://github.com/torianykhanna',
  },
  {
    name: 'Anastasiia Levochkina',
    role: 'Full-Stack Developer',
    photo:
      'https://media.licdn.com/dms/image/v2/D4E03AQGsvYquiMNgWA/profile-displayphoto-crop_800_800/B4EZxZsWDoJMAI-/0/1771031325465?e=1775692800&v=beta&t=RZp5qcAza7IkDEMRn0LR3JMXqInOyv_RGt4We2gSd5U',
    email: 'nastya.mixaylova98@gmail.com',
    linkedin:
      'https://www.linkedin.com/in/anastasiia-levochkina-79a8263b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    github: 'https://github.com/anastasiia-levochkina',
  },
  {
    name: 'Mark Chepizhnyi',
    role: 'Full-Stack Developer',
    photo: 'https://avatars.githubusercontent.com/u/62542962?v=4',
    email: 'markchep0411@gmail.com',
    linkedin: 'https://www.linkedin.com/in/markchepizhnyi/',
    github: 'https://github.com/mark-chep',
  },
];

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
    />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="4"
    />
    <path d="M7 10v7" />
    <path d="M11 10v7" />
    <path d="M11 13.5a3 3 0 0 1 6 0V17" />
    <circle
      cx="7"
      cy="7.5"
      r="0.5"
      fill="currentColor"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const ContactsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.contacts}>
      <BackButton />
      <h1>{t('footer.contacts')}</h1>

      <p className={styles.subtitle}>{t('help_widget.bot_replies.0')}</p>

      <section className={styles.team}>
        {teamMembers.map(({ name, role, photo, email, linkedin, github }) => (
          <div
            key={name}
            className={styles.card}
          >
            <img
              src={photo}
              alt={name}
              className={styles.photo}
            />

            <div className={styles.info}>
              <h3>{name}</h3>
              <span className={styles.role}>{role}</span>
            </div>

            <div className={styles.links}>
              <a
                href={`mailto:${email}`}
                className={styles.link}
              >
                <MailIcon />
                {email}
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <LinkedinIcon />
                LinkedIn
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
