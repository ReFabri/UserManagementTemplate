import React, { ReactNode, ChangeEvent } from "react";

interface LabelAndInputProps {
  id: string;
  type: string;
  value: string;
  labelClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  children: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
  id,
  type,
  value,
  labelClassName,
  inputClassName,
  placeholder,
  children,
  onChange,
}) => {
  const defaultInputClasses =
    "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black";

  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        {children}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        className={`${defaultInputClasses} ${inputClassName}`}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default LabelAndInput;
