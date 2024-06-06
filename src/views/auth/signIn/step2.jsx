import React, { useState, useEffect } from "react";

const StepTwoFields = ({
  college,
  setCollege,
  department,
  setDepartment,
  section,
  setSection,
  yearSemester,
  setYearSemester,
  onPrevious,
  onNext,
}) => {
  const [collegeError, setCollegeError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [sectionError, setSectionError] = useState("");
  const [yearSemesterError, setYearSemesterError] = useState("");

  // Define dropdown options for college and departments
  const collegeOptions = ["College A", "College B", "College C"]; // Example options
  const departmentOptions = {
    "College A": ["Department 1", "Department 2", "Department 3"],
    "College B": ["Department 4", "Department 5", "Department 6"],
    "College C": ["Department 7", "Department 8", "Department 9"],
  };

  // Define year semester options
  const yearSemesterOptions = [
    "1st year 1st semester",
    "1st year 2nd semester",
    "2nd year 1st semester",
    "2nd year 2nd semester",
    "3rd year 1st semester",
    "3rd year 2nd semester",
    "4th year 1st semester",
    "4th year 2nd semester",
    "5th year 1st semester",
    "5th year 2nd semester",
  ];

  const validateCollege = () => {
    if (!college.trim()) {
      return "College is required";
    }
    return "";
  };

  const validateDepartment = () => {
    if (!department.trim()) {
      return "Department is required";
    }
    return "";
  };

  const validateSection = () => {
    if (!section.trim()) {
      return "Section is required";
    }
    return "";
  };

  const validateYearSemester = () => {
    if (!yearSemester.trim()) {
      return "Year/Semester is required";
    }
    return "";
  };

  const handleNext = (e) => {
    e.preventDefault();

    const collegeError = validateCollege();
    const departmentError = validateDepartment();
    const sectionError = validateSection();
    const yearSemesterError = validateYearSemester();

    if (collegeError || departmentError || sectionError || yearSemesterError) {
      setCollegeError(collegeError);
      setDepartmentError(departmentError);
      setSectionError(sectionError);
      setYearSemesterError(yearSemesterError);
      return;
    }

    // Store form data in sessionStorage
    const formData = {
      college,
      department,
      section,
      yearSemester,
    };
    sessionStorage.setItem("formData", JSON.stringify(formData));

    onNext(college,
        department,
        section,
        yearSemester);
  };

  useEffect(() => {
    // Retrieve form data from sessionStorage on component mount
    const storedFormData = JSON.parse(sessionStorage.getItem("formData"));
    if (storedFormData) {
      setCollege(storedFormData.college);
      setDepartment(storedFormData.department);
      setSection(storedFormData.section);
      setYearSemester(storedFormData.yearSemester);
    }
  }, []);

  return (
    <form className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="college" className="text-sm font-medium">
          College
        </label>
        <select
          id="college"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select College</option>
          {collegeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {collegeError && <p className="text-red-500 text-sm">{collegeError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Department</option>
          {departmentOptions[college] &&
            departmentOptions[college].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
        {departmentError && (
          <p className="text-red-500 text-sm">{departmentError}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="section" className="text-sm font-medium">
          Section
        </label>
        <input
          id="section"
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your section"
        />
        {sectionError && <p className="text-red-500 text-sm">{sectionError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="yearSemester" className="text-sm font-medium">
          Year/Semester
        </label>
        <select
          id="yearSemester"
          value={yearSemester}
          onChange={(e) => setYearSemester(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Year/Semester</option>
          {yearSemesterOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {yearSemesterError && (
          <p className="text-red-500 text-sm">{yearSemesterError}</p>
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
          Next
        </button>
      </div>
    </form>
  );
};

export default StepTwoFields;
