export const getTitle = (title: string) => (
  title.split('-').map(name => (
    name[0].toUpperCase() + name.slice(1)))
    .join(' ')
);
