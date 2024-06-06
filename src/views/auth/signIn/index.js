import React, { useState } from "react";
import StepOneFields from "./step1";
import StepTwoFields from "./step2";
import StepThreeFields from "./step3";
import StepFourFields from "./step4";
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullname: "",
    id: "",
    email: "",
    gender: "",
    college: "",
    department: "",
    section: "",
    yearSemester: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    skills: [],
  });

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const formPayload = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        formPayload.append(key, value);
      }

      // Send formPayload to your backend
      // await axios.post('your-backend-endpoint', formPayload);

      history.push("/signin");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div
    className="min-h-screen flex items-center justify-center bg-gray-100"
    
  >      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex w-3/4">
        <div className="w-1/3 text-white p-8" style={{ backgroundColor: "#6e82a7" }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#d6eadf" }}>Register</h1>
          <h2 className="text-xl mb-6 text-gray-200">Step {step}</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: step === 1 ? "#95b8d1" : "#6e82a7" }}>1</span>
              <span className="ml-4">Personal Information</span>
            </div>
            <div className="flex items-center">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: step === 2 ? "#95b8d1" : "#6e82a7" }}>2</span>
              <span className="ml-4">Education</span>
            </div>
            <div className="flex items-center">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: step === 3 ? "#95b8d1" : "#6e82a7" }}>3</span>
              <span className="ml-4">Additional Info</span>
            </div>
            <div className="flex items-center">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: step === 4 ? "#95b8d1" : "#6e82a7" }}>4</span>
              <span className="ml-4">Take Picture</span>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 text-white rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: "#92ADDF" }}>
                A
              </div>
              <h2 className="ml-4 text-2xl font-bold">Welcome</h2>
            </div>
            {step === 1 && (
              <StepOneFields
                fullname={formData.fullname}
                setFullname={(value) => setFormData({ ...formData, fullname: value })}
                id={formData.id}
                setId={(value) => setFormData({ ...formData, id: value })}
                email={formData.email}
                setEmail={(value) => setFormData({ ...formData, email: value })}
                gender={formData.gender}
                setGender={(value) => setFormData({ ...formData, gender: value })}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <StepTwoFields
                college={formData.college}
                setCollege={(value) => setFormData({ ...formData, college: value })}
                department={formData.department}
                setDepartment={(value) => setFormData({ ...formData, department: value })}
                section={formData.section}
                setSection={(value) => setFormData({ ...formData, section: value })}
                yearSemester={formData.yearSemester}
                setYearSemester={(value) => setFormData({ ...formData, yearSemester: value })}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}
            {step === 3 && (
              <StepThreeFields
                phoneNumber={formData.phoneNumber}
                setPhoneNumber={(value) => setFormData({ ...formData, phoneNumber: value })}
                password={formData.password}
                setPassword={(value) => setFormData({ ...formData, password: value })}
                confirmPassword={formData.confirmPassword}
                setConfirmPassword={(value) => setFormData({ ...formData, confirmPassword: value })}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}
            {step === 4 && (
              <StepFourFields
                skills={formData.skills}
                setSkills={(value) => setFormData({ ...formData, skills: value })}
                onPrevious={handlePrevious}
                cachedData={formData}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <p className="text-center font-bold " style={{color: "#92ADDF"}}>
              Already have an account?{" "}
              <span
                className="login-link"
                onClick={() => history.push(`/signin`)}
              >
                Login here
              </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
