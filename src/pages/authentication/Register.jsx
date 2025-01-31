import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../api/config";
import MoonLoader from "react-spinners/MoonLoader";
import Logo from "../../assets/e-attendance.png";
import { apiAuthRequest } from "../../api/apiService";
import apiPoints from "../../api/endpoints";
import { adminRoutes, authRoutes } from "../../routes/routesPoint";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      username: username,
      email: email,
      password: password,
    };

    // Validate form fields
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    }
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

    try {
      const response = await apiAuthRequest(
        apiPoints.auth.register,
        apiPoints.methods.POST,
        JSON.stringify(data)
      );

      if (response.status === 201) {
        const otpResponse = await apiAuthRequest(
          apiPoints.auth.emailOTP,
          apiPoints.methods.POST,
          JSON.stringify({ email })
        );

        if (otpResponse.status === 200) {
          navigate(authRoutes.emailVerify, { state: { email, password } });
        } else {
          console.error("OTP failed to send");
        }
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div class="min-h-screen bg-base-100 flex flex-col justify-center sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-2">
          <div class="bg-base-100 py-8 px-4 rounded-xl sm:px-10">
            <div class="sm:mx-auto mb-2 sm:w-full sm:max-w-md">
              <img class="mx-auto h-28 w-auto" src={Logo} alt="Workflow" />
            </div>
            <p class="flex text-base-700 font-bold text-xl justify-center items-center mb-2">
              Register Account
            </p>
            <form method="POST" onSubmit={handleSubmit} className="relative">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5  text-base-700"
                >
                  User Name
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    className={`mt-1 
                      bg-base-200
                       block w-full px-3 py-2 border text-base-800 border-base-200 rounded-md placeholder-gray-400 focus:outline-none  focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                         errors.username ? "border-red-500" : ""
                       }`}
                  />
                  <p className="text-xs text-red-600 absolute top-full left-0 invisible">
                    {errors.username}
                  </p>
                  {errors.username && (
                    <p className="text-xs text-red-600 absolute top-full left-0">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              <div class="mt-6">
                <label
                  for="email"
                  class="block text-sm font-medium leading-5  text-base-700"
                >
                  Email address
                </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required=""
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 bg-base-200 block w-full px-3 py-2 text-base-800 border border-base-200 rounded-md placeholder-gray-400 focus:outline-none  focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
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

              <div class="mt-6 relative">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-base-700"
                >
                  Password
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    required=""
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 bg-base-200 block w-full px-3 py-2 border text-base-800 border-base-200 rounded-md placeholder-gray-400 focus:outline-none  focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
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
                  class="block text-sm font-medium leading-5 text-base-700"
                >
                  Confirm Password
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    required=""
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`mt-1 bg-base-200 block w-full px-3 py-2 text-base-800 border-base-200 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
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
                  class="ms-2 text-xs font-medium text-base-900 dark:text-gray-300"
                >
                  Show Password
                </label>
              </div>

              <div class="mt-4">
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    {isLoading ? (
                      <>
                        <div className="flex flex-row justify-center items-center gap-1">
                          <MoonLoader size={16} color="#fff" loading={true} />
                          {/* <span className="text-eee-100 text-xs">
                            Sending...
                          </span> */}
                        </div>
                      </>
                    ) : (
                      "REGISTER"
                    )}
                  </button>
                </span>
                <p class="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                  Already have an account. Go to &nbsp;
                  <a
                    href="/login"
                    class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
