import './Avatar.scss';

export const Avatar = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return <div className="avatar">{initials}</div>;
};
