import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useParams,
} from "react-router-dom";
import "./AttendanceReport.css";

const ReportDisplay = () => {
    const { courseName } = useParams();
  
    // Sample attendance data for demonstration
    const attendanceData = [
      { date: "2024-04-01", status: "Present" },
      { date: "2024-04-02", status: "Absent" },
      { date: "2024-04-03", status: "Present" },
      // Add more attendance data as needed
    ];
  
    return (
      <div className="container">
        <h1>Attendance Report for {courseName}</h1>
        <div className="report-container">
          <div className="report-card">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((attendance, index) => (
                  <tr key={index}>
                    <td>{attendance.date}</td>
                    <td>{attendance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/" className="back-link">
            Back to Select Course
          </Link>
        </div>
      </div>
    );
  };
  
  const AttendanceReport = () => {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={CourseSelection} /> */}
          <Route path="/report/:courseName" component={ReportDisplay} />
        </Switch>
      </Router>
    );
  };
  
  export default AttendanceReport;