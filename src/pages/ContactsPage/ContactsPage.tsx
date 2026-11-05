import { ContactsTemplate } from '@/components/templates/ContactsTemplate';
import type { Developer } from './ContactsPage.types';

const developersData: Developer[] = [
  {
    id: 1,
    name: 'Gregory',
    link: 'https://github.com/ggylyon',
    role: 'Tech Lead',
    info: '',
  },
  {
    id: 2,
    name: 'Sasha',
    link: 'https://github.com/skuzmenk',
    role: 'Project Manager',
    info: '',
  },
  {
    id: 3,
    name: 'Oleksii',
    link: 'https://github.com/petrenko1694-spec',
    role: 'Developer',
    info: '',
  },
  {
    id: 4,
    name: 'Santana',
    link: 'https://github.com/santana1719',
    role: 'Developer',
    info: '',
  },
  {
    id: 5,
    name: 'Andrii',
    link: 'https://github.com/Chempik120',
    role: 'Developer',
    info: '',
  },
];

export const ContactsPage = () => {
  return <ContactsTemplate developersData={developersData} />;
};
