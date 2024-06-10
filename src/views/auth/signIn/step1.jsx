// StepOneFields.jsx
import React, { useState, useEffect } from "react";

const StepOneFields = ({
  fullname,
  setFullname,
  id,
  setId,
  email,
  setEmail,
  gender,
  
  setGender,
  onNext,
}) => {
  const [fullnameError, setFullnameError] = useState("");
  const [idError, setIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");

  const validateFullname = () => {
    if (!fullname.trim()) {
      return "Full Name is required";
    }
    return "";
  };
  const validateId = () => {
    if (!id.trim()) {
      return "ID is required";
    }
    const idRegex = /^ETS\d{4}\/\d{2}$/;
    if (!idRegex.test(id.trim())) {
      return "Invalid ID format. It should be like ETS0451/12";
    }
    return "";
  };

  const validateEmail = () => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Invalid email address";
    }
    return "";
  };

  const validateGender = () => {
    if (!gender) {
      return "Gender is required";
    }
    return "";
  };



  const handleNext = (e) => {
    e.preventDefault();

    const fullnameError = validateFullname();
    const idError = validateId();
    const emailError = validateEmail();
    const genderError = validateGender();

    if (fullnameError || idError || emailError || genderError) {
      setFullnameError(fullnameError);
      setIdError(idError);
      setEmailError(emailError);
      setGenderError(genderError);
      return;
    }

    // Store form data in sessionStorage
    const formData = {
      fullname,
      id,
      email,
      gender,
    };
    sessionStorage.setItem('formData', JSON.stringify(formData));

    onNext({ fullname, id, email, gender });
    };

  useEffect(() => {
    // Retrieve form data from sessionStorage on component mount
    const storedFormData = JSON.parse(sessionStorage.getItem('formData'));
    if (storedFormData) {
      setFullname(storedFormData.fullname);
      setId(storedFormData.id);
      setEmail(storedFormData.email);
      setGender(storedFormData.gender);
      
    }
  }, []);

  return (
    <form className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="fullname" className="text-sm font-medium">
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your full name"
        />
        {fullnameError && <p className="text-red-500 text-sm">{fullnameError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="id" className="text-sm font-medium">
          ID
        </label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your ID"
        />
        {idError && <p className="text-red-500 text-sm">{idError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your email"
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {genderError && <p className="text-red-500 text-sm">{genderError}</p>}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default StepOneFields;