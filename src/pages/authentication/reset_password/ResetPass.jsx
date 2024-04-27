import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../../api/config";
import MoonLoader from "react-spinners/MoonLoader";
import Logo from "../../../assets/e-attendance.png";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = {};

    if (!email) {
      setIsLoading(false);
      errors.email = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }

    const response = await fetch(`${api_url}/auth/pass-reset-req-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (response.ok) {
      setIsLoading(false);
      navigate("/verify-reset-pass", { state: { email } });
    } else {
      setIsLoading(false);
      setErrors({ email: "Email not found" });
    }
  };

  return (
    <div class="min-h-screen bg-white flex flex-col justify-center sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
        <div class="bg-white py-4 px-4 shadow border border-1 rounded-xl sm:px-10">
          <div class="sm:mx-auto sm:w-full mb-2 sm:max-w-md">
            <img class="mx-auto h-16 w-auto" src={Logo} alt="Workflow" />
          </div>
          <p class="flex text-eee-700 font-bold text-xl justify-center items-center mb-2">
            Reset Password
          </p>
          <form method="POST" onSubmit={handleSubmit} className="relative">
            <div class="mt-2">
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700"
              >
                Email address
              </label>
              <div class="mt-3 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required=""
                  placeholder="Enter your email "
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none  focus:border-blue-100 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />

                <p className="text-xs text-red-600 absolute top-full left-0 invisible">
                  {errors.email}
                </p>
                {errors.email && (
                  <p className="text-xs text-red-600 absolute top-full left-0">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div class="mt-5">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  {isLoading ? (
                    <div className="flex flex-row justify-center items-center gap-1">
                      <MoonLoader size={20} color="#fff" loading={true} />
                      <span className="text-eee-100 text-xs">Sending...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
