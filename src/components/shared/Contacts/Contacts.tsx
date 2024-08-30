import { Card, CardContent, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import styles from './Contacts.module.scss';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import classNames from 'classnames';

export const Contacts = () => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <Card
      className={classNames(styles.contact, {
        [styles.contact_dark]: !isSunSelected,
      })}
      sx={{
        padding: 0,
        background: isSunSelected ? 'white' : '#323542',

        boxShadow:
          '4px 10px 18px rgba(0, 0, 0, 0.3), 0 16px 60px rgba(0, 0, 0, 0.25)',
      }}
    >
      <CardContent
        className={classNames(styles.contact__content, {
          [styles.contact__content_dark]: !isSunSelected,
        })}
        sx={{
          padding: 0,
        }}
      >
        <div
          className={classNames(styles.contact__image, {
            [styles.contact__image_dark]: !isSunSelected,
          })}
        ></div>

        <Typography
          variant="h5"
          component="div"
          className={classNames(styles.contact__name, {
            [styles.contact__name_dark]: !isSunSelected,
          })}
          sx={{ marginTop: '8px', fontWeight: '700' }}
        >
          Pastuschak Nazar
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.contact__position}
          sx={{
            color: '#89939A',
            fontWeight: 'bold',
            fontSize: '15px',
            marginTop: '4px',
          }}
        >
          Fullstack developer
        </Typography>
        <div
          className={classNames(styles.contact__icons, {
            [styles.contact__icons_dark]: !isSunSelected,
          })}
        >
          <IconButton
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com"
            color="primary"
            sx={{
              color: '#0077b5',
              transition: 'transform 0.2s ease, border 0.2s ease',
              padding: '4px',
              border: '1px solid transparent',
              '&:hover': {
                transform: 'scale(1.2)',
                border: '1px solid #0077b5',
                background: 'none',
              },
            }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/P-Nazar"
            color="secondary"
            sx={{
              color: isSunSelected ? '#333' : 'white',
              transition: 'transform 0.2s ease, border 0.2s ease',
              padding: '4px',
              border: '1px solid transparent',
              '&:hover': {
                transform: 'scale(1.2)',
                border: isSunSelected ? '1px solid #333' : '1px solid white',
                background: 'none',
              },
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/Nazarko1234"
            sx={{
              color: '#0088cc',
              transition: 'transform 0.2s ease, border 0.2s ease',
              padding: '4px',
              border: '1px solid transparent',
              '&:hover': {
                transform: 'scale(1.2)',
                border: '1px solid #0088cc',
                background: 'none',
              },
            }}
          >
            <FaTelegramPlane />
          </IconButton>
          <IconButton
            target="_blank"
            rel="noopener noreferrer"
            // eslint-disable-next-line max-len
            href="https://www.instagram.com/pastushak_nazar?igsh=ZGE3NDJocmUwd29t&utm_source=qr"
            sx={{
              color: '#E1306C',
              transition: 'transform 0.2s ease, border 0.2s ease',
              padding: '4px',
              border: '1px solid transparent',
              '&:hover': {
                transform: 'scale(1.2)',
                border: '1px solid #E1306C',
                background: 'none',
              },
            }}
          >
            <FaInstagram />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};
