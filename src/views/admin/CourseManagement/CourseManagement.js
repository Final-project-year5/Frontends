import React, { useState, useEffect } from 'react';
import './CourseManagement.css';
import axios from 'axios';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    college: '',
    department: '',
    name: '',
    code: '',
    duration: '',
    year: '',
    prerequest: ''
  });
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/courses/')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    axios.get('http://localhost:8000/api/colleges/')
      .then(response => setCollegeOptions(response.data))
      .catch(error => console.error('Error fetching colleges:', error));
  }, []);

  useEffect(() => {
    if (editedCourse.college) {
      axios.get(`http://localhost:8000/api/departments/${editedCourse.college}/`)
        .then(response => {
          console.log('Departments fetched:', response.data);
          setDepartmentOptions(response.data);
        })
        .catch(error => console.error('Error fetching departments:', error));
    } else {
      setDepartmentOptions([]); // Clear departments if no college is selected
    }
  }, [editedCourse.college]);

  const addCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/courses/', editedCourse);
      setCourses([...courses, response.data]);
      setShowAddCoursePopup(false);
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8000/api/courses/${id}/`);
        setCourses(courses.filter(course => course.id !== id));
      } catch (error) {
        console.error('Error deleting course:', error.message);
      }
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    const courseToEdit = courses.find(course => course.id === id);
    setEditedCourse(courseToEdit);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/courses/${id}/`, editedCourse);
      const updatedCourses = courses.map(course => (course.id === id ? editedCourse : course));
      setCourses(updatedCourses);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating course:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({
      ...editedCourse,
      [name]: value,
    });
  };

  return (
    <div className="course-management">
      <button className="add-course-btn" onClick={() => setShowAddCoursePopup(true)}>Add New Course</button>
      {showAddCoursePopup && (
        <div className="overlay">
          <div className="add-course-popup">
            <h3>Add Course</h3>
            <select
              name="college"
              value={editedCourse.college}
              onChange={handleChange}
            >
              <option value="">Select College</option>
              {collegeOptions.map(college => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={editedCourse.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departmentOptions.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              value={editedCourse.name}
              onChange={handleChange}
              placeholder="Course Name"
            />
            <input
              type="text"
              name="code"
              value={editedCourse.code}
              onChange={handleChange}
              placeholder="Course Code"
            />
            <input
              type="text"
              name="duration"
              value={editedCourse.duration}
              onChange={handleChange}
              placeholder="Course Duration"
            />
            <input
              type="text"
              name="year"
              value={editedCourse.year}
              onChange={handleChange}
              placeholder="Course Year"
            />
            <input
              type="text"
              name="prerequest"
              value={editedCourse.prerequest}
              onChange={handleChange}
              placeholder="Course Prerequest"
            />
            <button onClick={addCourse}>Add Course</button>
            <button onClick={() => setShowAddCoursePopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      <h3>List of Courses</h3>
      <table>
        <thead>
          <tr>
            <th>College</th>
            <th>Department</th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Duration</th>
            <th>Year</th>
            <th>Prerequest</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{editingId === course.id ? (
                <select
                  name="college"
                  value={editedCourse.college}
                  onChange={handleChange}
                >
                  <option value="">Select College</option>
                  {collegeOptions.map(college => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              ) : course.college}</td>
              <td>{editingId === course.id ? (
                <select
                  name="department"
                  value={editedCourse.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              ) : course.department}</td>
              <td>{editingId === course.id ? <input type="text" name="name" value={editedCourse.name} onChange={handleChange} /> : course.name}</td>
              <td>{editingId === course.id ? <input type="text" name="code" value={editedCourse.code} onChange={handleChange} /> : course.code}</td>
              <td>{editingId === course.id ? <input type="text" name="duration" value={editedCourse.duration} onChange={handleChange} /> : course.duration}</td>
              <td>{editingId === course.id ? <input type="text" name="year" value={editedCourse.year} onChange={handleChange} /> : course.year}</td>
              <td>{editingId === course.id ? <input type="text" name="prerequest" value={editedCourse.prerequest} onChange={handleChange} /> : course.prerequest}</td>
              <td>
                {editingId === course.id ? (
                  <button onClick={() => handleSaveEdit(course.id)}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEditClick(course.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteCourse(course.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
