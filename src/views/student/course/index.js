import React, { useState, useEffect } from 'react';
import './CoursePage.css';
import CalendarView from './smallcalader';

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

function CourseCard({ course, handleCourseClick }) {
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

  const colorClass = getColorClass(course.type);

  return (
    <div className="course-card" onClick={() => handleCourseClick(course.id)}>
      <div className={`course-type ${colorClass}`}>{course.type}</div>
      <div className="course-info">
        <h3>{course.title}</h3>
        <p><strong>Course Name:</strong> {course.name}</p>
        <p><strong>Pre-Request:</strong> {course.prerequest}</p>
        <p><strong>Course Duration:</strong> {course.duration}</p>
      </div>
    </div>
  );
}

function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [courses, setCourses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
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

      // Fetch upcoming classes
      fetch('http://localhost:8000/api/upcoming_classes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setUpcomingClasses(Array.isArray(data) ? data : []);
        }
      })
      .catch(error => console.error('Error fetching upcoming classes:', error));
    }

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    setShowAttendance(false);
    setError(null);

    // Fetch attendance data for the selected course
    fetch(`http://localhost:8000/api/course-attendance/${courseId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        setAttendanceData(data);
        setShowAttendance(true);
      } else {
        console.error('API response is not an array:', data);
        setError('Failed to load attendance data.');
      }
    })
    .catch(error => {
      console.error('Error fetching attendance data:', error);
      setError('Failed to load attendance data.');
    });
  };

  const handleJoinCourse = (joinCode, courseId) => {
    if (accessToken && courseId) {
      const joinData = {
        join_code: joinCode,
      };

      fetch(`http://localhost:8000/api/join_course/${courseId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(joinData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error joining course:', error);
        });
    }
    setShowPopup(false);
  };

  const handleJoinClick = (courseId) => {
    setSelectedCourse(courseId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="course-page mt-24">
      <div className="main-section">
        <div className="course-section">
          <h2 className="section-title font-bold text-2xl" style={{color:'#6e82a7',}}>Courses You're Taking Part</h2>
          <div className="course-list mt-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} handleCourseClick={handleCourseClick} />
            ))}
          </div>
        </div>
        <div className="calendar-section">
          <div className="calendar">
            {showPopup && <JoinPopup handleJoin={(joinCode) => handleJoinCourse(joinCode, selectedCourse)} handleClose={handleClosePopup} />}
            <button className='text-md  ml-96 border rounded-md w-32 h-10 font-bold text-white' style={{backgroundColor:'#6e82a7'}} onClick={() => setShowPopup(true)}>+ Join class</button>
            <CalendarView />
          </div>
        </div>
      </div>
      {showAttendance && (
        <div className="attendance-section">
          <h2>Attendance Report</h2>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table className="attendance-table">
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
          )}
        </div>
      )}
    </div>
  );
}

export default CoursePage;
