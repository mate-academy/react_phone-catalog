type LinkStyleProps = {
  isActive: boolean;
};

const secondaryColor = '#313237';

export const getLinkStyle = ({ isActive }: LinkStyleProps) => ({
  borderBottom: isActive ? `3px solid ${secondaryColor}` : 'none',
});
