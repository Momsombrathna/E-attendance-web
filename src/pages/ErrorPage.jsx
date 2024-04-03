import React from "react";

const ErrorPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-4 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold text-center">
            Error 404: Page Not Found
          </h1>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
