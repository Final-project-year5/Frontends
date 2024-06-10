import React, { useState, useEffect } from "react";
import axios from "axios";
import './PermissionPage.css'; // Import the custom CSS file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PermissionPage() {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState(null); // Change to null initially
  const [sickLeave, setSickLeave] = useState(false);
  const [teacherError, setTeacherError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");

  // Fetch the list of teachers from the server
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teachers/");
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form validation
    if (!teacher) {
      setTeacherError("Please select a teacher.");
      return;
    } else {
      setTeacherError("");
    }
    if (!reason) {
      setReasonError("Please provide a reason.");
      return;
    } else {
      setReasonError("");
    }
    if (!evidence) {
      setFileSizeError("Please select an evidence file.");
      return;
    } else if (evidence.size > 5242880) {
      // 5MB size limit
      setFileSizeError("File size exceeds the limit (5MB).");
      return;
    } else {
      setFileSizeError("");
    }
  
    try {
      // Fetch the user details to retrieve the associated student ID
      const response = await fetch("http://localhost:8000/api/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      
      const profileData = await response.json();
      const studentId = profileData.student_id;
  
      const formData = new FormData();
      formData.append("teacher", teacher);
      formData.append("reason", reason);
      formData.append("evidence", evidence);
      formData.append("sickLeave", sickLeave);
      formData.append("studentId", studentId); // Include student ID in the formData
  
      const submitResponse = await axios.post("http://localhost:8000/api/create_permission/", formData);
      console.log(submitResponse.data);
      toast.success("Permission request submitted successfully!");
      // Reset form fields after successful submission
      setTeacher("");
      setReason("");
      setEvidence(null);
      setSickLeave(false);
    } catch (error) {
      console.error("Error submitting permission request:", error);
      toast.error("Failed to submit permission request. Please try again.");
    }
  };
  

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEvidence(file);
    console.log("Selected File:", file); // Add this line
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-32 bg-white shadow-lg rounded-2xl shadow-blue-200">
      {/* <ToastContainer /> */}
      <h2 className="text-5xl font-bold mb-4 ml-56 " style={{ color: "#6e82a7" }}>Permission Form</h2>
      <hr className="mb-12 ml-24 mr-24"/>
      <form onSubmit={handleSubmit} className="grid  grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label htmlFor="teacher" className="mb-1 font-bold text-gray-600">Name</label>
          <select
            id="teacher"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            required
            style={{ borderColor: "#6e82a7" }}
            className="border-b-2 border-black bg-transparent focus:outline-none custom-input"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacherData) => (
              <option key={teacherData.id} value={teacherData.name}>
                {teacherData.name}
              </option>
            ))}
          </select>
          {teacherError && <p className="text-red-500">{teacherError}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="reason" className="mb-1 font-bold text-gray-600">Reason</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="border-b-2 border-black bg-transparent focus:outline-none custom-input"
            style={{ borderColor: "#6e82a7" }}
          />
          {reasonError && <p className="text-red-500">{reasonError}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="evidence" className="mb-1 font-bold text-gray-600">Evidence</label>
          <input
            type="file"
            id="evidence"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png, .pdf" // Limit accepted file types
            style={{ borderColor: "#6e82a7" }}
            className="border-b-2 border-black bg-transparent focus:outline-none custom-input"
          />
          {fileSizeError && <p className="text-red-500">{fileSizeError}</p>}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="sickLeave"
            checked={sickLeave}
            onChange={(e) => setSickLeave(e.target.checked)}
            className="mr-2"
            style={{ color: "#6e82a7" }}
          />
          <label htmlFor="sickLeave" className="text-gray-700">Request Sick Leave</label>
        </div>
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-black text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800"
            style={{ backgroundColor: "#95b8d1" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PermissionPage;
