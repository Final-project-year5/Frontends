import React, { useState, useEffect } from 'react';
import './ScheduleManagement.css';
import axios from 'axios';

const ScheduleManagement = () => {
    // State for managing schedules
    const [schedules, setSchedules] = useState([]);
    const [file, setFile] = useState(null);
  
    // Function to handle file upload
    const handleFileUpload = (uploadedFile) => {
      if (uploadedFile) {
        if (validateFileType(uploadedFile)) {
          setFile(uploadedFile);
        } else {
          alert("Please select only Excel or CSV file.");
        }
      }
    };
  
    // Function to handle schedule upload
    const uploadSchedule = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        // Make a POST request to upload the schedule
        const response = await axios.post(
          "http://localhost:8000/api/upload_schedule/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Handle success
        console.log("Response from backend:", response.data);
        // Update the schedules state with the response data
        setSchedules(response.data.schedules);
  
        // Reset the file state
        setFile(null);
      } catch (error) {
        // Handle error
        console.error("Error uploading schedule:", error);
      }
    };
  
    // Function to validate file type
    const validateFileType = (file) => {
      const allowedExtensions = ["xlsx", "xls", "csv"];
      const fileType = file.name.split(".").pop();
      return allowedExtensions.includes(fileType);
    };
  
    // Function to handle drag over event
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    // Function to handle drop event
    const handleDrop = (event) => {
      event.preventDefault();
      const uploadedFile = event.dataTransfer.files[0];
      handleFileUpload(uploadedFile);
    };
  
    return (
      <div
        className="bg-gray-100 p-8 rounded-lg shadow-md text-center mt-32"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="border-dashed border-2 border-gray-300 p-8 rounded-lg mb-4">
          <label
            htmlFor="fileInput"
            className="text-gray-500 text-lg block mb-2 cursor-pointer"
          >
            Drag & drop files to upload or click here
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
            accept=".csv,.xlsx,.xls"
          />
          <div
            className="flex items-center justify-center"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="bg-white border border-gray-300 p-4 rounded-lg cursor-pointer">
              Browse Files
            </div>
          </div>
          {file && (
            <div className="mt-4">
              <span className="text-gray-500">Selected file:</span>{" "}
              <span>{file.name}</span>
            </div>
          )}
        </div>
        <button
          onClick={uploadSchedule}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Upload Schedule
        </button>
        {/* Display schedules here */}
      </div>
    );
  };

  export default ScheduleManagement;