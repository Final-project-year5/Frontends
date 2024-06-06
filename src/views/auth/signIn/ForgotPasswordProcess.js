import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordProcess = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    if (isEmailValid) {
      try {
        const response = await fetch("http://localhost:8000/api/generate_otp/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const responseData = await response.json();
        console.log("Response data from backend:", responseData); // Log the response data
        if (response.ok) {
          setStep(2);
        } else {
          setErrorMessage(responseData.message);
        }
      } catch (error) {
        console.error("Failed to send OTP:", error);
        setErrorMessage("Failed to send OTP. Please try again later.");
      }
    }
  };

  const handleSubmitVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/update_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: verificationCode, new_password: newPassword }),
      });
      const responseData = await response.json();
      console.log("Response data from backend:", responseData); // Log the response data
      if (response.ok) {
        setStep(3);
      } else {
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      setErrorMessage("Failed to update password. Please try again later.");
    }
  };  

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return (
          <form className="form" onSubmit={handleSubmitEmail}>
            <div className="flex flex-col">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`registration-input ${
                    emailError ? "border-red-500" : ""
                  } text-white pl-4 mb-4 block w-full px-0 mt-3 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute top-0 left-0 mt-2 ml-2 text-gray-400 ${
                    email ? "hidden" : ""
                  }`}
                >
                  <FaEnvelope className="inline-block mr-2 mt-1" /> Enter your
                  email
                </label>
              </div>
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <button className="button ml-36 mr-12 mt-4 rounded-lg bg-blue-500 text-white px-8 py-1 transition-colors duration-300 hover:bg-transparent hover:text-blue-500" type="submit">
              Next
            </button>
          </form>
        );
      case 2:
        return (
          <form className="form" onSubmit={handleSubmitVerificationCode}>
            <div className="flex flex-col">
              {/* Verification code input */}
              <div className="relative">
                <input
                  id="verificationCode"
                  type="text"
                  placeholder=" "
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="registration-input text-black pl-4 mb-4 block w-full px-0 mt-3 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  required
                />
                <label
                  htmlFor="verificationCode"
                  className={`absolute top-0 left-0 mt-2 ml-2 text-gray-400 ${
                    verificationCode ? "hidden" : ""
                  }`}
                >
                  Enter verification code
                </label>
              </div>
              <div className="relative">
                <input
                  id="newPassword"
                  type="password"
                  placeholder=" "
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="registration-input text-black pl-4 mb-4 block w-full px-0 mt-3 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  required
                />
                <label
                  htmlFor="newPassword"
                  className={`absolute top-0 left-0 mt-2 ml-2 text-gray-400 ${
                    newPassword ? "hidden" : ""
                  }`}
                >
                  Enter new password
                </label>
              </div>
              <button
                className="button ml-12 mr-12 mt-4 rounded-lg bg-blue-500 text-white px-4 py-1 transition-colors duration-300 hover:bg-transparent hover:text-blue-500"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        );
        case 3:
          // useEffect(() => {
          //   const redirectTimer = setTimeout(() => {
          //     history.push("/signin");
          //   }, 5000);
        
          //   return () => clearTimeout(redirectTimer);
          // }, []);
        
          return (
            <div>
              <p>Password successfully changed!</p>
              <p>Redirecting to sign-in page...</p>
            </div>
          );
        
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      
    >
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-3/4">
        <div className="w-1/3 text-white p-8" style={{ backgroundColor: "#6e82a7" }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#d6eadf" }}>Forgot Password</h1>
          <h2 className="text-xl mb-6 text-gray-200">Step {step}</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: step === 1 ? "#95b8d1" : "#6e82a7" }}>1</span>
              <span className="ml-4">Enter Email</span>
            </div>
            <div className="flex items-center">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: step === 2 ? "#95b8d1" : "#6e82a7" }}>2</span>
              <span className="ml-4">Verify Email</span>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 text-white rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: "#92ADDF" }}>
                A
              </div>
              <h2 className="ml-4 text-2xl font-bold">Recover your account</h2>
            </div>
            {renderStepForm()}
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordProcess;
