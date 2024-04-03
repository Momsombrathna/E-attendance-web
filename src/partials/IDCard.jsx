import React from "react";

const IDCard = () => {
  const userDetails = {
    firstName: "E-Attendance's",
    sex: "male",
    lastName: "Admin",
    age: 21,
    dateOfBirth: "2001-05-22T17:00:00.000+00:00",
    address: "123 Main Street, City",
    phoneNumber: "098435352",
    email: "admin@gmail.com",
    classList: [],
    profile:
      "https://res.cloudinary.com/dugfn9ryq/image/upload/v1709959639/rjapwzgokwhog42nilql.jpg",
    qrCode:
      "https://e-attendance.s3.ap-southeast-1.amazonaws.com/E-Attendance's_Admin_qr_code.png",
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <div>
          <img
            className="h-20 w-20 rounded-full"
            src={userDetails.profile}
            alt="Profile"
          />
          <h2 className="text-gray-800 font-bold text-xl mt-4">
            {userDetails.firstName} {userDetails.lastName}
          </h2>
        </div>
        <img className="h-16 w-16" src={userDetails.qrCode} alt="QR Code" />
      </div>
      <div className="px-4 py-2">
        <ul className="text-gray-600">
          <li className="flex items-center">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zM3 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              ></path>
              <path
                fillRule="evenodd"
                d="M8 6a1 1 0 100-2 1 1 0 000 2zM8 10a1 1 0 100-2 1 1 0 000 2zM8 14a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 10a1 1 0 100-2 1 1 0 000 2zM12 14a1 1 0 100-2 1 1 0 000 2zM16 6a1 1 0 100-2 1 1 0 000 2zM16 10a1 1 0 100-2 1 1 0 000 2zM16 14a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2">{userDetails.address}</span>
          </li>
          <li className="flex items-center mt-2">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.243 16.95c-.435.15-.904.05-1.236-.282l-4.35-4.35a1.75 1.75 0 010-2.474l.5-.5a1.75 1.75 0 012.474 0l2.086 2.086 5.701-5.701a1.75 1.75 0 012.474 0l.5.5a1.75 1.75 0 010 2.475l-6.15 6.15c-.33.329-.768.538-1.237.582z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2">{userDetails.email}</span>
          </li>
          <li className="flex items-center mt-2">
            <svg className="h-5 w-5 fill-current mr-2" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 6a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V9a3 3 0 00-3-3H5zm0 2h10a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1zm10-2a1 1 0 00-1-1H6a1 1 0 00-1 1v1h10V6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2">{userDetails.phoneNumber}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IDCard;
