import emailjs from '@emailjs/browser';

type SendEmailParams = {
  email: string;
  message: string;
};

export const sendEmail = async ({
  email,
  message,
}: SendEmailParams): Promise<void> => {
  await emailjs.send(
    'service_a8lugdp',
    'template_pbh1vht',
    {
      to_email: email,
      message,
      name: 'NiceGadgets',
      email: 'nicegadgetslocalhost@gmail.com',
      subject: 'Your TTH to Nova Poshta',
    },
    {
      publicKey: 'SFDVgC-1BG8_U1zLI',
    },
  );
};
