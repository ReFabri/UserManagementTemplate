import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center pb-3 absolute top-[-4rem] left-0 right-0">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-10"></div>
    </div>
  );
};

export default LoadingSpinner;
