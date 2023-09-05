import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  disabled,
  onClick,
}) => {
  const defaultClasses =
    "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600";

  return (
    <button
      className={`${defaultClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
