import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
