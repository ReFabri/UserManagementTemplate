import React, { ReactNode } from "react";

interface FormContainerProps {
  className?: string;
  children: ReactNode;
  formName?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  className,
  children,
  formName,
}) => {
  const defaultClassName =
    "flex flex-col items-center justify-center min-h-min p-4 relative";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className={`${defaultClassName} ${className}`}>
        {formName && <h1 className="mb-3 text-xl">{formName}</h1>}
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
