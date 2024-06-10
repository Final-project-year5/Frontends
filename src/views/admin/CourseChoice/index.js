// src/components/AdminCourseApproval.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminCourseApproval.css";

const AdminCourseApproval = () => {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/manage-course-choices/")
      .then((response) => {
        setChoices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the course choices!", error);
      });
  }, []);

  const handleStatusChange = (choiceId, status) => {
    axios
      .post("http://localhost:8000/api/manage-course-choices/", {
        choice_id: choiceId,
        status,
      })
      .then((response) => {
        setChoices(
          choices.map((choice) =>
            choice.id === choiceId ? { ...choice, status } : choice
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the course choice!", error);
      });
  };

  return (
    <div className="table-container mt-32">
      <table>
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Course</th>
            <th>Status</th>
            <th>Qualifications</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {choices.map((choice) => (
            <tr key={choice.id}>
              <td>{choice.teacher}</td>
              <td>{choice.course}</td>
              <td>{choice.status}</td>
              <td>{choice.qualifications}</td>
              <td className="action-buttons">
                <button
                  className="action-button approve"
                  onClick={() => handleStatusChange(choice.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="action-button reject"
                  onClick={() => handleStatusChange(choice.id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCourseApproval;
