import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api_url } from "../../../api/config";
import MoonLoader from "react-spinners/MoonLoader";
import Logo from "../../../assets/e-attendance.png";
import { login } from "../../../context/AuthContext";

const ResetPass = () => {
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const email = location.state.email;
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate form fields
    const errors = {};

    if (!email.includes("@")) {
      errors.email = "Email must contain @";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }

    const response = await fetch(`${api_url}/auth/set-new-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      setIsLoading(false);

      login({
        username: email,
        password,
        setIsLoading,
        navigate,
      });
    } else {
      // Handle error
      console.error("Registration failed");
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
            Set new password
          </p>
          <form method="POST" onSubmit={handleSubmit} className="relative">
            <div class="mt-6 relative">
              <label
                for="password"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                New Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none  focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <p className="text-xs text-red-600 absolute top-full left-0 invisible">
                  {errors.password}
                </p>
                {errors.password && (
                  <p className="text-xs text-red-600 absolute top-full left-0">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div class="mt-6 relative">
              <label
                for="password_confirmation"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirm New Password
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  required=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border text-gray-800 border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <p className="text-xs text-red-600 absolute top-full left-0 invisible">
                  {errors.confirmPassword}
                </p>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 absolute top-full left-0">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* show password */}
            <div class="flex items-center mt-6">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                onClick={() => setShowPassword(!showPassword)}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
              >
                Show Password
              </label>
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
