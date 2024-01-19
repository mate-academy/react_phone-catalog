type ButtonProps = {
  children: React.ReactNode
  buttonClasses: string
  textClasses: string
  onClick: () => void
};

export const Button = ({
  children,
  buttonClasses,
  textClasses,
  onClick,
}: ButtonProps) => (
  <button
    className={buttonClasses}
    type="button"
    onClick={onClick}
  >
    <div className={textClasses}>{children}</div>
  </button>
);
