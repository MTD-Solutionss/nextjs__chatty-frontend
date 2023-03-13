import React from 'react';
type Props = {
  label: any;
  className?: string;
  disabled?: boolean;
  handleClick?: () => void;
};

const Button = (props: Props) => {
  const { label, className, disabled, handleClick } = props;
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
