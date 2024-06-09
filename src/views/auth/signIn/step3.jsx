import React, { useState, useEffect } from "react";

const StepThreeFields = ({
  phoneNumber,
  setPhoneNumber,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onPrevious,
  onNext,
}) => {
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      return "Phone Number is required";
    }
    const phoneRegex = /^09\d{8}$/ ;// /^097\d{7}$/; // Phone number format: 0977654321
    if (!phoneRegex.test(phoneNumber.trim())) {
      return "Invalid Phone Number format. It should be in the format 0977654321.";
    }
    return "";
  };
  
  const validatePassword = () => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.trim().length < 8) {
      return "Password must be at least 8 characters long.";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.trim())) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return "";
  };
  

  const validateConfirmPassword = () => {
    if (!confirmPassword.trim()) {
      return "Confirm Password is required";
    }
    if (confirmPassword.trim() !== password.trim()) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleNext = (e) => {
    e.preventDefault();

    const phoneNumberError = validatePhoneNumber();
    const passwordError = validatePassword();
    const confirmPasswordError = validateConfirmPassword();

    if (phoneNumberError || passwordError || confirmPasswordError) {
      setPhoneNumberError(phoneNumberError);
      setPasswordError(passwordError);
      setConfirmPasswordError(confirmPasswordError);
      return;
    }

    // Store form data in sessionStorage
    const formData = {
      phoneNumber,
      password,
      confirmPassword,
    };
    sessionStorage.setItem('formDataStepThree', JSON.stringify(formData));

    onNext(phoneNumber,
        password,
        confirmPassword);
  };

  useEffect(() => {
    // Retrieve form data from sessionStorage on component mount
    const storedFormData = JSON.parse(sessionStorage.getItem('formDataStepThree'));
    if (storedFormData) {
      setPhoneNumber(storedFormData.phoneNumber);
      setPassword(storedFormData.password);
      setConfirmPassword(storedFormData.confirmPassword);
    }
  }, []);

  return (
    <form className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="text-sm font-medium">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your phone number"
        />
        {phoneNumberError && (
          <p className="text-red-500 text-sm">{phoneNumberError}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your password"
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Confirm your password"
        />
        {confirmPasswordError && (
          <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default StepThreeFields;
