import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../../api/config";
import MoonLoader from "react-spinners/MoonLoader";
import { useLocation } from "react-router-dom";
import Logo from "../../../assets/e-attendance.png";

const OTPInput = ({ length = 6, errorMessage, inputOTP }) => {
  const [otp, setOTP] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (index < length - 1 && value !== "") {
      inputsRef.current[index + 1].focus();
    }
    inputOTP(newOTP.join(""));
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="flex flex-col relative">
        <div className="flex justify-center items-center mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              type="text"
              maxLength="1"
              className={`w-12 h-12 text-eee-600 text-2xl text-center border border-gray-300 rounded-lg mx-1 focus:outline-none focus:border-blue-500
                ${errorMessage ? "border-red-500" : " "}
              `}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <div className="flex absolute float-left mt-16 py-2">
          {errorMessage && (
            <p className="text-red-500 text-xs ml-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

const VerifyResetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const email = location.state.email;
  const [errorMessage, setErrorMessage] = useState("");

  const validateOTP = () => {
    if (otp.length !== 6) {
      setErrorMessage("OTP should be 6 digits");
      return false;
    }
    if (!/^\d+$/.test(otp)) {
      setErrorMessage("OTP should contain only numbers");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const isValid = validateOTP();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const response = await fetch(`${api_url}/auth/verify-pass-reset-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    if (response.ok) {
      setIsLoading(false);
      navigate("/set-new-password", { state: { email } });
    } else {
      setIsLoading(false);
      setErrorMessage("Invalid OTP");
    }
  };

  const handleSendMail = async () => {
    setIsLoading(true);
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
    } else {
      setIsLoading(false);
      setErrorMessage("Failed to send code");
    }
  };

  return (
    <>
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-eee-100 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-10">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <img class="mx-auto h-16 w-auto" src={Logo} />
              <div class="font-semibold text-3xl text-eee-700">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  We have sent a code to your email{" "}
                  <span class=" text-eee-700">{email}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} method="post">
              <div
                id="otp"
                class="flex flex-row justify-center text-center px-2"
              >
                <OTPInput
                  length={6}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  otp={otp}
                  inputOTP={setOTP}
                />
              </div>

              <div class="flex flex-col space-y-2 mt-8">
                <div>
                  <button class="flex flex-row items-center justify-center text-center w-full border rounded-lg outline-none py-2 bg-blue-700 border-none text-white text-sm shadow-sm">
                    {isLoading ? (
                      <div className="flex flex-row justify-center items-center gap-1">
                        <MoonLoader size={20} color="#fff" loading={true} />
                        <span className="text-eee-100 text-xs">Sending...</span>
                      </div>
                    ) : (
                      <span>Verify Account</span>
                    )}
                  </button>
                </div>

                <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't receive the code?</p>{" "}
                  <p
                    onClick={handleSendMail}
                    class="flex flex-row items-center text-blue-600 cursor-pointer"
                  >
                    Resend
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyResetPass;
