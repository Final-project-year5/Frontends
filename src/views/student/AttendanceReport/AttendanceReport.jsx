import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import './AttendanceReport.css';

function JoinPopup({ handleJoin, handleClose }) {
  const [joinCode, setJoinCode] = useState('');

  const handleSubmit = () => {
    handleJoin(joinCode);
    setJoinCode('');
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-icon" onClick={handleClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <h2>Enter Join Code</h2>
        <input
          type="text"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="Enter join code"
        />
        <div className="popup-buttons">
          <button className="join-button" onClick={handleSubmit}>Join</button>
          <button className="text-white" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    let isMounted = true;

    if (accessToken) {
      // Fetch courses
      fetch('http://localhost:8000/api/student_courses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setCourses(Array.isArray(data) ? data : []);
        }
      })
      .catch(error => console.error('Error fetching courses:', error));
    }

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    setError(null);

    // Fetch attendance data for the selected course
    fetch(`http://localhost:8000/api/course-attendance/${courseId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      setAttendanceData(data);
    })
    .catch(error => {
      console.error('Error fetching attendance data:', error);
      setError('Failed to load attendance data.');
    });
  };

  const getColorClass = (courseType) => {
    switch (courseType) {
      case 'AI':
        return 'blue';
      case 'UI':
        return 'purple';
      case 'UX':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <div className="course-page mt-24">
      <div className="main-section">
        <div className="course-section">
          <h2 className="section-title font-bold text-2xl" style={{color:'#6e82a7',}}>Courses You're Taking Part</h2>
          <div className="course-list mt-4">
            {courses.map((course) => (
              <Link key={course.id} to={`/attendance-report/${course.id}`} className="course-card-link">
                <div className={`course-card`} onClick={() => handleCourseClick(course.id)}>
                  <div className={`course-type ${getColorClass(course.type)}`}>{course.type}</div>
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p><strong>Course Name:</strong> {course.name}</p>
                    <p><strong>Pre-Request:</strong> {course.prerequest}</p>
                    <p><strong>Course Duration:</strong> {course.duration}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
