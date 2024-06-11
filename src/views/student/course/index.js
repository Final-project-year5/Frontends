import React, { useState, useEffect } from 'react';
import './CoursePage.css';
import CalendarView from './smallcalader';

function JoinPopup({ handleJoin, handleClose }) {
  const [joinCode, setJoinCode] = useState('');

  const handleSubmit = () => {
    console.log("Join code submitted:", joinCode);
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

function CourseCard({ course, handleJoinClick }) {
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
    <div className="course-card">
      <div className={`course-type ${colorClass}`}>{course.type}</div>
      <div className="course-info">
        <h3>{course.title}</h3>
        <p><strong>Course Name:</strong> {course.name}</p>
        <p><strong>Pre-Request:</strong> {course.prerequest}</p>
        <p><strong>Course Duration:</strong> {course.duration}</p>
      </div>
      <button className="join-button" onClick={handleJoinClick}>Join +</button>
    </div>
  );
}

function CoursePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [courses, setCourses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
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

  const handleJoinCourse = (joinCode) => {
    console.log("handle join course", joinCode);
    if (accessToken) {
      const joinData = { join_code: joinCode };

      fetch('http://localhost:8000/api/join_course/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(joinData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error joining course:', error);
        });
    } else {
      console.error('AccessToken is missing');
    }
    setShowPopup(false);
  };

  const handleJoinClick = () => {
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
              <CourseCard key={course.id} course={course} handleJoinClick={handleJoinClick} />
            ))}
          </div>
        </div>
        <div className="calendar-section">
          <div className="calendar">
            {showPopup && <JoinPopup handleJoin={handleJoinCourse} handleClose={handleClosePopup} />}
            <button className='text-md ml-96 border rounded-md w-32 h-10 font-bold text-white' style={{backgroundColor:'#6e82a7'}} onClick={handleJoinClick}>+ Join class</button>
            <CalendarView />
          </div>
          <div className="upcoming-submissions">
            <h3>Upcoming Submissions</h3>
            <ul>
              {upcomingClasses.map((upcoming) => (
                <li key={upcoming.id}>
                  <div className={`submission-type ${upcoming.typeColor}`}>{upcoming.type}</div>
                  <div className="submission-info">
                    <p>{upcoming.title}</p>
                    <span>{upcoming.date}</span>
                  </div>
                  <button className="submit-button">Submit</button>
                </li>
              ))}
            </ul>
            <button className="show-all-button">Show All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
